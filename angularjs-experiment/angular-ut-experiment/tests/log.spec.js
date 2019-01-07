describe('$log', function() {
  var $log;
  beforeEach(inject(function(_$log_) {
    $log = _$log_;
  }));

  it('should remember what I said', function() {
    $log.info('hello', 123);

    var infos = $log.info.logs;    
    expect(infos.length).toBe(1);
    expect(infos[0].length).toBe(2);
    expect(infos[0][0]).toBe('hello');
    expect(infos[0][1]).toBe(123);
  });

  it('should let me reset it', function() {
    $log.info('hello', 123);
    $log.reset();
    expect($log.info.logs.length).toBe(0);
  });
});
