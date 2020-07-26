import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ProductBundleItem from './product-bundle-item';
import ProductBundleItemDetail from './product-bundle-item-detail';
import ProductBundleItemUpdate from './product-bundle-item-update';
import ProductBundleItemDeleteDialog from './product-bundle-item-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ProductBundleItemUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ProductBundleItemUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ProductBundleItemDetail} />
      <ErrorBoundaryRoute path={match.url} component={ProductBundleItem} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ProductBundleItemDeleteDialog} />
  </>
);

export default Routes;
