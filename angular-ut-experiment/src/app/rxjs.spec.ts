import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/filter';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/merge';

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

  describe('map', () => {
    it('should work', () => {
      const subject = new Subject<number>();

      const log: number[] = [];
      subject.map(x => 2 * x + 1)
        .subscribe(next => log.push(next));

      subject.next(2);
      expect(log).toEqual([5]);

      subject.next(3);
      expect(log).toEqual([5, 7]);
    });
  });

  describe('switchMap', () => {
    it('should work', () => {
      const getUserData = userId => Observable.of(`data for user ${userId}`);

      const userIdSubject = new Subject<string>();

      const log: string[] = [];
      userIdSubject.switchMap(userId => getUserData(userId))
        .subscribe(userData => log.push(`user data: ${userData}`));

      userIdSubject.next('123');
      expect(log).toEqual(['user data: data for user 123']);

      userIdSubject.next('222');
      expect(log).toEqual(['user data: data for user 123', 'user data: data for user 222']);
    });
  });

  describe('merge', () => {
    it('should work', () => {
      const subject1 = new Subject<string>();
      const subject2 = new Subject<string>();

      const observable = subject1.merge(subject2);
      const log = [];
      observable.subscribe(next => log.push(next));

      subject1.next('hello');
      expect(log).toEqual(['hello']);

      subject2.next('world');
      expect(log).toEqual(['hello', 'world']);

      subject2.next('!');
      expect(log).toEqual(['hello', 'world', '!']);

      subject1.next('!!');
      expect(log).toEqual(['hello', 'world', '!', '!!']);
    });
  });
});
