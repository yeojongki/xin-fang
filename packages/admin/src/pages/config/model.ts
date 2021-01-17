import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { message as Message } from 'antd';
import { HttpSuccessResponse } from '@xf/common/src/interfaces/http.interface';
import { ISpiderConfig } from '@xf/common/src/interfaces/config.interface';
import * as Api from './service';
import { namespace } from '.';

export type StateType = { spiderConfig: ISpiderConfig[] };

export type Effect = (action: AnyAction, effects: EffectsCommandMap) => void;

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    getSpiderConfig: Effect;
    updateSpiderConfig: Effect;
  };
  reducers: {
    getSpiderConfigHandler: Reducer<StateType>;
    updateSpiderConfigHandler: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace,

  state: {
    spiderConfig: [],
  },

  effects: {
    *getSpiderConfig(_, { call, put }) {
      const { result }: HttpSuccessResponse = yield call(Api.getSpiderConfig);
      yield put({
        type: 'getSpiderConfigHandler',
        payload: result,
      });
    },
    *updateSpiderConfig({ payload }, { call }) {
      const { values } = payload;
      const { message }: HttpSuccessResponse = yield call(Api.updateSpiderConfig, values);
      Message.success(message);
    },
  },

  reducers: {
    getSpiderConfigHandler(state, { payload }) {
      return {
        ...state,
        spiderConfig: payload,
      };
    },
    updateSpiderConfigHandler(state, { payload }) {
      return {
        ...state,
        spiderConfig: payload,
      };
    },
  },
};

export default Model;
