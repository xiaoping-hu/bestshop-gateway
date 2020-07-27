import { ICartDiscountRuleItem } from 'app/shared/model/cart/cart-discount-rule-item.model';

export interface ICartDiscountRule {
  id?: number;
  name?: string;
  minimumQuantity?: number;
  discountQuantity?: number;
  discountAmount?: number;
  priority?: number;
  cartDiscountRuleItems?: ICartDiscountRuleItem[];
}

export const defaultValue: Readonly<ICartDiscountRule> = {};
