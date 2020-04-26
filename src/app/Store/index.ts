import { combineQueries } from '@datorama/akita';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

export const mergeAllLoading = (loader: {
  get$: Observable<boolean>;
  add$: Observable<boolean>;
  update$: Observable<boolean>;
  delete$: Observable<boolean>;
  syncCollection: (id: any) => Observable<boolean>;
}) => {
  return combineQueries([
    loader.get$.pipe(startWith(false)),
    loader.add$.pipe(startWith(false)),
    loader.update$.pipe(startWith(false)),
    loader.delete$.pipe(startWith(false))
  ]).pipe(
    map(data => data.some(x => x))
  );
};
