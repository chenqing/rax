'use strict';

const path = require('path');
const webpack = require('webpack');
const RxWebpackPlugin = require('rx-webpack-plugin');
const fs = require('fs');

// For babelHelpers.js build
if (!fs.existsSync('./packages/universal-rx/build')) {
  fs.mkdirSync('./packages/universal-rx/build');
}

// 1
dist(getConfig(
  {
    'env': './packages/universal-env/src/index.js',
    'env.min': './packages/universal-env/src/index.js',
  },
  {
    path: './packages/universal-env/dist/',
    filename: '[name].js',
    sourceMapFilename: '[name].map',
  },
  {
    moduleName: 'universal-env',
    globalName: 'Env',
  },
  {
    presets: ['es2015', 'rx']
  }
), ()=> {
  // 2
  dist(getConfig(
    {
      'rx': './packages/universal-rx/src/index.js',
      'rx.min': './packages/universal-rx/src/index.js',
    },
    {
      path: './packages/universal-rx/dist/',
      filename: '[name].js',
      sourceMapFilename: '[name].map',
    },
    {
      moduleName: 'universal-rx',
      globalName: 'Rx',
    },
    {
      presets: ['es2015', 'rx'],
      plugins: [
        ['transform-helper', {
          helperFilename: './packages/universal-rx/build/babelHelpers.js'
        }]
      ],
      ignore: [
        "babelHelpers.js"
      ]
    }
  ), ()=> {
    // 3
    dist(getConfig(
      {
        'framework': './packages/weex-rx-framework/src/index.js',
      },
      {
        path: './packages/weex-rx-framework/dist/',
        filename: '[name].js',
        sourceMapFilename: '[name].map',
      },
      {
        moduleName: 'weex-rx-framework',
        globalName: 'Framework',
      },
      {
        presets: ['es2015'],
        ignore: [
          'dist/'
        ]
      }
    ));
  });
});

function getConfig(entry, output, moduleOptions, babelLoaderQuery) {
  return {
    target: 'node',
    devtool: 'source-map',
    entry: entry,
    output: output,
    plugins: [
      new webpack.NoErrorsPlugin(),
      new RxWebpackPlugin(moduleOptions),
      new webpack.optimize.UglifyJsPlugin({
        include: /\.min\.js$/,
        minimize: true,
        compress: {
          warnings: false
        }
      })
    ],
    module: {
      loaders: [{
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel', // 'babel-loader' is also a legal name to reference
        query: babelLoaderQuery
      }]
    }
  };
}

function dist(config, callback){
  let compiler = webpack(config);
  compiler.run(function(err, stats) {
   let options = {
     colors: true
   };
   console.log(stats.toString(options));
   callback && callback();
  });
}