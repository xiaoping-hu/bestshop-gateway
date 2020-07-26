import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICartDiscountRule } from 'app/shared/model/cart/cart-discount-rule.model';
import { getEntities as getCartDiscountRules } from 'app/entities/cart/cart-discount-rule/cart-discount-rule.reducer';
import { getEntity, updateEntity, createEntity, reset } from './cart-discount-rule-item.reducer';
import { ICartDiscountRuleItem } from 'app/shared/model/cart/cart-discount-rule-item.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICartDiscountRuleItemUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CartDiscountRuleItemUpdate = (props: ICartDiscountRuleItemUpdateProps) => {
  const [cartDiscountRuleId, setCartDiscountRuleId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { cartDiscountRuleItemEntity, cartDiscountRules, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/cart-discount-rule-item' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getCartDiscountRules();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...cartDiscountRuleItemEntity,
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
          <h2 id="gatewayApp.cartCartDiscountRuleItem.home.createOrEditLabel">
            <Translate contentKey="gatewayApp.cartCartDiscountRuleItem.home.createOrEditLabel">
              Create or edit a CartDiscountRuleItem
            </Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : cartDiscountRuleItemEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="cart-discount-rule-item-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="cart-discount-rule-item-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="productIdLabel" for="cart-discount-rule-item-productId">
                  <Translate contentKey="gatewayApp.cartCartDiscountRuleItem.productId">Product Id</Translate>
                </Label>
                <AvField
                  id="cart-discount-rule-item-productId"
                  type="string"
                  className="form-control"
                  name="productId"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    number: { value: true, errorMessage: translate('entity.validation.number') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label for="cart-discount-rule-item-cartDiscountRule">
                  <Translate contentKey="gatewayApp.cartCartDiscountRuleItem.cartDiscountRule">Cart Discount Rule</Translate>
                </Label>
                <AvInput id="cart-discount-rule-item-cartDiscountRule" type="select" className="form-control" name="cartDiscountRule.id">
                  <option value="" key="0" />
                  {cartDiscountRules
                    ? cartDiscountRules.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/cart-discount-rule-item" replace color="info">
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
  cartDiscountRules: storeState.cartDiscountRule.entities,
  cartDiscountRuleItemEntity: storeState.cartDiscountRuleItem.entity,
  loading: storeState.cartDiscountRuleItem.loading,
  updating: storeState.cartDiscountRuleItem.updating,
  updateSuccess: storeState.cartDiscountRuleItem.updateSuccess,
});

const mapDispatchToProps = {
  getCartDiscountRules,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CartDiscountRuleItemUpdate);
