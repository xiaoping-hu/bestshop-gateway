import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { ICartDiscountRule, defaultValue } from 'app/shared/model/cart/cart-discount-rule.model';

export const ACTION_TYPES = {
  FETCH_CARTDISCOUNTRULE_LIST: 'cartDiscountRule/FETCH_CARTDISCOUNTRULE_LIST',
  FETCH_CARTDISCOUNTRULE: 'cartDiscountRule/FETCH_CARTDISCOUNTRULE',
  CREATE_CARTDISCOUNTRULE: 'cartDiscountRule/CREATE_CARTDISCOUNTRULE',
  UPDATE_CARTDISCOUNTRULE: 'cartDiscountRule/UPDATE_CARTDISCOUNTRULE',
  DELETE_CARTDISCOUNTRULE: 'cartDiscountRule/DELETE_CARTDISCOUNTRULE',
  RESET: 'cartDiscountRule/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICartDiscountRule>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type CartDiscountRuleState = Readonly<typeof initialState>;

// Reducer

export default (state: CartDiscountRuleState = initialState, action): CartDiscountRuleState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CARTDISCOUNTRULE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CARTDISCOUNTRULE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_CARTDISCOUNTRULE):
    case REQUEST(ACTION_TYPES.UPDATE_CARTDISCOUNTRULE):
    case REQUEST(ACTION_TYPES.DELETE_CARTDISCOUNTRULE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_CARTDISCOUNTRULE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CARTDISCOUNTRULE):
    case FAILURE(ACTION_TYPES.CREATE_CARTDISCOUNTRULE):
    case FAILURE(ACTION_TYPES.UPDATE_CARTDISCOUNTRULE):
    case FAILURE(ACTION_TYPES.DELETE_CARTDISCOUNTRULE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_CARTDISCOUNTRULE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_CARTDISCOUNTRULE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_CARTDISCOUNTRULE):
    case SUCCESS(ACTION_TYPES.UPDATE_CARTDISCOUNTRULE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_CARTDISCOUNTRULE):
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

const apiUrl = 'services/cart/api/cart-discount-rules';

// Actions

export const getEntities: ICrudGetAllAction<ICartDiscountRule> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_CARTDISCOUNTRULE_LIST,
    payload: axios.get<ICartDiscountRule>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<ICartDiscountRule> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CARTDISCOUNTRULE,
    payload: axios.get<ICartDiscountRule>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<ICartDiscountRule> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CARTDISCOUNTRULE,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICartDiscountRule> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CARTDISCOUNTRULE,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICartDiscountRule> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CARTDISCOUNTRULE,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
