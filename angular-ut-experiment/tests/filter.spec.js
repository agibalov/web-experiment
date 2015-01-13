angular.module('test.filter', [])
.filter('reverse', function() {
  return function(text) {
    if(!text || typeof text !== 'string') {
      return '';
    }

    return text.split('').reverse().join('');
  };
});

describe('reverse', function() {
  var reverseFilter;
  beforeEach(function() {
    var $injector = angular.injector(['ng', 'test.filter']);
    var $filter = $injector.get('$filter');
    reverseFilter = $filter('reverse');
  });

  it('should reverse a string', function() {
    expect(reverseFilter('hello')).toEqual('olleh');
    expect(reverseFilter('aaa')).toEqual('aaa');
  });

  it('should return an empty string when I give it something other than string', function() {
    expect(reverseFilter(null)).toEqual('');
    expect(reverseFilter(undefined)).toEqual('');
    expect(reverseFilter(123)).toEqual('');
    expect(reverseFilter(true)).toEqual('');
    expect(reverseFilter({})).toEqual('');
    expect(reverseFilter([])).toEqual('');
    expect(reverseFilter(function() {})).toEqual('');
  });
});
