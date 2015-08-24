module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-dev-update');
    grunt.loadNpmTasks('grunt-wiredep');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-supervisor');
    grunt.loadNpmTasks('grunt-node-inspector');
    grunt.loadNpmTasks('grunt-open');

    grunt.initConfig({
        devUpdate: {
            main: {
                options: {
                    updateType: 'prompt', //just report outdated packages 
                    reportUpdated: true, //don't report up-to-date packages 
                    semver: true, //stay within semver when updating 
                    packages: {
                        devDependencies: true, //only check for devDependencies 
                        dependencies: true
                    },
                    packageJson: null, //use matchdep default findup to locate package.json 
                    reportOnlyPkgs: [] //use updateType action on all packages 
                }
            }
        },
        wiredep: {
            task: {
                src: ['views/index.ejs'],
                ignorePath: '../public'
            }
        },
        watch: {
            files: ['public/assets/lib/**'],
            tasks: ['wiredep']
        },
        supervisor: {
            target: {
                script: 'server.js',
                options: {
                    watch: [ 
                        'node_modules', 
                        'public/ng**/.js',
                        'public/ng**/**/.js',
                        'public/ng**/**/**/.js',
                        'public/ng**/**/**/**/.js',
                        'routes',
                        'views',
                        './*.js' 
                    ],
                    extensions: [ 'js,ejs,css' ],
                    harmony: true,
                    noRestartOn: 'exit',
                    forceWatch: true,
                    quiet: true,
                    forceSync: true
                }
            }
        },
        'node-inspector': {
            custom: {
                options: {
                    'web-port': 8989,
                    'web-host': 'localhost',
                    'debug-port': 5857,
                    'save-live-edit': true,
                    'hidden': ['node_modules']
                }
            }
        },
        open : {
            debug : {
                path: 'http://localhost:8989/?ws=localhost:8989&port=5857',
                app: 'uzbl'
            }
        }
    });

    // Default tasks
    grunt.registerTask('dev', 
        [
            'devUpdate',
            'wiredep',
            'watch',
            'supervisor'    
        ]
    );

    grunt.registerTask('debug', ['open:debug', 'node-inspector']);
    grunt.registerTask('sup', ['watch', 'supervisor']);
};