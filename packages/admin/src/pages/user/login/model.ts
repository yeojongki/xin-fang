import { AnyAction } from 'redux';
import { EffectsCommandMap } from 'dva';
import { routerRedux } from 'dva/router';
import * as Api from './service';
import { getPageQuery } from './utils/utils';
import { HttpSuccessResponse } from '@/utils/request';
import { setStorageToken } from '@/utils/authority';

export interface StateType {
  errno?: number;
  /**
   * 登录类型 账号 or 手机号+验证码
   */
  type?: string;
  roles?: 'user' | 'guest' | 'admin';
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: StateType) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    login: Effect;
    // getCaptcha: Effect;
  };
}

const Model: ModelType = {
  namespace: 'userLogin',

  state: {
    errno: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response: HttpSuccessResponse = yield call(Api.accountLogin, payload);
      // set token
      const { result } = response;
      setStorageToken(result);

      // Login successfully
      if (response.errno === 0) {
        // fetch user info
        yield put({
          type: 'user/fetchCurrent',
        });

        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params as { redirect: string };
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }
        yield put(routerRedux.replace(redirect || '/'));
      }
    },

    // *getCaptcha({ payload }, { call }) {
    //   yield call(getFakeCaptcha, payload);
    // },
  },
};

export default Model;
