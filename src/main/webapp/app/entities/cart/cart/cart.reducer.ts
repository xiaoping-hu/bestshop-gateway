import axios from 'axios';
import { ICrudGetAction, ICrudPutAction } from 'react-jhipster';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { ICart, defaultValue } from 'app/shared/model/cart/cart.model';

const initialState = {
  loading: false,
  errorMessage: null,
  entity: defaultValue,
};

export type CartState = Readonly<typeof initialState>;

export const ACTION_TYPES = {
  FETCH_CART: 'cart/FETCH_CART',
  ADD_PRODUCT: 'cart/ADD_PRODUCT',
  ADD_PRODUCT_BUNDLE: 'cart/ADD_PRODUCT_BUNDLE',
};

export default (state: CartState = initialState, action): CartState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CART):
      return {
        ...state,
        errorMessage: null,
        loading: true,
      };
    case SUCCESS(ACTION_TYPES.FETCH_CART):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };

    default:
      return state;
  }
};

const apiUrl = 'services/cart/api/carts';

export const addProductToCart: ICrudPutAction<number> = id => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.ADD_PRODUCT,
    payload: axios.put(`${apiUrl}/add-product/${id}`),
    meta: {
      successMessage: 'Added in your cart. Enjoy shopping!',
    },
  });
  return result;
};

export const addProductBundleToCart: ICrudPutAction<number> = id => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.ADD_PRODUCT,
    payload: axios.put(`${apiUrl}/add-product-bundle/${id}`),
    meta: {
      successMessage: 'Added in your cart. Enjoy shopping!',
    },
  });
  return result;
};

export const getEntityForCurrentUser: ICrudGetAction<ICart> = user => {
  const requestUrl = `${apiUrl}/current-user`;
  return {
    type: ACTION_TYPES.FETCH_CART,
    payload: axios.get<ICart>(requestUrl),
  };
};
