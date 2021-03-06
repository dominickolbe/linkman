var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
var jade = require('gulp-jade');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");
var concat = require('gulp-concat');
var ngmin = require('gulp-ngmin');

var browserSync = require('browser-sync');
var reload = browserSync.reload;

var config = {
    proxy: "localhost:3000",
    scrollProportionally: true,
    ghostMode: {
        clicks: true,
        forms: true,
        scroll: true
    },
    open: false,
    scrollThrottle: 100
};

browserSync(config);

gulp.task('default', ['views', 'sass', 'scripts', 'deps', 'images', 'watch']);

gulp.task('views', function() {
    gulp.src('dev/index.jade')
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest('public/'));
    gulp.src('dev/views/*')
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest('public/views/'));
    reload();
});

gulp.task('sass', function() {
    return sass('dev/sass/main.sass', {
            style: 'expanded'
        })
        .on('error', function(err) {
            console.error('Error!', err.message);
        })
        .pipe(autoprefixer())
        .pipe(gulp.dest('public/'))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('scripts', function() {
    gulp.src('dev/scripts/app.js')
        .pipe(ngmin({
            dynamic: false
        }))
        .pipe(uglify({
            mangle: false
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('public/scripts/'));
    reload();
});

gulp.task('deps', function() {

    gulp.src([
            'dev/bower_components/angular/angular.min.js',
            'dev/bower_components/angular-animate/angular-animate.min.js',
            'dev/bower_components/angular-hotkeys/build/hotkeys.min.js',
            'dev/bower_components/angular-ui-router/release/angular-ui-router.min.js',
            'dev/bower_components/firebase/firebase.js',
            'dev/bower_components/angularfire/dist/angularfire.min.js'

        ])
        .pipe(concat('deps.js'))
        .pipe(uglify({
            mangle: false
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('public/scripts'));

});

gulp.task('images', function() {
    gulp.src('dev/images/*')
        .pipe(gulp.dest('public/img/'));
    gulp.src('dev/favicon.ico')
        .pipe(gulp.dest('public/'));
});

gulp.task('watch', function() {
    gulp.watch('dev/index.jade', ['views']);
    gulp.watch('dev/images/*', ['images']);
    gulp.watch('dev/sass/*', ['sass']);
    gulp.watch('dev/sass/*/*', ['sass']);
    gulp.watch('dev/scripts/*', ['scripts']);
    gulp.watch('dev/bower_components/*/*', ['deps']);
    gulp.watch('dev/templates/*', ['views']);
    gulp.watch('dev/views/*', ['views']);
});
