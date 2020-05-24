import { ValidatorService, TableActions } from '../Shared/Components/editable-table';
import { Component, Injectable, ChangeDetectionStrategy } from '@angular/core';
import { WarehouseItemsService } from '../Store/state/warehouse-items.service';
import { WarehouseItemsQuery } from '../Store/state/warehouse-items.query';
import { WarehouseItem } from '../Store/state/warehouse-item.model';
import { FormBuilder, Validators } from '@angular/forms';
import * as _ from 'lodash';

@Injectable()
export class Validator implements ValidatorService {
  constructor(private fb: FormBuilder) {}

  getValidator() {
    return this.fb.group({
      id: null,
      name: [null, Validators.required],
      coord: [null, Validators.required],
      'part number': [null, Validators.required],
      quantity: [null, [Validators.required, Validators.pattern('^[0-9]*$')]]
    });
  }
}

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
  providers: [{ provide: ValidatorService, useClass: Validator }],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemsComponent extends TableActions<WarehouseItem> {
  constructor(
    validator: ValidatorService,
    itemsQuery: WarehouseItemsQuery,
    itemsService: WarehouseItemsService,
  ) {
    super(itemsQuery, itemsService, validator);
  }
}
