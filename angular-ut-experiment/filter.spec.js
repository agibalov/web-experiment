angular.module('filterApp', [])
.filter('reverse', function() {
  return function(text) {
    if(!text || typeof text !== 'string') {
      return '';
    }

    return text.split('').reverse().join('');
  };
});

describe('reverse', function() {
  beforeEach(module('filterApp'));

  it('should reverse a string', inject(function(reverseFilter) {
    expect(reverseFilter('hello')).toEqual('olleh');
    expect(reverseFilter('aaa')).toEqual('aaa');
  }));

  it('should return an empty string when I give it null', inject(function(reverseFilter) {
    expect(reverseFilter(null)).toEqual('');
    expect(reverseFilter(undefined)).toEqual('');
    expect(reverseFilter(123)).toEqual('');
    expect(reverseFilter(true)).toEqual('');
    expect(reverseFilter({})).toEqual('');
    expect(reverseFilter([])).toEqual('');
    expect(reverseFilter(function(){})).toEqual('');
  }));
});
