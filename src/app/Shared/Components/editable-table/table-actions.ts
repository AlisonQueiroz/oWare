import { OnDestroy, ViewChild, OnInit, AfterContentInit } from '@angular/core';
import { DocumentChangeAction } from '@angular/fire/firestore/interfaces';
import { EditableDataSource, ValidatorService, TableElement } from '.';
import { StoreOptions } from 'akita-ng-fire/lib/utils/store-options';
import { MatSort } from '@angular/material/sort';
import { WriteOptions } from 'akita-ng-fire';
import { Subject, Observable } from 'rxjs';
import { ID } from '@datorama/akita';
import * as _ from 'lodash';

interface GenericQuery<T> {
  selectLoading(): Observable<boolean>;
  selectAll(): Observable<T[]>;
}

interface GenericService<T> {
  syncCollection(
    storeOptions?: Partial<StoreOptions>
  ): Observable<DocumentChangeAction<T>[]>;
  remove(id: string | string[], options?: WriteOptions): Promise<void>;
  add(documents: T | T[], options?: WriteOptions): Promise<any>;
  update(entity: Partial<T>, options?: WriteOptions): any;
}

export class TableActions<T extends { id?: ID }>
  implements OnInit, OnDestroy, AfterContentInit {
  @ViewChild(MatSort) sort: MatSort;

  readonly displayedColumns = Object.keys(
    this.gValidator.getValidator().controls
  ).filter(v => v !== 'id');
  readonly allColumns = this.displayedColumns.concat('actions');
  readonly columnTitles = this.displayedColumns.map(c => _.startCase(c));

  readonly dataSource = new EditableDataSource<T>([], this.gValidator);
  readonly list$ = this.service.syncCollection().subscribe();
  readonly loading$ = this.query.selectLoading();
  readonly data$ = this.query.selectAll();

  protected readonly destroy$ = new Subject();

  constructor(
    private query: GenericQuery<T>,
    private service: GenericService<T>,
    private gValidator: ValidatorService
  ) {}

  ngOnInit() {
    this.data$.subscribe((data: T[]) => this.dataSource.setData(data));
  }

  ngAfterContentInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (row, col) => row.data[col];
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  confirmEditCreate(row: TableElement<T>) {
    if (!row.editing) {
      return row.confirmEditCreate();
    }

    row.data.id ? this.service.update(row.data) : this.service.add(row.data);
    row.confirmEditCreate();
  }

  cancelOrDelete(row: TableElement<T>) {
    if (row.editing) {
      return row.cancelOrDelete();
    }

    this.service.remove(row.data.id as string);
    row.delete();
  }
}
