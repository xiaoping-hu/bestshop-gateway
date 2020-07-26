import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Card, CardImg, CardBody, CardTitle, CardText} from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TextFormat } from 'react-jhipster';
import { IRootState } from 'app/shared/reducers';
import { getEntity } from './product.reducer';
import { AUTHORITIES } from 'app/config/constants';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import {IProduct} from "app/shared/model/product/product.model";

export interface IProductDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ProductDetail = (props: IProductDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);
  const addToCart = (p: IProduct) => () => {};
  const { productEntity, isPowerUser } = props;
  return (
    <Row>
      <Col>
        <Row className="mb-3">
          <Col md={4} className="d-flex flex-row">
            <Button onClick={addToCart(productEntity)} color="primary" size="md">
              <FontAwesomeIcon icon="plus" /> <span className="d-none d-md-inline">Add to Cart</span>
            </Button>
          </Col>
          <Col md={8} className="d-flex flex-row-reverse" >
            {isPowerUser? (
              <div >
                <Button tag={Link} to="/" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/product/${productEntity.id}/edit`} replace color="primary">
                  <FontAwesomeIcon icon="pencil-alt" />{' '}
                  <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
                </Button>
              </div>
            ): null}


          </Col>

        </Row>
        <hr/>
        <Row>
          <Col md="8" heigth={"100%"} >
            <dt>
            <span id="title">
              <Translate contentKey="gatewayApp.productProduct.title">Title</Translate>
            </span>
            </dt>
            <CardTitle>{productEntity.title}</CardTitle>
            <dt>
            <span id="price">
              <Translate contentKey="gatewayApp.productProduct.price">Price</Translate>
            </span>
            </dt>
            <dd><TextFormat value={productEntity.price as any} type="number" format={'$ 0,0.00'} /></dd>

            <dt>
            <span id="description">
              <Translate contentKey="gatewayApp.productProduct.description">Description</Translate>
            </span>
            </dt>
            <CardText>{productEntity.description}</CardText>


          </Col>
          <Col md="4">
            <CardImg top width={"100%"} src={productEntity.imageUrl} alt="Card image cap" />
          </Col>
        </Row>
        <hr/>
        <Row className="mt-5">

        </Row>
      </Col>

    </Row>
  );
};

const mapStateToProps = ({ product, authentication }: IRootState) => ({
  productEntity: product.entity,
  isPowerUser: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.ADMIN, AUTHORITIES.STORE_OWNER])
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
