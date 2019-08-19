import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { HttpSuccessResponse } from '@/utils/request';
import * as Api from './service';

export interface StateType {
  list: any[];
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
      };
    },
  },
};

export default Model;
