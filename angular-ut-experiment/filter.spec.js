angular.module('filterApp', [])
.filter('reverse', function() {
  return function(text) {
    return text.split("").reverse().join("");
  };
});

describe('reverse', function() {
  beforeEach(module('filterApp'));

  it('should reverse a string', inject(function(reverseFilter) {
    expect(reverseFilter('hello')).toEqual('olleh');
    expect(reverseFilter('aaa')).toEqual('aaa');
  }));
});
