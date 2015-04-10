describe('Reverse filter', function() {
  beforeEach(module(function($filterProvider) {
    $filterProvider.register('reverse', function() {
      return function(text) {
        if(!text || typeof text !== 'string') {
          return '';
        }

        return text.split('').reverse().join('');
      };
    });
  }));

  var reverseFilter;
  beforeEach(inject(function($filter) {
    reverseFilter = $filter('reverse');
  }));

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
