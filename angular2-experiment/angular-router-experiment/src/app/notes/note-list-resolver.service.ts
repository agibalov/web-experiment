import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';

export class NoteListResolver implements Resolve<string[]> {
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<string[]> {
        const sort = route.queryParams['sort'] || 'asc';

        let data = ['note one', 'note two', 'note three'];
        data.sort();
        if(sort == 'desc') {
            data.reverse();
        }

        return Observable.of(data).delay(1000);
    }
}
