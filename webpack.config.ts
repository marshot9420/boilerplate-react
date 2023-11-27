import path from 'path';
import dotenv from 'dotenv';

import webpack, { Configuration as WebpackConfig } from 'webpack';
import { Configuration as DevServerConfig } from 'webpack-dev-server';

// Plugins
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

const DEV_ENV = 'development';
const PROD_ENV = 'production';
const isDevMode = process.env.NODE_ENV !== PROD_ENV;

dotenv.config({ path: isDevMode ? '.env.development' : 'env.production' });

const PORT = process.env.PORT;

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
  entry: './src/index',
  target: ['web', 'es5'],
  module: {
    rules: [],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      async: false,
    }),
    new webpack.EnvironmentPlugin({ NODE_ENV: isDevMode ? DEV_ENV : PROD_ENV }),
  ],
  output: {
    path: path.join(__dirname, OUTPUT_DIR),
    filename: '[name].js',
  },
  devServer: {
    historyApiFallback: false,
    port: PORT,
    devMiddleware: { publicPath: OUTPUT_DIR },
  },
};

if (isDevMode) {
  if (config.plugins) {
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
