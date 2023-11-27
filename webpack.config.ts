import webpack, { Configuration } from 'webpack';
import path from 'path';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

const DEV_ENV = 'development';
const PROD_ENV = 'production';
const isDevMode = process.env.NODE_ENV !== PROD_ENV;

const OUTPUT_DIR = 'dist';

const config: Configuration = {
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
    new webpack.EnvironmentPlugin({ NODE_ENV: isDevMode ? DEV_ENV : PROD_ENV }),
  ],
  output: {
    path: path.join(__dirname, OUTPUT_DIR),
    filename: '[name].js',
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
