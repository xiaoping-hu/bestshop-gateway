import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Product from './product/product';
import ProductBundle from './product/product-bundle';
import ProductBundleItem from './product/product-bundle-item';
import CartDiscountRule from './cart/cart-discount-rule';
import CartDiscountRuleItem from './cart/cart-discount-rule-item';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}product`} component={Product} />
      <ErrorBoundaryRoute path={`${match.url}product-bundle`} component={ProductBundle} />
      <ErrorBoundaryRoute path={`${match.url}product-bundle-item`} component={ProductBundleItem} />
      <ErrorBoundaryRoute path={`${match.url}cart-discount-rule`} component={CartDiscountRule} />
      <ErrorBoundaryRoute path={`${match.url}cart-discount-rule-item`} component={CartDiscountRuleItem} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
