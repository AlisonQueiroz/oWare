import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { WarehouseItemsStore, WarehouseItemsState } from './warehouse-items.store';

@Injectable({ providedIn: 'root' })
export class WarehouseItemsQuery extends QueryEntity<WarehouseItemsState> {

  constructor(protected store: WarehouseItemsStore) {
    super(store);
  }

}
