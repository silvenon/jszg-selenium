import gulp from 'gulp';
import http from 'http';
import connect from 'connect';
import serveStatic from 'serve-static';
import selenium from 'selenium-standalone';
import webdriver from 'gulp-webdriver';

let httpServer, seleniumServer, integrationDeps;

if (process.env.TRAVIS_SAUCE_CONNECT) {
  integrationDeps = ['serve'];
} else {
  integrationDeps = ['serve', 'selenium'];
}

gulp.task('serve', (done) => {
  const app = connect().use(serveStatic('test/fixtures'));
  httpServer = http.createServer(app);
  httpServer.listen(9000, done);
});

gulp.task('selenium', (done) => {
  selenium.start((err, child) => {
    if (err) return done(err);
    seleniumServer = child;
    done();
  });
});

gulp.task('integration', integrationDeps, () => {
  return gulp.src('wdio.conf.js')
    .pipe(webdriver())
    .on('error', () => {
      process.exit(1);
    });
});

gulp.task('test', ['integration'], () => {
  httpServer.close();
  seleniumServer.kill();
});
