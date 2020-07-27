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
import { addProductToCart, addProductBundleToCart } from 'app/entities/cart/cart/cart.reducer';
import { getProductBundlesByProductId } from 'app/entities/product/product-bundle/product-bundle.reducer'

export interface IProductDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ProductDetail = (props: IProductDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
    props.getProductBundlesByProductId(props.match.params.id)
  }, []);
  const addToCart = (id: number) => () => props.addProductToCart(id);
  const addBundleToCart = (id: number) => () => props.addProductBundleToCart(id);
  const { productEntity, isPowerUser, productBundles } = props;

  return (
    <Row>
      <Col>
        <Row className="mb-3">
          <Col md={4} className="d-flex flex-row">
            <Button onClick={addToCart(productEntity.id)} color="primary" size="md">
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
        <h3>Related Bundle Sales</h3>
        <hr/>
        <Row className="mt-5">
          {productBundles.map((bundle, bundleIndex) => (<Card key={`bundle-${bundleIndex}`} className="ml-5" style={{width: "25vw"} }>
            <Row>
            <Col md={6}>
              <span>{bundle.name}</span>
            </Col>
            <Col md={6} className="d-flex flex-row-reverse" >
              <Button onClick={addBundleToCart(productEntity.id)} color="primary" size="md">
                <FontAwesomeIcon icon="plus" /> <span className="d-none d-md-inline">Add Bundle to Cart</span>
              </Button>
            </Col>
            </Row>
            <CardBody>
            {bundle.productBundleItems.map((bundleItem, bundleItemIndex) => (
              <a key={`bundle-item-${bundleItemIndex}`}>
            <div className="row">
              <div className="col-2 col-xs-12 justify-content-center">
                {bundleItem.product.imageUrl ? (
                  <img src={bundleItem.product.imageUrl} style={{ maxHeight: '30px' }} />
                ) : null}
              </div>
              <div className="col col-xs-12">

                <div className="d-flex w-100 justify-content-between">

                  <Button tag={Link} to={`/product/${bundleItem.product.id}`} color="link" size="sm" className="px-0">
                    {bundleItem.product.title}
                  </Button>

                </div>
                <div>
                  <small className="mb-1">{bundleItem.product.description}</small>{' '}
                </div>
                <div className="d-flex w-100 justify-content-between">
                  <p className="mb-1">
                    <TextFormat value={bundleItem.product.price as any} type="number" format={'$ 0,0.00'} />
                  </p>
                </div>
              </div>
            </div>
              </a>))
            }</CardBody>
          </Card>))}
        </Row>
      </Col>

    </Row>
  );
};

const mapStateToProps = ({ product, productBundle, authentication }: IRootState) => ({
  productEntity: product.entity,
  productBundles: productBundle.entities,
  isPowerUser: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.ADMIN, AUTHORITIES.STORE_OWNER])
});

const mapDispatchToProps = { getEntity, addProductToCart, addProductBundleToCart, getProductBundlesByProductId};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
