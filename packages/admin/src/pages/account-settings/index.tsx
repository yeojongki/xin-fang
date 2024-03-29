import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { GridContent, PageHeaderWrapper } from '@ant-design/pro-layout';
import { Menu } from 'antd';
import { connect } from 'dva';
import BaseView from './components/base';
// import BindingView from './components/binding';
// import NotificationView from './components/notification';
import SecurityView from './components/security';
import styles from './style.less';
import { CurrentUser } from '@/models/user';

const { Item } = Menu;
interface AccountSettingsProps {
  location: { query: { tab?: AccountSettingsStateKeys } };
  dispatch: Dispatch<any>;
  currentUser: CurrentUser;
}
type AccountSettingsStateKeys = 'base' | 'security' | 'binding' | 'notification';
interface AccountSettingsState {
  mode: 'inline' | 'horizontal';
  menuMap: {
    [key: string]: React.ReactNode;
  };
  selectKey: AccountSettingsStateKeys;
}

@connect(({ user }: { user: { currentUser: CurrentUser } }) => ({
  currentUser: user.currentUser,
}))
class AccountSettings extends Component<AccountSettingsProps, AccountSettingsState> {
  main: HTMLDivElement | undefined = undefined;

  constructor(props: AccountSettingsProps) {
    super(props);
    const menuMap = {
      base: '基本设置',
      security: '安全设置',
      // binding: '账号绑定',
      // notification: '新消息通知',
    };
    this.state = {
      mode: 'inline',
      menuMap,
      selectKey: 'base',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/fetchCurrent',
    });
    window.addEventListener('resize', this.resize);
    this.resize();
  }

  componentWillReceiveProps(props: AccountSettingsProps) {
    const { tab } = props.location.query;
    if (tab && this.state.menuMap[tab]) {
      this.setState({ selectKey: tab });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  getMenu = () => {
    const { menuMap } = this.state;
    return Object.keys(menuMap).map(item => <Item key={item}>{menuMap[item]}</Item>);
  };

  getRightTitle = () => {
    const { selectKey, menuMap } = this.state;
    return menuMap[selectKey];
  };

  selectKey = (key: AccountSettingsStateKeys) => {
    this.setState({
      selectKey: key,
    });
  };

  resize = () => {
    if (!this.main) {
      return;
    }

    requestAnimationFrame(() => {
      if (!this.main) {
        return;
      }

      let mode: 'inline' | 'horizontal' = 'inline';
      const { offsetWidth } = this.main;

      if (window.innerWidth <= 768 && offsetWidth > 400) {
        mode = 'horizontal';
      }

      this.setState({
        mode,
      });
    });
  };

  renderChildren = () => {
    const { selectKey } = this.state;

    switch (selectKey) {
      case 'base':
        return <BaseView />;

      case 'security':
        return <SecurityView />;

      // case 'binding':
      //   return <BindingView />;

      // case 'notification':
      //   return <NotificationView />;

      default:
        break;
    }

    return null;
  };

  render() {
    const { currentUser } = this.props;
    if (!currentUser.username) {
      return '';
    }

    const { mode, selectKey } = this.state;
    return (
      <PageHeaderWrapper title={false}>
        <GridContent>
          <div
            className={styles.main}
            ref={ref => {
              if (ref) {
                this.main = ref;
              }
            }}
          >
            <div className={styles.leftMenu}>
              <Menu
                mode={mode}
                selectedKeys={[selectKey]}
                onClick={({ key }) => this.selectKey(key as AccountSettingsStateKeys)}
              >
                {this.getMenu()}
              </Menu>
            </div>
            <div className={styles.right}>
              <div className={styles.title}>{this.getRightTitle()}</div>
              {this.renderChildren()}
            </div>
          </div>
        </GridContent>
      </PageHeaderWrapper>
    );
  }
}

export default AccountSettings;
