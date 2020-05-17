import { Component, OnInit, Injectable, ChangeDetectionStrategy, ViewChild, OnDestroy, AfterContentInit } from '@angular/core';
import { ValidatorService, EditableDataSource, TableElement } from '../Shared/Components/editable-table';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { WarehouseItemsQuery } from '../Store/state/warehouse-items.query';
import { WarehouseItemsService } from '../Store/state/warehouse-items.service';
import { Subject, BehaviorSubject } from 'rxjs';
import { WarehouseItem } from '../Store/state/warehouse-item.model';
import { take } from 'rxjs/operators';
import * as _ from 'lodash';

@Injectable()
export class Validator implements ValidatorService {
  constructor(private fb: FormBuilder) {}

  getValidator() {
    return this.fb.group({
      id: null,
      'part number': [null, Validators.required],
      name: [null, Validators.required],
      coord: [null, Validators.required],
      quantity: [null, Validators.required]
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
export class ItemsComponent implements OnInit, AfterContentInit, OnDestroy {
  @ViewChild(MatSort) sort: MatSort;

  readonly data$ = this.itemsQuery.selectAll();
  readonly list$ = this.itemsService
    .syncCollection().pipe(
      take(1)
    ).subscribe(data => {
      this.dataSource.setData(data.map(e => e.payload.doc.data()));
      this.loading$.next(false);
    });
  readonly loading$ = new BehaviorSubject<boolean>(true);

  readonly dataSource = new EditableDataSource<WarehouseItem>([], this.validator);
  private readonly destroy$ = new Subject();

  readonly displayedColumns = [
    'name',
    'coord',
    'quantity',
    'part number'
  ];

  readonly allColumns = this.displayedColumns
    .concat('actions');

  readonly columnTitles = this.displayedColumns
    .map(c => _.startCase(c));

  constructor(
    private validator: ValidatorService,
    private itemsQuery: WarehouseItemsQuery,
    private itemsService: WarehouseItemsService
  ) { }

  ngOnInit() {
  }

  ngAfterContentInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (row, col) => row.data[col];
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  confirmEditCreate(row: TableElement<WarehouseItem>) {
    if (!row.editing) {
      return row.confirmEditCreate();
    }

    row.data.id
      ? this.itemsService.update(row.data)
      : this.itemsService.add(row.data);
    row.confirmEditCreate();
  }

  cancelOrDelete(row: TableElement<WarehouseItem>) {
    if (row.editing) {
      return row.cancelOrDelete();
    }

    this.itemsService.remove(row.data.id as string);
    row.delete();
  }

}
