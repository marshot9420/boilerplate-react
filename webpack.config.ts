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

const DEV_ENV = 'development';
const PROD_ENV = 'production';
const isDevMode = process.env.NODE_ENV !== PROD_ENV;

dotenv.config({ path: isDevMode ? '.env.development' : 'env.production' });

const PORT = process.env.PORT;

const SOURCE_DIR = 'src';
const PUBLIC_DIR = 'public';
const OUTPUT_DIR = 'dist';

interface IConfiguration extends WebpackConfig {
  devServer?: DevServerConfig;
}

const config: IConfiguration = {
  name: 'react-webpack-emotion-boilerplate',
  mode: isDevMode ? DEV_ENV : PROD_ENV,
  devtool: isDevMode ? 'inline-source-map' : 'hidden-source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
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
            '@babel/preset-react',
            '@babel/preset-typescript',
          ],
          env: {
            development: {
              plugins: [require.resolve('react-refresh/babel')],
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
    new webpack.EnvironmentPlugin({ NODE_ENV: isDevMode ? DEV_ENV : PROD_ENV }),
    new HtmlWebpackPlugin({
      template: `./${PUBLIC_DIR}/index.html`,
    }),
    new CleanWebpackPlugin(),
  ],
  output: {
    path: path.join(__dirname, OUTPUT_DIR),
    filename: '[name].js',
  },
  devServer: {
    historyApiFallback: false,
    port: PORT,
    static: { directory: path.resolve(__dirname, PUBLIC_DIR) },
    open: true,
    hot: true,
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
    config.plugins.push(new BundleAnalyzerPlugin({ analyzerMode: 'static' }));
  }
}

export default config;
