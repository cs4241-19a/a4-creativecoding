const gulp = require( 'gulp' ),
    source = require( 'vinyl-source-stream' ),
    browserify = require( 'browserify' ),
    babelify = require( 'babelify' );

const build = function() {
    return new Promise(function (resolve, reject) {
        browserify({ entries: ['./public/main.js', './public/sketch.js', './public/gui.js'] })
            .transform( "babelify", { presets: ["@babel/preset-env"] })
            // create Node.js stream using browserify output
            .bundle()
            // add Vinyl meta-data to Node.js stream, in this case
            // the name of the file we're streaming
            .pipe( source('bundle.js') )
            // output file to dist folder
            .pipe( gulp.dest('./public') );
        resolve();
    });
};

// 'default' task runs whenever we call 'gulp' on the
// command line with no arguments
gulp.task( 'default', gulp.series(build));