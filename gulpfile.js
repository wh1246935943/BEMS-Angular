var gulp = require('gulp');
//合并
var concat = require('gulp-concat');
//压缩
var uglify = require('gulp-uglify');

gulp.task('concat', function(){
    return gulp.src(['./js/controllers/start.js','./js/controllers/*.js'])
        .pipe(concat('controllers.js'))
        .pipe(gulp.dest('build/js'))
});
gulp.task('concat1', function(){
    return gulp.src(['./templates/*/controller.js'])
        .pipe(concat('controllers.js'))
        .pipe(gulp.dest('build/js'))
});

gulp.task('compress',['concat'], function(){
    return gulp.src('./build/js/controllers.js')
        .pipe(uglify())
        .pipe(gulp.dest('build/js/'))
});

gulp.task('default', function () {
    console.log('haha')
});

gulp.task('watch', function(){
    gulp.watch('./js/controllers/*.js', ['compress'], function(event){
        console.log('Controller ' + event.path);
    });
});