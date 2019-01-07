describe('apiClient', function() {

  it('should', function() {

    var $injector = angular.injector(['ngMock', ['$provide', function($provide) {
      $provide.constant('AuthenticationSucceededResult', (function() {
        function AuthenticationSucceededResult() {};
        return AuthenticationSucceededResult;
      })());
      $provide.constant('AuthenticationFailedResult', (function() {
        function AuthenticationFailedResult() {};
        return AuthenticationFailedResult;
      })());
      $provide.constant('AuthenticationRequiredResult', (function() {
        function AuthenticationRequiredResult() {};
        return AuthenticationRequiredResult;
      })());
      $provide.constant('AuthenticationTotallyFailedResult', (function() {
        function AuthenticationTotallyFailedResult() {};
        return AuthenticationTotallyFailedResult;
      })());
      $provide.constant('UnexpectedResponseResult', (function() {
        function UnexpectedResponseResult() {};
        return UnexpectedResponseResult;
      })());

      $provide.factory('AuthenticateRequest', function(AuthenticationSucceededResult, AuthenticationFailedResult) {
        function AuthenticateRequest(username) {
          this.username = username;
        };
        AuthenticateRequest.prototype.apply = function($http) {
          return $http.post('/authenticate', {
            username: this.username
          });
        };
        AuthenticateRequest.prototype.handleResponse = function(response) {
          if(response.status === 200) {
            return new AuthenticationSucceededResult();
          }

          if(response.status === 400) {
            return new AuthenticationFailedResult();
          }
        };
        return AuthenticateRequest;
      });

      $provide.constant('GetDataRequest', (function() {
        function GetDataRequest() {
        };
        GetDataRequest.prototype.apply = function($http) {
          return $http.get('/data');
        };
        GetDataRequest.prototype.handleResponse = function(response) {
          if(response.status === 200) {
            return response.data;
          }
        };
        return GetDataRequest;
      })());

      $provide.factory('apiRequestExecutor', ['$http', '$q', 'AuthenticationRequiredResult', 'UnexpectedResponseResult', function($http, $q, AuthenticationRequiredResult, UnexpectedResponseResult) {
        function makeResponseHandler(request) {
          return function(response) {
            var result = request.handleResponse(response);
            if(result) {
              return $q.when(result);
            }

            if(response.status === 400) {
              return $q.reject(new AuthenticationRequiredResult());
            }

            return $q.reject(new UnexpectedResponseResult());
          };
        };

        return {
          execute: function(request) {
            console.log('got request', request);
            var handleResponse = makeResponseHandler(request);
            return request.apply($http).then(handleResponse, handleResponse);
          }
        };
      }]);

      $provide.factory('authenticationService', ['apiRequestExecutor', 'AuthenticateRequest', 'AuthenticationSucceededResult', 'AuthenticationFailedResult', 'AuthenticationTotallyFailedResult', function(apiRequestExecutor, AuthenticateRequest, AuthenticationSucceededResult, AuthenticationFailedResult, AuthenticationTotallyFailedResult) {
        return {
          authenticate: function() {
            return apiRequestExecutor.execute(new AuthenticateRequest('loki2302')).then(function(result) {
              if(result instanceof AuthenticationSucceededResult) {
                return "ok";
              }

              if(result instanceof AuthenticationFailedResult) {
                return new AuthenticationTotallyFailedResult();
              }

              throw "should not get here";
            }, function(error) {
              // TODO: if shit happened (connectivity, or whatever), just delegate to the caller
            });
          }
        };
      }]);

      $provide.factory('apiClient', ['$q', 'apiRequestExecutor', 'AuthenticationRequiredResult', 'authenticationService', function($q, apiRequestExecutor, AuthenticationRequiredResult, authenticationService) {
        function doExecuteRequest(request, state) {
          if(!state.isAuthenticated) {
            console.log('we are not authenticated, going to try to authenticate and then exec the request');
            return authenticationService.authenticate().then(function() {
              console.log('we have managed to authenticate, going to exec the request')
              return doExecuteRequest(request, {
                isAuthenticated: true
              });
            });
          }

          console.log('we are authenticated, going to exec the request')
          return apiRequestExecutor.execute(request).then(function(result) {
            console.log('request exec succeeded');
            return result;
          }, function(error) {
            console.log('request exec failed', error);
            if(error instanceof AuthenticationRequiredResult) {
              console.log('setting authenticated=false');
              return doExecuteRequest(request, {
                isAuthenticated: false
              });

              throw "wtf???";
            }
          });
        };

        return {
          execute: function(request) {
            return doExecuteRequest(request, {
              isAuthenticated: true
            });
          }
        };
      }]);

      // TODO: add 0 status to emulate connectivity issues
      $provide.factory('backendHandler', function() {
        var isAuthenticated = false;
        return function(method, url, data, headers) {
          if(method === 'POST' && url === '/authenticate') {
            isAuthenticated = true;
            return [200, {}];
          } else if(method === 'GET' && url == '/data') {
            if(isAuthenticated) {
              return [200, {'theData': 'here is your data'}];
            }

            return [400, {}];
          } else {
            throw "wtf";
          }
        };
      });


    }]]);

    var AuthenticationSucceededResult = $injector.get('AuthenticationSucceededResult');
    var AuthenticationFailedResult = $injector.get('AuthenticationFailedResult');
    var AuthenticationRequiredResult = $injector.get('AuthenticationRequiredResult');

    var AuthenticateRequest = $injector.get('AuthenticateRequest');
    var GetDataRequest = $injector.get('GetDataRequest');
    var apiRequestExecutor = $injector.get('apiRequestExecutor');
    var apiClient = $injector.get('apiClient');
    apiClient.execute(new GetDataRequest()).then(function(result) {
      console.log('Successfully retrieved the data', result);
    }, function(error) {
      console.log('Failed to retrieve the data', error);
    });

    var $httpBackend = $injector.get('$httpBackend');
    var backendHandler = $injector.get('backendHandler');
    $httpBackend.whenPOST('/authenticate').respond(backendHandler);
    $httpBackend.whenGET('/data').respond(backendHandler);
    $httpBackend.flush();
  });
});
