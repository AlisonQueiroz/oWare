import { FormGroup } from '@angular/forms';
import { startWith } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import * as _ from 'lodash';

import { EditableDataSource } from './editable-data-source';

export abstract class ValidatorService {
  /** will be used to update or not the form group after getValidator */
  abstract preventUpdate?: boolean;

  /**
   * returns a form group to validate data row
   * @param rawData raw data object
   */
  abstract getValidator(rawData?: any): FormGroup;
}

export class TableElement<T> {
  /** form group instance */
  form: FormGroup;

  /** emits the 'editing' status on every change */
  editChanges: Observable<boolean>;

  // getters
  /** the current data id. Will return -1 if no id was found */
  get id(): number {
    return this.form.value.id || -1;
  }

  /** current data (same as form.value) */
  get data(): T {
    return this.form.value;
  }

  /** returns true if the row is in edit mode */
  get editing() {
    return this._editing$.value;
  }

  /** what changed in form data */
  get changes(): Partial<T> {
    const data = { ...this.data };

    Object.keys(data).forEach(key => {
      if (_.isEqual(data[key], this.initialData[key])) {
        delete data[key];
      }
    });

    return data;
  }

  // privates
  private _editing$: BehaviorSubject<boolean>;
  private _dataSource: EditableDataSource<T>;

  constructor(
    public initialData: T,
    dataSource: EditableDataSource<T>,
    validator: ValidatorService,
    private options?: {
      startEditing?: boolean
    }
  ) {
    this.options = options || {};
    this.form = validator.getValidator(initialData);

    // patch value or not
    if (!validator.preventUpdate && initialData) {
      this.form.patchValue(initialData);
    }

    this._dataSource = dataSource;
    this._editing$ = new BehaviorSubject(options.startEditing);
    this._editing$.subscribe(editing => editing ? this.form.enable() : this.form.disable());

    this.editChanges = this._editing$.pipe(
      startWith(this._editing$.value)
    );
  }

  /** instantiate multiple instances from a collection */
  static fromCollection<T>(
    collection: T[],
    dataSource: EditableDataSource<T>,
    validator: ValidatorService,
    options = {
      startEditing: false
    }
  ) {
    return collection.map(x => new TableElement<T>(
      x, dataSource, validator, options
    ));
  }

  // actions

  /**
   * set editing status to true
   */
  startEdit() {
    if (!this._dataSource.options.multiLineEdit && this._dataSource.editing) {
      return;
    }

    this._editing$.next(true);
  }

  /**
   * delete current row
   */
  delete(): TableElement<T> {
    this._dataSource.data = _.without(this._dataSource.data, this);
    this.emitUpdate();
    return this;
  }

  /**
   * if row is editing will roll back data, else will delete the current row
   */
  cancelOrDelete() {
    if (this.id === -1) {
      return this.delete();
    }

    this.form.patchValue(this.initialData);
    this._editing$.next(!this.editing);
    this.emitUpdate();
  }

  /**
   *
   */
  confirmEditCreate() {
    if (this.form.invalid) { return; }

    this.initialData = this.form.value;
    this._editing$.next(!this.editing);
    this.emitUpdate();
  }

  private emitUpdate() {
    const data = this._dataSource.data.map(x => x.data);
    this._dataSource.dataValues$.next(data);
  }
}
