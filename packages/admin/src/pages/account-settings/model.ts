import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { GeographicItemType } from './data.d';
// import { queryCity, queryProvince, query as queryUsers } from './service';
import { CurrentUser } from '@/models/user';

export interface ModalState {
  currentUser?: Partial<CurrentUser>;
  province?: GeographicItemType[];
  city?: GeographicItemType[];
  isLoading?: boolean;
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: ModalState) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: ModalState;
  effects: {
    // fetchProvince: Effect;
    // fetchCity: Effect;
  };
  reducers: {
    changeNotifyCount: Reducer<ModalState>;
    // setProvince: Reducer<ModalState>;
    // setCity: Reducer<ModalState>;
    changeLoading: Reducer<ModalState>;
  };
}

const Model: ModelType = {
  namespace: 'accountSettings',

  state: {
    currentUser: {},
    // province: [],
    // city: [],
    isLoading: false,
  },

  effects: {
    // *fetchProvince(_, { call, put }) {
    //   yield put({
    //     type: 'changeLoading',
    //     payload: true,
    //   });
    //   const response = yield call(queryProvince);
    //   yield put({
    //     type: 'setProvince',
    //     payload: response,
    //   });
    // },
    // *fetchCity({ payload }, { call, put }) {
    //   const response = yield call(queryCity, payload);
    //   yield put({
    //     type: 'setCity',
    //     payload: response,
    //   });
    // },
  },

  reducers: {
    changeNotifyCount(state = {}, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
    // setProvince(state, action) {
    //   return {
    //     ...state,
    //     province: action.payload,
    //   };
    // },
    // setCity(state, action) {
    //   return {
    //     ...state,
    //     city: action.payload,
    //   };
    // },
    changeLoading(state, action) {
      return {
        ...state,
        isLoading: action.payload,
      };
    },
  },
};

export default Model;
