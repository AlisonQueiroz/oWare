import { FormBuilder, Validators } from '@angular/forms';
import { WarehouseItem } from 'src/app/Store/state/warehouse-item.model';
import { Component, Injectable, ChangeDetectionStrategy } from '@angular/core';
import { WarehouseItemsQuery } from 'src/app/Store/state/warehouse-items.query';
import { WarehouseItemsService } from 'src/app/Store/state/warehouse-items.service';
import { ValidatorService, TableActions } from 'src/app/Shared/Components/editable-table';
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
    super(validator, itemsService, itemsQuery);
  }
}
