import './home.scss';

import React, { useEffect, useState }from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Row, Col, Alert, Button} from 'reactstrap';

import { IRootState } from 'app/shared/reducers';
import { IProductProps } from 'app/entities/product/product/product';
import {getEntities} from 'app/entities/product/product/product.reducer'
import { getSortState, JhiItemCount, JhiPagination, TextFormat } from 'react-jhipster';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import { IProduct } from 'app/shared/model/product/product.model';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { addProductToCart } from 'app/entities/cart/cart/cart.reducer';

export interface IHomeProp extends IProductProps, StateProps, DispatchProps  {}

export const Home = (props: IHomeProp) => {
  const [paginationState, setPaginationState] = useState(getSortState(props.location, ITEMS_PER_PAGE));
  const [filterState, setFilterState] = useState('');

  const getAllEntities = () => {
    props.getEntities(paginationState.activePage - 1, paginationState.itemsPerPage, `${paginationState.sort},${paginationState.order}`);
  };

  const sortEntities = () => {
    getAllEntities();
    props.history.push(
      `${props.location.pathname}?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`
    );
  };

  useEffect(() => {
    sortEntities();
  }, [paginationState.activePage, paginationState.order, paginationState.sort]);

  const sort = p => () => {
    setPaginationState({
      ...paginationState,
      order: paginationState.order === 'asc' ? 'desc' : 'asc',
      sort: p
    });
  };

  const filter = (p: IProduct) => p.title && (p.title.toLowerCase() + p.description?.toLowerCase()).includes(filterState.toLowerCase());

  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage
    });

  const handleFilter = evt => setFilterState(evt.target.value);

  const addToCart = (id: number) => () => props.addProductToCart(id);

  const { account, productList, match, loading, totalItems } = props;

  return (
      <Row className="d-flex justify-content-center">
      <Col lg="9" md="12">
        <h2>Welcome to Bestshop!</h2>
        <p className="lead">This is a demo microservices based e-commerce application powered by Java, Spring Boot, JHipster!</p>
        {account && account.login ? (
           <>
           <div>
             <Alert color="success">You are logged in with username {account.login}.</Alert>
           </div>
           {productList && productList.length > 0 ? (
             <>
               <div className="mb-2 d-flex justify-content-end align-items-center">
                 <span className="mr-2 col-2">Filter by name</span>
                 <input type="search" className="form-control" value={filterState} onChange={handleFilter} />
                 <span className="mx-2 col-1">Sort by</span>
                 <div className="btn-group sort-btns" role="group">
                   <button type="button" className="btn btn-light" onClick={sort('title')}>
                     <span className="d-flex">
                       <span>Title </span>&nbsp;
                       <FontAwesomeIcon icon="sort" />
                     </span>
                   </button>
                   <button type="button" className="btn btn-light" onClick={sort('price')}>
                     <span className="d-flex">
                       <span>Price</span>&nbsp;
                       <FontAwesomeIcon icon="sort" />
                     </span>
                   </button>
                 </div>
               </div>
               <div className="list-group">
                 {productList.filter(filter).map((product, i) => (
                   <a key={`entity-${i}`} className="list-group-item list-group-item-action flex-column align-items-start">
                     <div className="row">
                       <div className="col-2 col-xs-12 justify-content-center">
                         {product.imageUrl ? (
                           <img src={product.imageUrl} style={{ maxHeight: '50px' }} />
                         ) : null}
                       </div>
                       <div className="col col-xs-12">
                         <div className="d-flex w-100 justify-content-between">
                           <Button tag={Link} to={`/product/${product.id}`} color="link" size="sm" className="px-0">
                             {product.title}
                           </Button>
                         </div>
                         <div>
                           <small className="mb-1">{product.description}</small>{' '}
                         </div>
                         <div className="d-flex w-100 justify-content-between">
                           <p className="mb-1">
                             <TextFormat value={product.price as any} type="number" format={'$ 0,0.00'} />
                           </p>
                           <div>
                             <Button onClick={addToCart(product.id)} color="primary" size="sm">
                               <FontAwesomeIcon icon="plus" /> <span className="d-none d-md-inline">Add to Cart</span>
                             </Button>
                           </div>
                         </div>
                       </div>
                     </div>
                   </a>
                 ))}
               </div>
               <div className={productList && productList.length > 0 ? '' : 'd-none'}>
                 <Row className="justify-content-center">
                   <JhiItemCount page={paginationState.activePage} total={totalItems} itemsPerPage={paginationState.itemsPerPage} />
                 </Row>
                 <Row className="justify-content-center">
                   <JhiPagination
                     activePage={paginationState.activePage}
                     onSelect={handlePagination}
                     maxButtons={5}
                     itemsPerPage={paginationState.itemsPerPage}
                     totalItems={props.totalItems}
                   />
                 </Row>
               </div>
             </>
           ) : (
             !loading && <div className="alert alert-warning">No Products found</div>
           )}
         </>
        ) : (
          <div>
            <Alert color="warning">
              <Translate contentKey="global.messages.info.authenticated.prefix">If you want to </Translate>
              <Link to="/login" className="alert-link">
                <Translate contentKey="global.messages.info.authenticated.link"> sign in</Translate>
              </Link>
              <Translate contentKey="global.messages.info.authenticated.suffix">
                , you can try the default accounts:
                <br />- Administrator (login=&quot;admin&quot; and password=&quot;admin&quot;)
                <br />- Store Owner (login=&quot;owner&quot; and password=&quot;owner&quot;)
                <br />- User (login=&quot;user&quot; and password=&quot;user&quot;).
              </Translate>
            </Alert>

            <Alert color="warning">
              <Translate contentKey="global.messages.info.register.noaccount">You do not have an account yet?</Translate>&nbsp;
              <Link to="/account/register" className="alert-link">
                <Translate contentKey="global.messages.info.register.link">Register a new account</Translate>
              </Link>
            </Alert>
          </div>
        )}
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ product, authentication }: IRootState) => ({
  account: authentication.account,
  isAuthenticated: authentication.isAuthenticated,
  productList: product.entities,
  loading: product.loading,
  totalItems: product.totalItems
});

const mapDispatchToProps = {
  getEntities, addProductToCart
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Home);
