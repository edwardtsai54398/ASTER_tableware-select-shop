const {
    src,
    dest,
    series,
    parallel,
    watch
} = require('gulp')

//function 任務
function defaultTask(cb){
    console.log('gulp ok');
    cb()
}

exports.log = defaultTask

//檔案搬家任務



function moveJs(){
    return src('src/js/dist/*.min.js').pipe(dest('dist/js'))
     
}

function moveCSS(){
    return src('src/scss/**/*.min.css').pipe(dest('dist/css'))
}
exports.mv = series(moveJs, moveCSS)


//css 壓縮

const cleanCSS = require('gulp-clean-css')

function minicss(){
    return src('src/scss/all.css')
    .pipe(cleanCSS())
    .pipe(dest('dist/css'))
    
}

exports.style = minicss

//js
const uglify = require('gulp-uglify')
const rename = require('gulp-rename');

function ugjs() {
    return src('src/js/*.js').pipe(uglify()).pipe(rename({
      extname: '.min.js'
    })).pipe(dest('dist/js'))
}

exports.ug = ugjs

//html 合併

const fileinclude = require('gulp-file-include')
function htmlBind(){
    return src('src/*.html')
    .pipe(fileinclude({
        prefix: '@@',
        basepath: '@file'
    }))
    .pipe(dest('dist/'))
}

exports.template = htmlBind

//監看所有變動

function taskWatch(){
    watch('src/sass/all.css')
    watch(['src/*.html', 'src/layout/*.html'], htmlBind)
}

exports.w = taskWatch