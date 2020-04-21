import { Component, OnInit, Injectable, ChangeDetectionStrategy, ViewChild, OnDestroy } from '@angular/core';
import { ValidatorService, EditableDataSource, TableElement } from '../Shared/Components/editable-table';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { WarehouseItemsQuery } from '../Store/state/warehouse-items.query';
import { WarehouseItemsService } from '../Store/state/warehouse-items.service';
import { Subject } from 'rxjs';
import { WarehouseItem } from '../Store/state/warehouse-item.model';
import { mergeAllLoading } from '../Store';
import { NgEntityServiceLoader } from '@datorama/akita-ng-entity-service';
import { takeUntil } from 'rxjs/operators';

@Injectable()
export class Validator implements ValidatorService {
  constructor(private fb: FormBuilder) {}

  getValidator() {
    return this.fb.group({
      id: null,
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
export class ItemsComponent implements OnInit, OnDestroy {
  @ViewChild(MatSort) sort: MatSort;

  readonly data$ = this.itemsQuery.selectAll();
  readonly loading$ = mergeAllLoading(this.loader.loadersFor('item'));

  readonly dataSource = new EditableDataSource<WarehouseItem>([], this.validator);
  private readonly destroy$ = new Subject();

  readonly displayedColumns = [
    'name',
    'coord',
    'quantity',
    'actions'
  ];

  constructor(
    private validator: ValidatorService,
    private itemsQuery: WarehouseItemsQuery,
    private itemsService: WarehouseItemsService,
    private loader: NgEntityServiceLoader,
  ) { }

  ngOnInit(): void {
    this.itemsService
      .syncCollection().pipe(
        takeUntil(this.destroy$)
      ).subscribe(data => {
        this.dataSource.setData([data[0].payload.doc.data()]);
      });
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
  }

  cancelOrDelete(row: TableElement<WarehouseItem>) {
    if (row.editing) {
      return row.cancelOrDelete();
    }

    this.itemsService.remove(row.data.id as string);
  }

}
