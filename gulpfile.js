var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
var jade = require('gulp-jade');

gulp.task('default', ['views', 'sass', 'scripts', 'images', 'watch']);

gulp.task('views', function() {
    gulp.src('dev/index.jade')
        .pipe(jade())
        .pipe(gulp.dest('public/'));
    gulp.src('dev/views/*')
        .pipe(jade())
        .pipe(gulp.dest('public/views/'));
});

gulp.task('sass', function() {
    return sass('dev/sass/main.sass', {
            style: 'expanded'
        })
        .on('error', function(err) {
            console.error('Error!', err.message);
        })
        .pipe(autoprefixer())
        .pipe(gulp.dest('public/'));
});

gulp.task('scripts', function() {
    gulp.src('dev/scripts/*')
        .pipe(gulp.dest('public/scripts/'));
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
    gulp.watch('dev/templates/*', ['views']);
    gulp.watch('dev/views/*', ['views']);
});
