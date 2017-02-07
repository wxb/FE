/**
 * Created by wangxb on 2016/11/29.
 */

module.exports = function (grunt) {
    grunt.initConfig({
        //pkg: grunt.file.readJSON('package.json'),
        html: {
            files: [{
                expand: true,
                cwd: 'src/',
                src: '**/*.html',
                dest: 'dest/',
            }]
        },
        watch: {
            files: ['src/**/*'],
            tasks: ['html'],
            options: {
                spawn: false

            }
        }

    });
    //grunt.loadNpmTasks('grunt-contrib-jshint');
    //grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['watch']);

    //grunt.registerTask('test', ['watch']);

    //grunt.registerTask('build', ['uglify']);
}

