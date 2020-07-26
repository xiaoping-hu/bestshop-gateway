import { IProductBundleItem } from 'app/shared/model/product/product-bundle-item.model';

export interface IProductBundle {
  id?: number;
  name?: string;
  productBundleItems?: IProductBundleItem[];
}

export const defaultValue: Readonly<IProductBundle> = {};
