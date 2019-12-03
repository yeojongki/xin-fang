import { Reducer } from 'redux';
import defaultSettings, { DefaultSettings } from '../../config/defaultSettings';

export interface SettingModelType {
  namespace: 'settings';
  state: DefaultSettings;
  reducers: {
    changeSetting: Reducer<DefaultSettings>;
  };
}

const updateColorWeak: (colorWeak: boolean) => void = colorWeak => {
  const root = document.getElementById('root');
  if (root) {
    root.className = colorWeak ? 'colorWeak' : '';
  }
};

const initialSetting = window.localStorage.getItem('umi_setting');
const SettingModel: SettingModelType = {
  namespace: 'settings',
  state: initialSetting ? JSON.parse(initialSetting) : defaultSettings,
  reducers: {
    changeSetting(state = defaultSettings, { payload }) {
      const { colorWeak, contentWidth } = payload;
      if (state.contentWidth !== contentWidth && window.dispatchEvent) {
        window.dispatchEvent(new Event('resize'));
      }
      updateColorWeak(!!colorWeak);
      window.localStorage.setItem('umi_setting', JSON.stringify(payload));
      return {
        ...state,
        ...payload,
      };
    },
  },
};
export default SettingModel;
