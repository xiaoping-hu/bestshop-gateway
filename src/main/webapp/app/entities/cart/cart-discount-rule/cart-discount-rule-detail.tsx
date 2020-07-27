import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './cart-discount-rule.reducer';
import { ICartDiscountRule } from 'app/shared/model/cart/cart-discount-rule.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICartDiscountRuleDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CartDiscountRuleDetail = (props: ICartDiscountRuleDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { cartDiscountRuleEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="gatewayApp.cartCartDiscountRule.detail.title">CartDiscountRule</Translate> [
          <b>{cartDiscountRuleEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="gatewayApp.cartCartDiscountRule.name">Name</Translate>
            </span>
          </dt>
          <dd>{cartDiscountRuleEntity.name}</dd>
          <dt>
            <span id="minimumQuantity">
              <Translate contentKey="gatewayApp.cartCartDiscountRule.minimumQuantity">Minimum Quantity</Translate>
            </span>
          </dt>
          <dd>{cartDiscountRuleEntity.minimumQuantity}</dd>
          <dt>
            <span id="discountQuantity">
              <Translate contentKey="gatewayApp.cartCartDiscountRule.discountQuantity">Discount Quantity</Translate>
            </span>
          </dt>
          <dd>{cartDiscountRuleEntity.discountQuantity}</dd>
          <dt>
            <span id="discountAmount">
              <Translate contentKey="gatewayApp.cartCartDiscountRule.discountAmount">Discount Amount</Translate>
            </span>
          </dt>
          <dd>{cartDiscountRuleEntity.discountAmount}</dd>
          <dt>
            <span id="priority">
              <Translate contentKey="gatewayApp.cartCartDiscountRule.priority">Priority</Translate>
            </span>
          </dt>
          <dd>{cartDiscountRuleEntity.priority}</dd>
        </dl>
        <Button tag={Link} to="/cart-discount-rule" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/cart-discount-rule/${cartDiscountRuleEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ cartDiscountRule }: IRootState) => ({
  cartDiscountRuleEntity: cartDiscountRule.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CartDiscountRuleDetail);
