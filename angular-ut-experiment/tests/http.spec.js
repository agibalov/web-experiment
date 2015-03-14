describe('$http', function() {
  it('should provide successful result when there was no error', inject(function($httpBackend, $http) {
    $httpBackend.expect('GET', '/something').respond(200, { here: 'it is' });

    var onSuccess = jasmine.createSpy('onSuccess');
    var onError = jasmine.createSpy('onError');
    
    $http.get('/something').then(onSuccess, onError);

    $httpBackend.verifyNoOutstandingExpectation();

    expect(onSuccess).not.toHaveBeenCalled();
    expect(onError).not.toHaveBeenCalled();

    $httpBackend.flush();
    $httpBackend.verifyNoOutstandingRequest();

    expect(onSuccess.calls.count()).toBe(1);
    expect(onSuccess).toHaveBeenCalledWith(jasmine.objectContaining({
      status: 200,
      data: {
        here: 'it is'
      }
    }));    

    expect(onError).not.toHaveBeenCalled();
  }));

  it('should provide error result when there was an error', inject(function($httpBackend, $http) {
    $httpBackend.expect('GET', '/something').respond(400, { here: 'it is' });

    var onSuccess = jasmine.createSpy('onSuccess');
    var onError = jasmine.createSpy('onError');
    
    $http.get('/something').then(onSuccess, onError);

    $httpBackend.verifyNoOutstandingExpectation();

    expect(onSuccess).not.toHaveBeenCalled();
    expect(onError).not.toHaveBeenCalled();

    $httpBackend.flush();
    $httpBackend.verifyNoOutstandingRequest();

    expect(onError.calls.count()).toBe(1);
    expect(onError).toHaveBeenCalledWith(jasmine.objectContaining({
      status: 400,
      data: {
        here: 'it is'
      }
    }));    

    expect(onSuccess).not.toHaveBeenCalled();
  }));
});
