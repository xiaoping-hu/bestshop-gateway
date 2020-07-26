import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { ICartDiscountRuleItem, defaultValue } from 'app/shared/model/cart/cart-discount-rule-item.model';

export const ACTION_TYPES = {
  FETCH_CARTDISCOUNTRULEITEM_LIST: 'cartDiscountRuleItem/FETCH_CARTDISCOUNTRULEITEM_LIST',
  FETCH_CARTDISCOUNTRULEITEM: 'cartDiscountRuleItem/FETCH_CARTDISCOUNTRULEITEM',
  CREATE_CARTDISCOUNTRULEITEM: 'cartDiscountRuleItem/CREATE_CARTDISCOUNTRULEITEM',
  UPDATE_CARTDISCOUNTRULEITEM: 'cartDiscountRuleItem/UPDATE_CARTDISCOUNTRULEITEM',
  DELETE_CARTDISCOUNTRULEITEM: 'cartDiscountRuleItem/DELETE_CARTDISCOUNTRULEITEM',
  RESET: 'cartDiscountRuleItem/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICartDiscountRuleItem>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type CartDiscountRuleItemState = Readonly<typeof initialState>;

// Reducer

export default (state: CartDiscountRuleItemState = initialState, action): CartDiscountRuleItemState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CARTDISCOUNTRULEITEM_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CARTDISCOUNTRULEITEM):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_CARTDISCOUNTRULEITEM):
    case REQUEST(ACTION_TYPES.UPDATE_CARTDISCOUNTRULEITEM):
    case REQUEST(ACTION_TYPES.DELETE_CARTDISCOUNTRULEITEM):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_CARTDISCOUNTRULEITEM_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CARTDISCOUNTRULEITEM):
    case FAILURE(ACTION_TYPES.CREATE_CARTDISCOUNTRULEITEM):
    case FAILURE(ACTION_TYPES.UPDATE_CARTDISCOUNTRULEITEM):
    case FAILURE(ACTION_TYPES.DELETE_CARTDISCOUNTRULEITEM):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_CARTDISCOUNTRULEITEM_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_CARTDISCOUNTRULEITEM):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_CARTDISCOUNTRULEITEM):
    case SUCCESS(ACTION_TYPES.UPDATE_CARTDISCOUNTRULEITEM):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_CARTDISCOUNTRULEITEM):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'services/cart/api/cart-discount-rule-items';

// Actions

export const getEntities: ICrudGetAllAction<ICartDiscountRuleItem> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_CARTDISCOUNTRULEITEM_LIST,
    payload: axios.get<ICartDiscountRuleItem>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<ICartDiscountRuleItem> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CARTDISCOUNTRULEITEM,
    payload: axios.get<ICartDiscountRuleItem>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<ICartDiscountRuleItem> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CARTDISCOUNTRULEITEM,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICartDiscountRuleItem> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CARTDISCOUNTRULEITEM,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICartDiscountRuleItem> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CARTDISCOUNTRULEITEM,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
