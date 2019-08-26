module.exports = {
  tasks: {
    sample: true,
  },
  watch: function(gulp, watch) {
    return [

      watch([
        './appTask/src/**/*',
      ], function () {
        gulp.start('sample');
      })

    ]
  }
}
