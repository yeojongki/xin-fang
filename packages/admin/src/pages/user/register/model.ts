import { AnyAction, Reducer } from 'redux';

import { EffectsCommandMap } from 'dva';
import * as Api from './service';

export interface StateType {
  errno?: number;
  // currentAuthority?: 'user' | 'guest' | 'admin';
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: StateType) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    submit: Effect;
  };
  reducers: {
    registerHandle: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'userRegister',

  state: {
    errno: undefined,
  },

  effects: {
    *submit({ payload }, { call, put }) {
      const response = yield call(Api.register, payload);
      yield put({
        type: 'registerHandle',
        payload: response,
      });
    },
  },

  reducers: {
    registerHandle(state, { payload }) {
      return {
        errno: payload.errno,
      };
    },
  },
};

export default Model;
