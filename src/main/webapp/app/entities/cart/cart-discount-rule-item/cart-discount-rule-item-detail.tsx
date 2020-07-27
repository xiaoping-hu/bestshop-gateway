import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './cart-discount-rule-item.reducer';
import { ICartDiscountRuleItem } from 'app/shared/model/cart/cart-discount-rule-item.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICartDiscountRuleItemDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CartDiscountRuleItemDetail = (props: ICartDiscountRuleItemDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { cartDiscountRuleItemEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="gatewayApp.cartCartDiscountRuleItem.detail.title">CartDiscountRuleItem</Translate> [
          <b>{cartDiscountRuleItemEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="productId">
              <Translate contentKey="gatewayApp.cartCartDiscountRuleItem.productId">Product Id</Translate>
            </span>
          </dt>
          <dd>{cartDiscountRuleItemEntity.productId}</dd>
          <dt>
            <Translate contentKey="gatewayApp.cartCartDiscountRuleItem.cartDiscountRule">Cart Discount Rule</Translate>
          </dt>
          <dd>{cartDiscountRuleItemEntity.cartDiscountRule ? cartDiscountRuleItemEntity.cartDiscountRule.name : ''}</dd>
        </dl>
        <Button tag={Link} to="/cart-discount-rule-item" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/cart-discount-rule-item/${cartDiscountRuleItemEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ cartDiscountRuleItem }: IRootState) => ({
  cartDiscountRuleItemEntity: cartDiscountRuleItem.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CartDiscountRuleItemDetail);
