import { IProductBundleItem } from 'app/shared/model/product/product-bundle-item.model';

export interface IProduct {
  id?: number;
  title?: string;
  description?: string;
  price?: number;
  imageUrl?: string;
  productBundleItems?: IProductBundleItem[];
}

export const defaultValue: Readonly<IProduct> = {};
