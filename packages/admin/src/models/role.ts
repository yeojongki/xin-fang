import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { message as Message } from 'antd';
import { IRole } from '@xf/common/src/interfaces/role.interfaces';
import { HttpSuccessResponse } from '@xf/common/src/interfaces/http.interface';
import * as Api from '@/services/role';
import { namespace } from '@/pages/role';

export interface IRoleMap {
  [token: string]: IRole;
}

export interface IRoleStateType {
  list: IRole[];
  map: IRoleMap;
}

export type Effect = (action: AnyAction, effects: EffectsCommandMap) => void;

export interface ModelType {
  namespace: string;
  state: IRoleStateType;
  effects: {
    getList: Effect;
    delete: Effect;
    update: Effect;
    create: Effect;
  };
  reducers: {
    setList: Reducer<IRoleStateType>;
  };
}

const Model: ModelType = {
  namespace,

  state: {
    list: [],
    map: {},
  },

  effects: {
    *getList({ payload }, { call, put }) {
      const {
        result: { list },
      }: HttpSuccessResponse = yield call(Api.getList, payload);
      const map = (list as IRole[]).reduce((p, n) => {
        p[n.token] = n.name;
        return p;
      }, {});
      yield put({
        type: 'setList',
        payload: { list, map },
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
    setList(_, { payload: { list, map } }) {
      return {
        list,
        map,
      };
    },
  },
};

export default Model;
