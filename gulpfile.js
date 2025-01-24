"use strict";

import gulp from "gulp";
import pug from "gulp-pug";
import sourcemaps from "gulp-sourcemaps";
import cleanCSS from "gulp-clean-css";
import rename from "gulp-rename";
import server from "browser-sync";
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);
import extReplace from 'gulp-ext-replace';
import postcss from "gulp-postcss";
import autoprefixer from "autoprefixer";
import imagemin from "gulp-imagemin";
import webp from "imagemin-webp";
import del from "del";

gulp.task("pug", function () {
	return gulp
		.src("src/pug/pages/*.pug")
		.pipe(
			pug({
				pretty: false,
			})
		)
		.pipe(gulp.dest("build"));
});

gulp.task("media", function () {
	return gulp
		.src("src/*.mp4")
		.pipe(gulp.dest("build"))
})

gulp.task("css", function () {
	return gulp
		.src("src/scss/styles.scss")
		.pipe(sourcemaps.init())
		.pipe(postcss([autoprefixer()]))
		.pipe(
			sass().on("error", function (error) {
				// здесь ошибка
				done(error);
			})
		)
		.pipe(cleanCSS({ compatibility: 'ie8' }))
		.pipe(rename("style.min.css"))
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest("build/css"));
});

gulp.task('vendor', function () {
	return gulp.src("src/vendor/**/*.*")
		.pipe(gulp.dest("build"))
});

gulp.task("js", function () {
	return (
		gulp
			.src("src/js/**/*.js")
			.pipe(gulp.dest("build/js"))
	);
});

gulp.task("exportWebP", function () {
	let src = "src/img/**/*.{jpg,jpeg,png}"; // Where your images are coming from.

	return gulp.src(src)
		.pipe(imagemin([
			webp({
				// lossless: true, if pngs turn out sucky uncomment this and redo just pngs
				quality: 100
			})
		]))
		.pipe(extReplace(".webp"))
		.pipe(gulp.dest("build/img"));
});

gulp.task("svg", function () {
	return gulp
		.src("src/img/**/*.svg")
		.pipe(
			imagemin([
				imagemin.svgo({
					plugins: [
						{
							removeViewBox: true,
						},
						{
							cleanupIDs: false,
						},
					],
				}),
			])
		)
		.pipe(gulp.dest("build/img"));
})

gulp.task("fonts", function () {
	return gulp
		.src(["src/fonts/*"], {
			base: "src",
		})
		.pipe(gulp.dest("build/"));
});

gulp.task("stylesheet", function () {
	return gulp
		.src("src/fonts/stylesheet.css")
		.pipe(gulp.dest("build/css"));
});

gulp.task("server", function () {
	server.init({
		server: "build/",
		notify: false,
		open: true,
		cors: true,
		ui: false,
	});
	gulp.watch("src/scss/**/*.scss", gulp.series("css", "refresh"));
	gulp.watch("src/scss/**/*.css", gulp.series("css", "refresh"));
	gulp.watch("src/pug/**/*.pug", gulp.series("pug", "refresh"));
	gulp.watch("src/js/*.js", gulp.series("js", "refresh"));
	gulp.watch("src/img/**/*.*", gulp.series("exportWebP", "refresh"));
	gulp.watch("src/img/**/*.*", gulp.series("svg", "refresh"));
	// gulp.watch("src/fonts/*.*", gulp.series("fonts", "refresh"));
	gulp.watch("src/vendor/*.*", gulp.series("vendor", "refresh"));
	// gulp.watch("src/scss/utils/stylesheet.css", gulp.series("stylesheet", "refresh"));
});

gulp.task("refresh", function (done) {
	server.reload();
	done();
});

gulp.task("clean", function () {
	return del("build");
});

gulp.task("build", gulp.series("clean", "css", "exportWebP", "svg", "pug", "media", "js", "vendor"));
gulp.task("start", gulp.series("build", "server"));