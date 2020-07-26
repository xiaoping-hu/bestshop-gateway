import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { IProductBundle, defaultValue } from 'app/shared/model/product/product-bundle.model';

export const ACTION_TYPES = {
  FETCH_PRODUCTBUNDLE_LIST: 'productBundle/FETCH_PRODUCTBUNDLE_LIST',
  FETCH_PRODUCTBUNDLE: 'productBundle/FETCH_PRODUCTBUNDLE',
  CREATE_PRODUCTBUNDLE: 'productBundle/CREATE_PRODUCTBUNDLE',
  UPDATE_PRODUCTBUNDLE: 'productBundle/UPDATE_PRODUCTBUNDLE',
  DELETE_PRODUCTBUNDLE: 'productBundle/DELETE_PRODUCTBUNDLE',
  RESET: 'productBundle/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IProductBundle>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type ProductBundleState = Readonly<typeof initialState>;

// Reducer

export default (state: ProductBundleState = initialState, action): ProductBundleState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PRODUCTBUNDLE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PRODUCTBUNDLE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_PRODUCTBUNDLE):
    case REQUEST(ACTION_TYPES.UPDATE_PRODUCTBUNDLE):
    case REQUEST(ACTION_TYPES.DELETE_PRODUCTBUNDLE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_PRODUCTBUNDLE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PRODUCTBUNDLE):
    case FAILURE(ACTION_TYPES.CREATE_PRODUCTBUNDLE):
    case FAILURE(ACTION_TYPES.UPDATE_PRODUCTBUNDLE):
    case FAILURE(ACTION_TYPES.DELETE_PRODUCTBUNDLE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PRODUCTBUNDLE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_PRODUCTBUNDLE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_PRODUCTBUNDLE):
    case SUCCESS(ACTION_TYPES.UPDATE_PRODUCTBUNDLE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_PRODUCTBUNDLE):
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

const apiUrl = 'services/product/api/product-bundles';

// Actions

export const getEntities: ICrudGetAllAction<IProductBundle> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_PRODUCTBUNDLE_LIST,
    payload: axios.get<IProductBundle>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<IProductBundle> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PRODUCTBUNDLE,
    payload: axios.get<IProductBundle>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IProductBundle> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PRODUCTBUNDLE,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IProductBundle> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PRODUCTBUNDLE,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IProductBundle> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PRODUCTBUNDLE,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
