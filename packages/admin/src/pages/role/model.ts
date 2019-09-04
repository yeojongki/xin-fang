import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { message as Message } from 'antd';
import { IRole } from '@xf/common/src/interfaces/role.interfaces';
import { IPaginationList } from '@xf/common/src/interfaces/pagination.interface';
import { HttpSuccessResponse } from '@/utils/request';
import * as Api from './service';

export type IRoleStateType = IPaginationList<IRole>;

export type Effect = (action: AnyAction, effects: EffectsCommandMap) => void;

export interface ModelType {
  namespace: string;
  state: IRoleStateType;
  effects: {
    getList: Effect;
    deleteRoles: Effect;
    update: Effect;
    create: Effect;
  };
  reducers: {
    setList: Reducer<IRoleStateType>;
  };
}

const Model: ModelType = {
  namespace: 'role',

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
      const { result }: HttpSuccessResponse = yield call(Api.getList, payload);
      yield put({
        type: 'setList',
        payload: result,
      });
    },
    *deleteRoles({ payload }, { call }) {
      const { callback, ids } = payload;
      const { message }: HttpSuccessResponse = yield call(Api.deleteRoles, ids);
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
    setList(_, { payload: { list, pagination } }) {
      return {
        list,
        pagination,
      };
    },
  },
};

export default Model;
