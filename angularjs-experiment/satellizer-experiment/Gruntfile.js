module.exports = function(grunt) {
  grunt.initConfig({
    connect: {
      server: {
        options: {
          keepalive: true,
          port: 3000,
          base: [
            'src',
            'bower_components'
          ],
          middleware: function(connect, options, middlewares) {
            middlewares.unshift(connect().use('/auth/github', function(req, res, next) {
              console.log('Got request body', req.body);

              var jwt = require('jwt-simple');
              var moment = require('moment');
              var request = require('request');
              var qs = require('querystring');

              // exchange authorization code for access token
              request.get({
                url: 'https://github.com/login/oauth/access_token',
                qs: {
                  code: req.body.code,
                  client_id: req.body.clientId,
                  client_secret: '16d1a46fe7ed81b1d1201eae920d3e3b23a357a0',
                  redirect_uri: req.body.redirectUri
                }
              }, function(error, response, accessToken) {
                accessToken = qs.parse(accessToken);
                console.log('Got access token', accessToken);

                // use access token to get the user profile
                request.get({
                  url: 'https://api.github.com/user',
                  qs: accessToken,
                  headers: { 'User-Agent': 'Idiot' },
                  json: true
                }, function(error, response, profile) {
                  console.log('Got profile', profile);

                  // respond with JWT containing github login as a sub
                  var payload = {
                    sub: profile.login,
                    iat: moment().unix(),
                    exp: moment().add(14, 'days').unix()
                  };
                  var token = jwt.encode(payload, 'My JWT token secret');

                  res.end(JSON.stringify({ token: token }));
                });
              });
            }));
            middlewares.unshift(connect().use(require('body-parser').json()));
            return middlewares;
          }
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
};
