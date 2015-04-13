'use strict';
var yeoman  = require('yeoman-generator');
var yosay   = require('yosay');


// init app
var WebAppGenerator = yeoman.generators.Base.extend({

  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    this.log('\n---- ' + 'Team Cocolabs'.red.underline + ' ----\n');
    this.log(yosay('Bienvenido a "Generador WebApp" de Cocolabs!'));

    var prompts = [
      {
        type: 'input',
        name   : 'author',
        message: 'Author Name:',
        default: 'jpmaster'
      },
      {
        type: 'input',
        name   : 'email',
        message: 'Author Email:',
        default: 'jpmaster.net@gmail.com'
      },
      {
        type: 'input',
        name   : 'name',
        message: 'Project Name:',
        default: this.appname
      },
      {
        type: 'confirm',
        name: 'includeSlim',
        message: 'Project Backend install Slim?',
        default: false
      },
      {
        type: 'list',
        name: 'versionControl',
        message: 'Which ' + 'version control software'.blue + ' are you using (or plan to use)?',
        choices: ['Git', 'SVN', 'None (I like to live on the edge)'],
        filter: function(val) {
          var filterMap = {
            'Git': 'git',
            'SVN': 'svn',
            'None (I like to live on the edge)': 'none'
          };

          return filterMap[val];
        }
      }
    ];

    this.prompt(prompts, function (props) {
      this.props = props;
      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      var context = {
        title: this.props.name,
        description: 'WebApp application by Cocolabs',
        appname: this.props.name
      };

      this.mkdir('static');
      this.mkdir('static/css');
      this.mkdir('static/js');
      this.mkdir('static/img');

      this.fs.copyTpl( this.templatePath('_package.json'), this.destinationPath('package.json'), context);
      this.fs.copyTpl( this.templatePath('_index.html'), this.destinationPath('index.html'), context );
      
    }
  },

  install: function () {
    this.installDependencies();

    this.on('end', function () {
      console.log('terminooooo!');
      }.bind(this));
    }

});

module.exports = WebAppGenerator;
