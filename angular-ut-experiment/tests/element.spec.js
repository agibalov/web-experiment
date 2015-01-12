describe('element', function() {
  it('should have a class when the class is added', function() {
    var element = angular.element('<div></div>');
    expect(element.hasClass('omg')).toBe(false);

    element.addClass('omg');
    expect(element.hasClass('omg')).toBe(true);
  });

  it('should not have a class when the class is removed', function() {
    var element = angular.element('<div class="omg"></div>');
    expect(element.hasClass('omg')).toBe(true);

    element.removeClass('omg');
    expect(element.hasClass('omg')).toBe(false);
  });

  it('should call the handler added with a bind call', function() {
    var element = angular.element('<div></div>');
    var clicked = false;
    element.bind('click', function() {
      clicked = true;
    });
    
    element.triggerHandler('click');
    expect(clicked).toBe(true);
  });

  it('should stop calling the handler after an unbind call', function() {
    var element = angular.element('<div></div>');
    var clicked = false;
    element.bind('click', function() {
      clicked = true;
    });
    element.unbind('click');

    element.triggerHandler('click');
    expect(clicked).toBe(false);
  });

  it('should let me manipulate its children', function() {
    var element = angular.element('<ul></ul>');
    expect(element.children().length).toBe(0);
    expect(element.html()).toBe('');

    element.append('<li>item 1</li>');
    expect(element.children().length).toBe(1);
    expect(element.html()).toBe('<li>item 1</li>');

    var item2Element = angular.element('<li>item 2</li>');
    element.append(item2Element);
    expect(element.children().length).toBe(2);
    expect(element.html()).toBe('<li>item 1</li><li>item 2</li>');

    element.prepend('<li>item 0</li>');
    expect(element.children().length).toBe(3);
    expect(element.html()).toBe('<li>item 0</li><li>item 1</li><li>item 2</li>');
    
    item2Element.remove();
    expect(element.children().length).toBe(2);
    expect(element.html()).toBe('<li>item 0</li><li>item 1</li>');
  });
});
