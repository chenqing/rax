'use strict';

const path = require('path');
const webpack = require('webpack');
const RxPlugin = require('rx-webpack-plugin');
const fs = require('fs');

// For babelHelpers.js build
if (!fs.existsSync('./packages/universal-rx/build')) {
  fs.mkdirSync('./packages/universal-rx/build');
}

[
  ['rx-components', 'components', 'Components'],
  ['rx-animated', 'animated', 'Animated'],
  ['universal-panresponder', 'panresponder', 'PanResponder'],
  ['universal-platform', 'platform', 'Platform'],
  ['universal-stylesheet', 'stylesheet', 'StyleSheet'],
  ['universal-toast', 'toast', 'Toast']
].forEach(function (info) {
  var main = './packages/' + info[0] + '/src/index.js';
  var entry = {};
  entry[info[1]] = entry[info[1] + '.min'] = entry[info[1] + '.factory'] = main;
  dist(getConfig(
    entry,
    {
      path: './packages/' + info[0] + '/dist/',
      filename: '[name].js',
      sourceMapFilename: '[name].map',
      pathinfo: true,
    },
    {
      externalBuiltinModules: true,
      builtinModules: Object.assign({
        'rx-components': ['@rx/components', 'rx-components', 'kg/rx-components/index']
      }, RxPlugin.BuiltinModules),
      moduleName: info[0],
      globalName: info[2],
    },
    {
      presets: ['es2015', 'rx']
    }
  ));
});

dist(getConfig(
  {
    'env': './packages/universal-env/src/index.js',
    'env.min': './packages/universal-env/src/index.js',
    'env.factory': './packages/universal-env/src/index.js',
  },
  {
    path: './packages/universal-env/dist/',
    filename: '[name].js',
    sourceMapFilename: '[name].map',
    pathinfo: true,
  },
  {
    moduleName: 'universal-env',
    globalName: 'Env',
  },
  {
    presets: ['es2015', 'rx']
  }
)).then(() => {
  return dist(getConfig(
    {
      'rx': './packages/universal-rx/src/index.js',
      'rx.min': './packages/universal-rx/src/index.js',
      'rx.factory': './packages/universal-rx/src/index.js',
    },
    {
      path: './packages/universal-rx/dist/',
      filename: '[name].js',
      sourceMapFilename: '[name].map',
      pathinfo: true,
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
        'babelHelpers.js'
      ]
    }
  ));
}).then(() => {
  return dist(getConfig(
    {
      'transition': './packages/universal-transition/src/index.js',
      'transition.min': './packages/universal-transition/src/index.js',
      'transition.factory': './packages/universal-transition/src/index.js',
    },
    {
      path: './packages/universal-transition/dist/',
      filename: '[name].js',
      sourceMapFilename: '[name].map',
      pathinfo: true,
    },
    {
      moduleName: 'universal-transition',
      globalName: 'Transition',
    },
    {
      presets: ['es2015', 'rx']
    }
  ));
}).then(() => {

  dist(getConfig(
    {
      'web.framework': './packages/web-rx-framework/src/index.js'
    },
    {
      path: './packages/web-rx-framework/dist/',
      filename: '[name].js',
      sourceMapFilename: '[name].map',
      pathinfo: true,
    },
    {
      // Empty
    },
    {
      presets: ['es2015'],
      ignore: [
        'dist/'
      ]
    }
  ));

  dist(getConfig(
    {
      'rx.framework': './packages/weex-rx-framework/src/index.js'
    },
    {
      path: './packages/weex-rx-framework/dist/',
      filename: '[name].js',
      sourceMapFilename: '[name].map',
      pathinfo: true,
    },
    {
      // Empty
    },
    {
      presets: ['es2015'],
      ignore: [
        'dist/'
      ]
    }
  ));
});

function getConfig(entry, output, moduleOptions, babelLoaderQuery) {
  return {
    target: 'node',
    devtool: 'source-map',
    entry: entry,
    output: output,
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
      new webpack.NoErrorsPlugin(),
      new RxPlugin(moduleOptions),
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

function dist(config) {
  return new Promise(function(resolver, reject) {
    let compiler = webpack(config);
    compiler.run(function(err, stats) {
      let options = {
        colors: true
      };
      console.log(stats.toString(options));
      resolver();
    });
  });
}
