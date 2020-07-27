import { IProductBundleItem } from 'app/shared/model/product/product-bundle-item.model';

export interface ICartItemProduct {
  id?: number;
  type?: string;
  price?: number;
  title?: string;
  productBundleItems?: IProductBundleItem[];
}

export interface ICartItem {
  product?: ICartItemProduct;
  quantity?: number;
  total?: number;
}

export interface ICart {
  total?: number;
  items?: ICartItem[];
}

export const defaultValue: Readonly<ICart> = {};
