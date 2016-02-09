module.exports = function(grunt) {

  grunt.initConfig({
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['js/*.js'],
        dest: 'js/built.js'
      }
    },
    uglify: {
      my_target: {
        files: {
          'js/built.min.js': ['js/built.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');


  grunt.registerTask('default', ['concat', 'uglify']);

};