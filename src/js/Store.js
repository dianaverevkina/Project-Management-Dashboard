import { Subject } from 'rxjs';
import { startWith, scan, share } from 'rxjs/operators';
import reduce from './reduce';

export default class Store {
  constructor() {
    this.actions$ = new Subject();
    this.state$ = this.actions$.asObservable().pipe(
      startWith({ type: 'INITIALIZATION' }),
      scan((state, action) => reduce(state, action), { counter: 0 }),
      share(),
    );
  }

  dispatch(type, payload) {
    console.log('dispatch')
    this.actions$.next({ type, payload });
  }
}
