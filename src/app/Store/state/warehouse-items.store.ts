import { Injectable } from '@angular/core';
import { WarehouseItem } from './warehouse-item.model';
import { EntityStore, StoreConfig } from '@datorama/akita';
import { CollectionState } from 'akita-ng-fire';

export interface WarehouseItemsState extends CollectionState<WarehouseItem> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'item' })
export class WarehouseItemsStore extends EntityStore<WarehouseItemsState> {

  constructor() {
    super();
  }

}

