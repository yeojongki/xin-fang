import { Effect } from 'dva';
import { Reducer } from 'redux';
import { queryCurrent, query as queryUsers } from '@/services/user';
import { setStorageRoles } from '@/utils/authority';
import { reloadAuthorized } from '@/utils/Authorized';

export interface CurrentUser {
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
    fetch: Effect;
    fetchCurrent: Effect;
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
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrent(_, { call, put }) {
      const { result } = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: result,
      });
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
