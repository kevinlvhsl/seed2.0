var gulp        = require('gulp'),
    sass        = require('gulp-ruby-sass'),
    imagemin    = require('gulp-imagemin'),
    pngquant    = require('imagemin-pngquant'),
    jpegtran    = require('imagemin-jpegtran'),
    prefix      = require('gulp-autoprefixer'),
    inas        = require('inas'),
    fs          = require('fs'),
    gulpif      = require('gulp-if'),
    px2rem      = require('gulp-px2rem'),
    spritesmith = require('gulp.spritesmith'),
    templater   = require('spritesheet-templates');

var paths = {
    img: ['src/images/*.png', 'src/images/**/*'],
    sass: ['src/css/_sass/**/*','src/css/_sass/*'],
    sprite: ['src/images/slice/*', 'sass.handlebars'],
}

var output = {
    img: 'static/images',
    css: 'src/css',
}

gulp.task('sprite', function () {
    var sassHandlebars = fs.readFileSync('sass.handlebars', 'utf8');
    templater.addHandlebarsTemplate('sass.handlebars', sassHandlebars);

    return gulp.src('src/images/slice/*.png')
    .pipe(spritesmith({
        imgName: 'sprite.png',
        cssName: '_sprite.sass',
        padding: 2,
        cssTemplate: 'sass.handlebars'
    }))
    .pipe(gulpif('*.png', gulp.dest('./src/images/')))
    .pipe(gulpif('*.sass', gulp.dest('./src/sass/components/')));
});


gulp.task('inas-check', function () {
  return inas.validate('inas.html')
})

gulp.task('inas-push', function(){
    var program = inas.validate('./inas.html');
    if(program){
        inas.publish(program);
    }
})

gulp.task('sass', function() {
    return sass(paths.sass,{style: 'compressed'})
        .on('error', sass.logError)
        .pipe(px2rem({
            replace: true
        }))
        .pipe(prefix('ios 6', 'android 4'))
        .pipe(gulp.dest(output.css));
});

gulp.task( 'build-image', function(){
    return gulp.src( paths.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(output.img));
})


gulp.task('watch', function() {
    // gulp.watch(paths.sass, ['sass']);
    gulp.watch(paths.sprite, ['sprite']);
});

// 默认任务
gulp.task('default', ['watch', 'sprite']);

