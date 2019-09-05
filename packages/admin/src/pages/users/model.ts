import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { message as Message } from 'antd';
import { IUser } from '@xf/common/src/interfaces/user.interfaces';
import { IPaginationList } from '@xf/common/src/interfaces/pagination.interface';
import { HttpSuccessResponse } from '@/utils/request';
import * as Api from './service';
import { namespace } from '.';

export type StateType = IPaginationList<IUser>;

export type Effect = (action: AnyAction, effects: EffectsCommandMap) => void;

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    getList: Effect;
    delete: Effect;
    update: Effect;
    create: Effect;
  };
  reducers: {
    getListHandle: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace,

  state: {
    list: [],
    pagination: {
      total: 0,
      current: 0,
      pageSize: 0,
    },
  },

  effects: {
    *getList({ payload }, { call, put }) {
      const { result }: HttpSuccessResponse = yield call(Api.getUserList, payload);
      yield put({
        type: 'getListHandle',
        payload: result,
      });
    },
    *delete({ payload }, { call }) {
      const { callback, ids } = payload;
      const { message }: HttpSuccessResponse = yield call(Api.deleteByIds, ids);
      Message.success(message);
      callback();
    },
    *update({ payload }, { call }) {
      const { callback, values } = payload;
      const { message }: HttpSuccessResponse = yield call(Api.update, values);
      Message.success(message);
      callback();
    },
    *create({ payload }, { call }) {
      const { callback, values } = payload;
      const { message }: HttpSuccessResponse = yield call(Api.create, values);
      Message.success(message);
      callback();
    },
  },

  reducers: {
    getListHandle(_, { payload }) {
      return {
        list: payload.list as any[],
        pagination: payload.pagination,
      };
    },
  },
};

export default Model;
