import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './cart-discount-rule.reducer';
import { ICartDiscountRule } from 'app/shared/model/cart/cart-discount-rule.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICartDiscountRuleUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CartDiscountRuleUpdate = (props: ICartDiscountRuleUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { cartDiscountRuleEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/cart-discount-rule' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...cartDiscountRuleEntity,
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
          <h2 id="gatewayApp.cartCartDiscountRule.home.createOrEditLabel">
            <Translate contentKey="gatewayApp.cartCartDiscountRule.home.createOrEditLabel">Create or edit a CartDiscountRule</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : cartDiscountRuleEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="cart-discount-rule-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="cart-discount-rule-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="cart-discount-rule-name">
                  <Translate contentKey="gatewayApp.cartCartDiscountRule.name">Name</Translate>
                </Label>
                <AvField
                  id="cart-discount-rule-name"
                  type="text"
                  name="name"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    maxLength: { value: 256, errorMessage: translate('entity.validation.maxlength', { max: 256 }) },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="minimumQuantityLabel" for="cart-discount-rule-minimumQuantity">
                  <Translate contentKey="gatewayApp.cartCartDiscountRule.minimumQuantity">Minimum Quantity</Translate>
                </Label>
                <AvField
                  id="cart-discount-rule-minimumQuantity"
                  type="string"
                  className="form-control"
                  name="minimumQuantity"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    number: { value: true, errorMessage: translate('entity.validation.number') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="discountQuantityLabel" for="cart-discount-rule-discountQuantity">
                  <Translate contentKey="gatewayApp.cartCartDiscountRule.discountQuantity">Discount Quantity</Translate>
                </Label>
                <AvField
                  id="cart-discount-rule-discountQuantity"
                  type="string"
                  className="form-control"
                  name="discountQuantity"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    number: { value: true, errorMessage: translate('entity.validation.number') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="discountAmountLabel" for="cart-discount-rule-discountAmount">
                  <Translate contentKey="gatewayApp.cartCartDiscountRule.discountAmount">Discount Amount</Translate>
                </Label>
                <AvField
                  id="cart-discount-rule-discountAmount"
                  type="string"
                  className="form-control"
                  name="discountAmount"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    number: { value: true, errorMessage: translate('entity.validation.number') },
                  }}
                />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/cart-discount-rule" replace color="info">
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
  cartDiscountRuleEntity: storeState.cartDiscountRule.entity,
  loading: storeState.cartDiscountRule.loading,
  updating: storeState.cartDiscountRule.updating,
  updateSuccess: storeState.cartDiscountRule.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CartDiscountRuleUpdate);
