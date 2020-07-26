import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import product, {
  ProductState
} from 'app/entities/product/product/product.reducer';
// prettier-ignore
import productBundle, {
  ProductBundleState
} from 'app/entities/product/product-bundle/product-bundle.reducer';
// prettier-ignore
import productBundleItem, {
  ProductBundleItemState
} from 'app/entities/product/product-bundle-item/product-bundle-item.reducer';
// prettier-ignore
import cartDiscountRule, {
  CartDiscountRuleState
} from 'app/entities/cart/cart-discount-rule/cart-discount-rule.reducer';
// prettier-ignore
import cartDiscountRuleItem, {
  CartDiscountRuleItemState
} from 'app/entities/cart/cart-discount-rule-item/cart-discount-rule-item.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly product: ProductState;
  readonly productBundle: ProductBundleState;
  readonly productBundleItem: ProductBundleItemState;
  readonly cartDiscountRule: CartDiscountRuleState;
  readonly cartDiscountRuleItem: CartDiscountRuleItemState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  product,
  productBundle,
  productBundleItem,
  cartDiscountRule,
  cartDiscountRuleItem,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar,
});

export default rootReducer;
