import { ICartDiscountRule } from 'app/shared/model/cart/cart-discount-rule.model';

export interface ICartDiscountRuleItem {
  id?: number;
  productId?: number;
  cartDiscountRule?: ICartDiscountRule;
}

export const defaultValue: Readonly<ICartDiscountRuleItem> = {};
