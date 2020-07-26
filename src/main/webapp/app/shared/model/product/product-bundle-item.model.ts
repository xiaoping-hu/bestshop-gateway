import { IProductBundle } from 'app/shared/model/product/product-bundle.model';
import { IProduct } from 'app/shared/model/product/product.model';

export interface IProductBundleItem {
  id?: number;
  quantity?: number;
  discountAmount?: number;
  productBundle?: IProductBundle;
  product?: IProduct;
}

export const defaultValue: Readonly<IProductBundleItem> = {};
