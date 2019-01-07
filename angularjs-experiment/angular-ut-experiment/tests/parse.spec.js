describe('parse', function() {
  it('should let me parse an expression', function() {
    var $injector = angular.injector(['ng']);
    var $parse = $injector.get('$parse');
    var addFunc = $parse('a+b');
    expect(angular.isFunction(addFunc)).toBe(true);
  });

  it('should let me get a result of expression evaluation', function() {
    var $injector = angular.injector(['ng']);
    var $parse = $injector.get('$parse');
    var addFunc = $parse('a+b');
    expect(addFunc({ a: 2, b: 3 })).toBe(5);
    expect(addFunc({ a: 2, b: 3 }, { a: 9 })).toBe(12);
  });

  it('should let me modify the context', function() {
    var $injector = angular.injector(['ng']);
    var $parse = $injector.get('$parse');
    var func = $parse('a = 123');
    var context = { a: 222 };
    func(context);
    expect(context.a).toBe(123);
  });

  it('should let me use the filters', function() {
    var $injector = angular.injector(['ng']);
    var $parse = $injector.get('$parse');
    var nameToUppercase = $parse('name|uppercase');
    expect(nameToUppercase({ name: 'loki2302' })).toBe('LOKI2302');
  });
});
