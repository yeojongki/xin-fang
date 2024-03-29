import { Effect } from 'dva';
import { Reducer } from 'redux';
import { message as Message } from 'antd';
import { HttpSuccessResponse } from '@xf/common/src/interfaces/http.interface';
import { Gender } from '@xf/common/src/constants/gender.const';
import * as Api from '@/services/user';
import { setStorageRoles } from '@/utils/authority';
import { reloadAuthorized } from '@/utils/Authorized';

export interface CurrentUser {
  id?: string;
  avatar?: string;
  email?: string;
  gender?: Gender;
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
    sendVerifyEmail: Effect;
    verifyEmailByLink: Effect;
    verifyEmailByCode: Effect;
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
      callback && callback();
    },
    *sendVerifyEmail({ payload }, { call }) {
      const { callback, email } = payload;
      const { message }: HttpSuccessResponse = yield call(Api.sendVerifyEmail, email);
      Message.success(message);
      callback && callback();
    },
    *verifyEmailByLink({ payload }, { call }) {
      const { success, id, email, fail } = payload;
      try {
        const { message }: HttpSuccessResponse = yield call(Api.verifyEmailByLink, id, email);
        Message.success(message);
        success && success();
      } catch (error) {
        fail && fail(error);
      }
    },
    *verifyEmailByCode({ payload }, { call }) {
      const { success, fail, values } = payload;
      try {
        const { message }: HttpSuccessResponse = yield call(Api.verifyEmailByCode, values);
        Message.success(message);
        success && success();
      } catch (error) {
        fail && fail(error);
      }
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
