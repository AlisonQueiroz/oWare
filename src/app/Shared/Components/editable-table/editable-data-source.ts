import { ValidatorService, TableElement } from './table-element';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';

export class EditableDataSource<T> extends MatTableDataSource<TableElement<T>> {
  readonly dataValues$ = new Subject<T[]>();
  data: TableElement<T>[];

  constructor(
    initialData: T[],
    private validator: ValidatorService,
    public options?: {
      /**
       * will add new rows at the bottom
       * @default false
       */
      newLineAtTheBottom?: boolean,

      /**
       * permits multiple lines editing in same time
       * @default false
       */
      multiLineEdit?: boolean,

      /**
       * It will set every row as editing
       * @default false
       */
      editing?: boolean
    }
  ) {
    super();
    this.options = options || {};
    this.setData(initialData);
  }

  /**
   * remove all previous data and add the new list.
   * Do not use data$ subject to update data, it won't work!
   * @param data data array
   */
  setData(data: T[]) {
    this.data = TableElement
      .fromCollection(data, this, this.validator, {
        startEditing: this.options.editing
      });

    this.dataValues$.next(data);
  }

  /**
   * add a new line checking the options that was passed
   * @returns the new TableElement
   */
  createNew(): TableElement<T> {
    if (!this.options.multiLineEdit && this.editing) {
      return;
    }

    const newData = new TableElement<T>(
      null, this, this.validator, {
        startEditing: true
      }
    );

    this.data = this.options.newLineAtTheBottom
      ? [...this.data, newData]
      : [newData, ...this.data];

    return newData;
  }

  /**
   * returns the row by its id. New rows have id -1
   */
  getRow(id: number) {
    return this.data.find(x => x.id === id);
  }

  get editing() {
    const newRow = this.getRow(-1);
    const anyone = this.data.some(x => x.editing);

    return (newRow ? newRow.editing : false || anyone);
  }
}
