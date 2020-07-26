import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import CartDiscountRule from './cart-discount-rule';
import CartDiscountRuleDetail from './cart-discount-rule-detail';
import CartDiscountRuleUpdate from './cart-discount-rule-update';
import CartDiscountRuleDeleteDialog from './cart-discount-rule-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CartDiscountRuleUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CartDiscountRuleUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CartDiscountRuleDetail} />
      <ErrorBoundaryRoute path={match.url} component={CartDiscountRule} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={CartDiscountRuleDeleteDialog} />
  </>
);

export default Routes;
