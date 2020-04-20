import { Injectable } from '@angular/core';
import { WarehouseItemsStore, WarehouseItemsState } from './warehouse-items.store';
import { CollectionConfig, CollectionService } from 'akita-ng-fire';

@Injectable({ providedIn: 'root' })
@CollectionConfig({ path: 'w-items' })
export class WarehouseItemsService extends CollectionService<WarehouseItemsState> {

  constructor(store: WarehouseItemsStore) {
    super(store);
  }

}
