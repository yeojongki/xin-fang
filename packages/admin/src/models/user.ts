import { Effect } from 'dva';
import { Reducer } from 'redux';
import { message as Message } from 'antd';
import * as Api from '@/services/user';
import { setStorageRoles } from '@/utils/authority';
import { reloadAuthorized } from '@/utils/Authorized';
import { HttpSuccessResponse } from '@xf/common/src/interfaces/http.interface';

export interface CurrentUser {
  id?: string;
  avatar?: string;
  email?: string;
  username?: string;
  title?: string;
  group?: string;
  signature?: string;
  mobile?: string;
  selfDesc?: string;
  tags?: {
    key: string;
    label: string;
  }[];
  unreadCount?: number;
}

export interface UserModelState {
  currentUser?: CurrentUser;
}

export interface UserModelType {
  namespace: 'user';
  state: UserModelState;
  effects: {
    fetchCurrent: Effect;
    update: Effect;
  };
  reducers: {
    saveCurrentUser: Reducer<UserModelState>;
    changeNotifyCount: Reducer<UserModelState>;
  };
}

const UserModel: UserModelType = {
  namespace: 'user',

  state: {
    currentUser: {},
  },

  effects: {
    *fetchCurrent(_, { call, put }) {
      const { result } = yield call(Api.queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: result,
      });
    },
    *update({ payload }, { call }) {
      const { callback, values } = payload;
      const { message }: HttpSuccessResponse = yield call(Api.update, values);
      Message.success(message);
      callback();
    },
  },

  reducers: {
    saveCurrentUser(
      state = {
        currentUser: {},
      },
      { payload },
    ) {
      // 刷新角色和路由
      setStorageRoles(payload.roles);
      reloadAuthorized();
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          ...payload,
        },
      };
    },
    changeNotifyCount(
      state = {
        currentUser: {},
      },
      { payload },
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: payload.totalCount,
          unreadCount: payload.unreadCount,
        },
      };
    },
  },
};

export default UserModel;
