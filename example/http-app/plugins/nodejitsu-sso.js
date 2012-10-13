var request = require('request');
var sso = module.exports;
//
// SSO integration example
//
sso.name = 'nodejitsu-sso';
sso.init = function (done) {
   var app = this;
   app.before('http.authorization', function (req, res, next) {
      request({
         url: 'https://api.nodejitsu.com/auth',
         headers: req.headers
      }, function (err, sso_res) {
         if (sso_res.statusCode === 200) {
            req.authorization = req.headers.authorization;
         }
         next(null, req, res);
      });
   });
   app.after('http.authorization', function (req, res, next) {
      if (!req.authorized) {
         console.log('unauthorized request to:', req.url, 'from:', req.connection.remoteAddress);
      }
      next();
   });
   done();
}