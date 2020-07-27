import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IProductBundle } from 'app/shared/model/product/product-bundle.model';
import { getEntities as getProductBundles } from 'app/entities/product/product-bundle/product-bundle.reducer';
import { IProduct } from 'app/shared/model/product/product.model';
import { getEntities as getProducts } from 'app/entities/product/product/product.reducer';
import { getEntity, updateEntity, createEntity, reset } from './product-bundle-item.reducer';
import { IProductBundleItem } from 'app/shared/model/product/product-bundle-item.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IProductBundleItemUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ProductBundleItemUpdate = (props: IProductBundleItemUpdateProps) => {
  const [productBundleId, setProductBundleId] = useState('0');
  const [productId, setProductId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { productBundleItemEntity, productBundles, products, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/product-bundle-item' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getProductBundles();
    props.getProducts();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...productBundleItemEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gatewayApp.productProductBundleItem.home.createOrEditLabel">
            <Translate contentKey="gatewayApp.productProductBundleItem.home.createOrEditLabel">
              Create or edit a ProductBundleItem
            </Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : productBundleItemEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="product-bundle-item-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="product-bundle-item-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="quantityLabel" for="product-bundle-item-quantity">
                  <Translate contentKey="gatewayApp.productProductBundleItem.quantity">Quantity</Translate>
                </Label>
                <AvField
                  id="product-bundle-item-quantity"
                  type="string"
                  className="form-control"
                  name="quantity"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    number: { value: true, errorMessage: translate('entity.validation.number') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="discountAmountLabel" for="product-bundle-item-discountAmount">
                  <Translate contentKey="gatewayApp.productProductBundleItem.discountAmount">Discount Amount</Translate>
                </Label>
                <AvField
                  id="product-bundle-item-discountAmount"
                  type="string"
                  className="form-control"
                  name="discountAmount"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    number: { value: true, errorMessage: translate('entity.validation.number') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label for="product-bundle-item-productBundle">
                  <Translate contentKey="gatewayApp.productProductBundleItem.productBundle">Product Bundle</Translate>
                </Label>
                <AvInput id="product-bundle-item-productBundle" type="select" className="form-control" name="productBundle.id">
                  <option value="" key="0" />
                  {productBundles
                    ? productBundles.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.name}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="product-bundle-item-product">
                  <Translate contentKey="gatewayApp.productProductBundleItem.product">Product</Translate>
                </Label>
                <AvInput id="product-bundle-item-product" type="select" className="form-control" name="product.id">
                  <option value="" key="0" />
                  {products
                    ? products.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.title}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/product-bundle-item" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  productBundles: storeState.productBundle.entities,
  products: storeState.product.entities,
  productBundleItemEntity: storeState.productBundleItem.entity,
  loading: storeState.productBundleItem.loading,
  updating: storeState.productBundleItem.updating,
  updateSuccess: storeState.productBundleItem.updateSuccess,
});

const mapDispatchToProps = {
  getProductBundles,
  getProducts,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProductBundleItemUpdate);
