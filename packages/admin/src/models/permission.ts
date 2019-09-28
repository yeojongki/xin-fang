import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { message as Message } from 'antd';
import { HttpSuccessResponse } from '@xf/common/src/interfaces/http.interface';
import { Permission } from '@xf/common/src/entities';
import { IPaginationList } from '@xf/common/src/interfaces/pagination.interface';
import * as Api from '@/services/permission';
import { namespace } from '@/pages/permission';

export type IPermissionStateType = IPaginationList<Permission> & { allPermissions: Permission[] };

export type Effect = (action: AnyAction, effects: EffectsCommandMap) => void;

export interface ModelType {
  namespace: string;
  state: IPermissionStateType;
  effects: {
    getList: Effect;
    delete: Effect;
    update: Effect;
    create: Effect;
    setAllPermissions: Effect;
  };
  reducers: {
    getListHandle: Reducer<IPermissionStateType>;
    setAll: Reducer<IPermissionStateType>;
  };
}

const initialState = {
  list: [],
  pagination: {
    total: 0,
    current: 0,
    pageSize: 0,
  },
  allPermissions: [],
};

const Model: ModelType = {
  namespace,

  state: initialState,

  effects: {
    *getList({ payload }, { call, put }) {
      const { pagination, callback, shouldSetList = true } = payload;
      const { result }: HttpSuccessResponse = yield call(Api.getList, pagination);
      if (shouldSetList) {
        yield put({
          type: 'getListHandle',
          payload: result,
        });
      }
      callback && callback(result);
    },
    *delete({ payload }, { call }) {
      const { callback, ids } = payload;
      const { message }: HttpSuccessResponse = yield call(Api.deleteByIds, ids);
      Message.success(message);
      callback && callback();
    },
    *update({ payload }, { call }) {
      const { callback, values } = payload;
      const { message }: HttpSuccessResponse = yield call(Api.update, values);
      Message.success(message);
      callback && callback();
    },
    *create({ payload }, { call }) {
      const { callback, values } = payload;
      const { message }: HttpSuccessResponse = yield call(Api.create, values);
      Message.success(message);
      callback && callback();
    },
    *setAllPermissions({ payload }, { put }) {
      const { callback, permissions } = payload;
      yield put({
        type: 'setAll',
        payload: permissions,
      });
      callback && callback();
    },
  },

  reducers: {
    getListHandle(state = initialState, { payload }) {
      return {
        ...state,
        list: payload.list as any[],
        pagination: payload.pagination,
      };
    },
    setAll(state = initialState, { payload }) {
      return {
        ...state,
        allPermissions: payload,
      };
    },
  },
};

export default Model;
