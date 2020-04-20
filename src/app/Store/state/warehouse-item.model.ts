import { ID } from '@datorama/akita';
export interface WarehouseItem {
  id: ID;
  name: string;
  coord: string;
  quantity: number;
}

export function createWarehouseItem(params: Partial<WarehouseItem>) {
  return {

  } as WarehouseItem;
}
