const gulp        = require("gulp"),
      browserSync = require("browser-sync");

gulp.task("browser-sync", () => {
  browserSync({
    server: {
      baseDir: "./"
    },
    notify: false,
  })
});

function bsReload(done) { browserSync.reload(); done(); };

gulp.task("code", () => {
  return gulp.src("./*.html").
  pipe(browserSync.reload({stream: true}))
});

gulp.task("scripts", () => {
  return gulp.src("./*.js").
  pipe(browserSync.reload({stream: true}))
});

gulp.task("styles", () => {
  return gulp.src("./*.css").
  pipe(browserSync.stream())
})

gulp.task("watch", () => {
  gulp.watch("./*.css", gulp.parallel("styles"));
  gulp.watch("./*.js", gulp.parallel("scripts"));
  gulp.watch("./*.html", gulp.parallel("code"));
});

gulp.task("default", gulp.parallel("code", "scripts", "styles", "browser-sync", "watch"));
