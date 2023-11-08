module.exports = {
  port: 4000,

  tasks: {
    _prefill:  true,
    browsersync:  true,
    eslint:       true,
    // imagemin:     true,
    imageminResponsive: true,
    copyFontAwesome:   true,
    copyJs:   true,
    copyUncompiled:   true,
    copyCss:   true,
    copyImages:   true,
    sass:         true,
    watch:        true,
    webpack:      true,
  },

  assets: './assets',
  assetsSubpath: '/_src',
  assetsSubpathUncompiled: '/_src-uncompiled',

  browsersync: {
    browsers: [
      // 'Google Chrome Canary',
      // 'Google Chrome',
      // 'Firefox Nightly',
      // 'Firefox Developer Edition',
      // 'Firefox',
      // 'Safari Technology Preview',
      // 'Safari',
      // 'Opera',
      // 'Opera Developer',
    ],
  },

  eslintLoader: {
    enforce: 'pre',
    test:    /\.js$/,
    exclude: /node_modules/,
    loader:  'eslint-loader',
  },

  imagemin: {
    src:         'images',
    dest:        'images',
    progressive: true,
    svgoPlugins: [{removeViewBox: false}],
  },

  jekyll: {
    config: {
      default:     '_config.yml',
      // app:         '_config_app.yml',
      development: '_config_development.yml',
      production:  '',
    },
    dest:     '_site',
    data:     '_data',
  },

  js: {
    src:   'js',
    dest:  'js',
    entry: [
      './master/main.js',
    ],
  },

  sass: {
    src:          'sass',
    dest:         'css',
    entry: [
      './master/main.scss',
    ],
    outputStyle:  'compressed',
    autoprefixer: {
      browsers: [
        '> 1%',
        'last 2 versions',
        'Firefox ESR',
      ],
    },
  },

  babel: {
    presets: [
      ['@babel/preset-env', {
        modules: false,
        targets: {
          browsers: [
						'last 2 versions',
						'IE >= 9'
					]
        },
        useBuiltIns: 'usage',
      }]
    ]
  },

}
