import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import CartDiscountRuleItem from './cart-discount-rule-item';
import CartDiscountRuleItemDetail from './cart-discount-rule-item-detail';
import CartDiscountRuleItemUpdate from './cart-discount-rule-item-update';
import CartDiscountRuleItemDeleteDialog from './cart-discount-rule-item-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CartDiscountRuleItemUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CartDiscountRuleItemUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CartDiscountRuleItemDetail} />
      <ErrorBoundaryRoute path={match.url} component={CartDiscountRuleItem} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={CartDiscountRuleItemDeleteDialog} />
  </>
);

export default Routes;
