import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/filter';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';

describe('rxjs', () => {
  it('should allow me to use Subject for testing', () => {
    const subject = new Subject<number>();

    const log: number[] = [];
    subject.subscribe(x => {
      log.push(x);
    });

    subject.next(111);
    subject.next(222);
    subject.next(333);

    expect(log).toEqual([111, 222, 333]);
  });

  describe('filter', () => {
    it('should work', () => {
      const subject = new Subject<number>();

      const log: number[] = [];
      subject.filter(x => x % 2 === 0).subscribe(x => {
        log.push(x);
      });

      subject.next(111);
      subject.next(222);
      subject.next(333);

      expect(log).toEqual([222]);
    });
  });

  describe('combineLatest', () => {
    it('should work', () => {
      const subjectA = new Subject<string>();
      const subjectB = new Subject<string>();
      const log: string[] = [];
      const subject = Observable.combineLatest(subjectA, subjectB).subscribe(([a, b]) => {
        log.push(`${a}-${b}`);
      });

      subjectA.next('hello');
      expect(log).toEqual([]);

      subjectB.next('world');
      expect(log).toEqual(['hello-world']);

      subjectA.next('bye');
      expect(log).toEqual(['hello-world', 'bye-world']);
    });
  });
});
