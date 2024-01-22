import webpack, { Configuration as WebpackConfig } from 'webpack';
import { Configuration as DevServerConfig } from 'webpack-dev-server';

// 외부 라이브러리
import path from 'path';
import dotenv from 'dotenv';

// 플러그인
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import LodashModuleReplacementPlugin from 'lodash-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';

interface IConfiguration extends WebpackConfig {
  devServer?: DevServerConfig;
}

const DEV_ENV = 'development';
const PROD_ENV = 'production';
const isDevMode = process.env.NODE_ENV !== PROD_ENV;

dotenv.config({ path: isDevMode ? '.env.development' : '.env.production' });

const ENV: { [x: string]: string } = {
  NODE_ENV: JSON.stringify(isDevMode ? DEV_ENV : PROD_ENV),
};

for (const key in process.env) {
  if (key && key.startsWith('REACT_APP_')) {
    ENV[key] = JSON.stringify(process.env[key] || '');
  }
}

const API_PREFIX = '/api';
const API_BASE_URL = isDevMode ? 'http://localhost:4000' : API_PREFIX;

const SOURCE_DIR = 'src';
const PUBLIC_DIR = 'public';
const OUTPUT_DIR = 'dist';

const config: IConfiguration = {
  name: 'GymlightCRM - Frontend',
  mode: isDevMode ? DEV_ENV : PROD_ENV,
  devtool: isDevMode ? 'inline-source-map' : 'inline-source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, SOURCE_DIR),
    },
  },
  entry: `./${SOURCE_DIR}/index`,
  target: ['web', 'es5'],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                targets: { browsers: ['IE 10'] },
                debug: isDevMode,
              },
            ],
            [
              '@babel/preset-react',
              {
                runtime: 'automatic',
              },
            ],
            '@babel/preset-typescript',
          ],
          env: {
            [DEV_ENV]: {
              plugins: [
                ['@emotion/babel-plugin', { sourceMap: true }],
                require.resolve('react-refresh/babel'),
              ],
            },
            [PROD_ENV]: {
              plugins: ['@emotion/babel-plugin'],
            },
          },
        },
        exclude: path.resolve(__dirname, 'node_modules'),
      },
      {
        test: /\.css?$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      async: false,
    }),
    new HtmlWebpackPlugin({
      template: `./${PUBLIC_DIR}/index.html`,
    }),
    new CleanWebpackPlugin(),
    new LodashModuleReplacementPlugin({ shorthands: true }) as any,
    new ESLintPlugin({
      extensions: ['js', 'jsx', 'ts', 'tsx'],
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new webpack.DefinePlugin({
      'process.env': ENV,
    }),
    new CopyPlugin({ patterns: [{ from: 'public/images', to: 'images/' }] }),
  ],
  output: {
    path: path.join(__dirname, OUTPUT_DIR),
    filename: '[name].js',
    publicPath: '/',
  },
  devServer: {
    historyApiFallback: true,
    port: 3000,
    static: {
      directory: path.resolve(__dirname, PUBLIC_DIR),
    },
    open: true,
    proxy: {
      [API_PREFIX]: {
        target: API_BASE_URL,
        changeOrigin: true,
        ws: true,
      },
    },
  },
  optimization: {
    usedExports: true,
  },
};

if (isDevMode) {
  if (config.plugins) {
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
    config.plugins.push(
      new ReactRefreshWebpackPlugin({
        overlay: {
          useURLPolyfill: true,
        },
      }),
    );
    config.plugins.push(
      new BundleAnalyzerPlugin({ analyzerMode: 'server', openAnalyzer: false }),
    );
  }
} else {
  if (config.plugins) {
    config.plugins.push(new webpack.LoaderOptionsPlugin({ minimize: true }));
    config.plugins.push(new BundleAnalyzerPlugin({ analyzerMode: 'static' }));
  }
}

export default config;
