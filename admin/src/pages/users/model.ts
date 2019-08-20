import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { HttpSuccessResponse } from '@/utils/request';
import * as Api from './service';
import { IUser } from '.';

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
  },

  reducers: {
    getListHandle(state, { payload }) {
      return {
        list: payload.list as any[],
        pagination: payload.pagination,
      };
    },
  },
};

export default Model;
