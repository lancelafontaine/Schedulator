
var gulp = require('gulp')
browserSync = require('browser-sync').create();




//Reloades the browser when any of the following files are changed
gulp.task('start-server', function () {
    var app = require('./app.js');
    app.set('port', 3000);
    var http = require('http');
    var server = http.createServer(app);
    server.listen(3000);
    server.on('listening', function () {
        console.log('App listening on port 3000!');
    });
   
        


});

gulp.task('default', ['start-server'], function () {
    
    
    browserSync.init({
        proxy: "localhost:3000",
        injectChanges: true
    });
    gulp.watch("./**/*.ejs").on('change', browserSync.reload);
    gulp.watch("./**/*.css").on('change', browserSync.reload);
    gulp.watch("./**/*.js").on('change', browserSync.reload);
});