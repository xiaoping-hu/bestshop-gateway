import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ProductBundle from './product-bundle';
import ProductBundleDetail from './product-bundle-detail';
import ProductBundleUpdate from './product-bundle-update';
import ProductBundleDeleteDialog from './product-bundle-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ProductBundleUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ProductBundleUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ProductBundleDetail} />
      <ErrorBoundaryRoute path={match.url} component={ProductBundle} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ProductBundleDeleteDialog} />
  </>
);

export default Routes;
