import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Row, Col, Alert, Button, Badge } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TextFormat } from 'react-jhipster';

import { IRootState } from 'app/shared/reducers';
import { getEntityForCurrentUser } from 'app/entities/cart/cart/cart.reducer';

export interface ICartProp extends StateProps, DispatchProps {}

export const Cart = (props: ICartProp) => {
  useEffect(() => {
    props.getEntityForCurrentUser(props.login);
  }, []);


  const { isAuthenticated, cartEntity } = props;

  return (
    <Row className="d-flex justify-content-center">
      <Col lg="9" md="12">
        {isAuthenticated ? (
          <>
            <h2>Your shopping cart</h2>
            <p className="lead">You have {cartEntity?.items?.length} items in your cart</p>
            {cartEntity.items && cartEntity.items.length > 0 ? (
              <>
                <div className="list-group">

                  {cartEntity.items.map((item, i) => (
                    <a key={`entity-${i}`} className="list-group-item list-group-item-action flex-column align-items-start">
                      <Row>
                        <Col md={4}>
                          <div className="d-flex w-100 justify-content-between">
                            <Button tag={Link} to={`/product/${item.product?.id}`} color="link" size="sm" className="px-0">
                              {item.product?.title} {item.product?.type === 'PRODUCT_BUNDLE'?   <Badge href="#" color="primary">Bundle</Badge> : null}
                            </Button>
                          </div>
                          <div className="d-flex w-100 justify-content-between">
                            {item.product?.type === 'PRODUCT_BUNDLE'? (
                              <ul>
                                {item.product?.productBundleItems.map((bundleItem) => (
                                  <li> <Button tag={Link} to={`/product/${bundleItem.product?.id}`} color="link" size="sm" className="px-0">
                                    {bundleItem.product?.title} x {bundleItem.quantity} @ <TextFormat value={bundleItem.product?.price * bundleItem.discountAmount/100} type="number" format={'$ 0,0.00'} />
                                  </Button> </li>
                                ))}
                              </ul>
                            ) :null}
                          </div>
                        </Col>

                        <Col md={3}>
                            <small>
                              Item Cost: <TextFormat value={item.product?.price as any} type="number" format={'$ 0,0.00'} />
                            </small>
                        </Col>
                        <Col md={2}>
                          <small>Quantity: {item.quantity}</small>
                        </Col>
                        <Col md={3}>
                          <div className="d-flex w-100 justify-content-between">
                            <p className="mb-1">
                              Total cost: <TextFormat value={item.total as any} type="number" format={'$ 0,0.00'} />
                            </p>
                            </div>
                            </Col>
                      </Row>
                    </a>
                  ))}
                </div>
                <div className="d-flex justify-content-between py-4">
                  <h3>
                    Total price: <TextFormat value={cartEntity.total as any} type="number" format={'$ 0,0.00'} />
                  </h3>
                </div>
              </>
            ) : (
               <div className="alert alert-warning">No items found</div>
            )}
          </>
        ) : (
          <div>
            <Alert color="warning">Not authorized. Please log in first</Alert>
          </div>
        )}
      </Col>
    </Row>
  );
};


const mapStateToProps = ({ authentication, cart }: IRootState) => ({
  login: authentication.account.login,
  isAuthenticated: authentication.isAuthenticated,
  cartEntity: cart.entity
});

const mapDispatchToProps = {
  getEntityForCurrentUser
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
