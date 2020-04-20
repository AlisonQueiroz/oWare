import { Injectable } from '@angular/core';
import { WarehouseItem } from './warehouse-item.model';
import { EntityState, ActiveState, EntityStore, StoreConfig } from '@datorama/akita';

export interface WarehouseItemsState extends EntityState<WarehouseItem, string>, ActiveState<string> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'w-items' })
export class WarehouseItemsStore extends EntityStore<WarehouseItemsState> {

  constructor() {
    super();
  }

}

