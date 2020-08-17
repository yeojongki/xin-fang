import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { message as Message } from 'antd';
import { City } from '@xf/common/src/entities/city.entity';
import { IPaginationList } from '@xf/common/src/interfaces/pagination.interface';
import { HttpSuccessResponse } from '@xf/common/src/interfaces/http.interface';
import * as Api from '@/services/city';

export const namespace = 'city';

export type CityStateType = IPaginationList<City>;

export type Effect = (action: AnyAction, effects: EffectsCommandMap) => void;

export interface ModelType {
  namespace: string;
  state: CityStateType;
  effects: {
    getList: Effect;
    update: Effect;
    getSubwaysByCityId: Effect;
  };
  reducers: {
    getListHandle: Reducer<CityStateType>;
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
      const { result }: HttpSuccessResponse = yield call(Api.getList, payload);
      yield put({
        type: 'getListHandle',
        payload: result,
      });
    },
    *update({ payload }, { call }) {
      const { callback, values } = payload;
      const { message }: HttpSuccessResponse = yield call(Api.update, values);
      Message.success(message);
      callback && callback();
    },
    *getSubwaysByCityId({ payload }, { call }) {
      const { callback, id } = payload;
      const { result }: HttpSuccessResponse = yield call(Api.getSubwaysByCityId, id);
      callback && callback(result.list);
    },
  },

  reducers: {
    getListHandle(_, { payload: { list, pagination } }) {
      return {
        list,
        pagination,
      };
    },
  },
};

export default Model;
