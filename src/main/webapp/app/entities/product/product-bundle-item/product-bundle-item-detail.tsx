import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './product-bundle-item.reducer';
import { IProductBundleItem } from 'app/shared/model/product/product-bundle-item.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProductBundleItemDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ProductBundleItemDetail = (props: IProductBundleItemDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { productBundleItemEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="gatewayApp.productProductBundleItem.detail.title">ProductBundleItem</Translate> [
          <b>{productBundleItemEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="quantity">
              <Translate contentKey="gatewayApp.productProductBundleItem.quantity">Quantity</Translate>
            </span>
          </dt>
          <dd>{productBundleItemEntity.quantity}</dd>
          <dt>
            <span id="discountAmount">
              <Translate contentKey="gatewayApp.productProductBundleItem.discountAmount">Discount Amount</Translate>
            </span>
          </dt>
          <dd>{productBundleItemEntity.discountAmount}</dd>
          <dt>
            <Translate contentKey="gatewayApp.productProductBundleItem.productBundle">Product Bundle</Translate>
          </dt>
          <dd>{productBundleItemEntity.productBundle ? productBundleItemEntity.productBundle.id : ''}</dd>
          <dt>
            <Translate contentKey="gatewayApp.productProductBundleItem.product">Product</Translate>
          </dt>
          <dd>{productBundleItemEntity.product ? productBundleItemEntity.product.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/product-bundle-item" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/product-bundle-item/${productBundleItemEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ productBundleItem }: IRootState) => ({
  productBundleItemEntity: productBundleItem.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProductBundleItemDetail);
