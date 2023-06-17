const {
    src,
    dest,
    series,
    parallel,
    watch
} = require('gulp')

//function 任務
function defaultTask(cb) {
    console.log('gulp ok');
    cb()
}

exports.log = defaultTask

//檔案搬家任務



function moveJs() {
    return src('src/js/dist/*.min.js').pipe(dest('dist/js'))

}

function moveCSS() {
    return src('src/scss/**/*.min.css').pipe(dest('dist/css'))
}

function moveImg() {
    return src(['src/image/*.*', 'src/image/**/*.*']).pipe(dest('dist/image'))

}
exports.mv = series(moveJs, moveCSS, moveImg)

//move image





//css 壓縮

const cleanCSS = require('gulp-clean-css')

function minicss() {
    return src('src/scss/all.css')
        .pipe(cleanCSS())
        .pipe(dest('dist/css'))

}

exports.mini = minicss


//sass compiler

const sass = require('gulp-sass')(require('sass'));


function compileSass() {
    return src('src/scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(cleanCSS())
        .pipe(dest('dist/css'));
}

exports.sass = compileSass



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

const gulpIf = require('gulp-if')
const path = require('path')

function htmlBind() {
    return src('src/*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file',
            context: {
                page: getPageVar()
            }
        }))
        .pipe(dest('dist/'))
}


function getPageVar() {
    
    let fileName = path.basename('src/*.html', '.html');
    if (fileName == 'index') {
        return 'index'
    } else if (fileName == 'shop' || fileName == 'product') {
        return 'shop'
    } else if (fileName == 'journal' || fileName == 'article') {
        return 'journal'
    }else if(fileName == 'login'){
        return 'login'
    }else if(fileName == 'register'){
        return 'register'
    }else if(fileName == 'cart'){
        return 'cart'
    }else{
        return 'fail'
    }
}

exports.template = htmlBind

//監看所有變動

function taskWatch() {
    watch('src/scss/all.css', minicss)
    watch(['src/*.html', 'src/layout/*.html'], htmlBind)
}

exports.w = taskWatch