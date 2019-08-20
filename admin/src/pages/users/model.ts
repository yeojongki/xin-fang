import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { HttpSuccessResponse } from '@/utils/request';
import * as Api from './service';
import { IUser } from '.';
import { message as Message } from 'antd';

export interface IPagination {
  total: number;
  current: number;
  pageSize: number;
}
export interface StateType {
  list: IUser[];
  pagination: IPagination;
}

export type Effect = (action: AnyAction, effects: EffectsCommandMap) => void;

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    getList: Effect;
    deleteUser: Effect;
  };
  reducers: {
    getListHandle: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'usersManage',

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
    *deleteUser({ payload }, { call }) {
      const { callback, id } = payload;
      const { errno, message }: HttpSuccessResponse = yield call(Api.deleteUser, id);
      if (errno === 0) {
        Message.success(message);
        callback();
      }
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
