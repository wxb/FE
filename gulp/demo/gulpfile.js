/**
 * gulp demo 配置文件
 * 根据此学习配置文件，可以在使用时适当修改应用
 * @author ： wangxb
 * @date   ： 2015-12-27
 */

// 引入插件文件，根据需要适时添加修改
var gulp = require('gulp');  
var imagemin = require('gulp-imagemin');       // 实现图片压缩
var uglify = require('gulp-uglify');           // 通过UglifyJS来压缩JS文件
var minify = require('gulp-minify'); 
var sourcemaps = require('gulp-sourcemaps');   // 处理JS时，生成SourceMap
var coffee = require('gulp-coffee');		   // 编译coffee代码为Js代码
var concat = require('gulp-concat');           // 合并JS
var del = require('del');                      // 删除文件/文件夹

// 定义相关文件路径
var paths = {
	// 源文件地址
	source : 'src/',
	html   : 'src/html/**/*',
	scripts: ['src/coffee/**/*.coffee'],
	images : 'src/images/**/*',
	css    : 'src/sass/**/*',
	
	// 发布文件地址
	build:    'dist/',
	buildHtml:'dist/html',
	buildJs:  'dist/js/',
	buildCss: 'dist/css/',
	buildImg: 'dist/images/',
};

var minJsName = 'all.min.js';

// 清除旧编译文件
gulp.task('clean', function(){
	del([paths.build]);
});
// 清除文件
gulp.task('clean:html', function(){
	del([paths.buildHtml]);
});
// 清除js文件
gulp.task('clean:script', function(){
	del([paths.buildJs]);
});
// 清除css文件
gulp.task('clean:css', function(){
	del([paths.buildCss]);
});
// 清除图片文件
gulp.task('clean:image', function(){
	del([paths.buildImg]);
});

// 编译、处理、发布html文件
gulp.task('html', ['clean:html'], function(){

});

// 编译、处理、发布脚本文件
gulp.task('script', ['clean:script'], function(){
	return gulp.src(paths.scripts)
			.pipe(sourcemaps.init())     
			.pipe(uglify())              
			.pipe(concat(minJsName))  
			.pipe(sourcemaps.write())
			.pipe(gulp.dest(paths.buildJs));
});

// 编译、处理、发布样式文件
gulp.task('css', ['clean:css'], function(){

});

// 发布静态图片文件
gulp.task('image', ['clean:image'], function(){
	return gulp.src(paths.images)
    		.pipe(imagemin({optimizationLevel: 5}))
    		.pipe(gulp.dest(paths.buildImg));
});

// 监控文件变化，同时在文件变化时执行一些操作
gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['script']);
  gulp.watch(paths.css, ['css']);
  gulp.watch(paths.images, ['image']);
});

/***************************************************
// 开发执行
gulp.task('dev', ['clean'], function(){
})

// 测试执行
gulp.task('qa', function(){

});

// 上线执行
gulp.task('product', function(){

});
****************************************************/
// 默认执行动作
gulp.task('default', ['watch', 'script', 'css', 'image'], function() {     
     // 将你的默认的任务代码放在这  
     console.log('hello gulp');  
});