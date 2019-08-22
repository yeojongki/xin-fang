import { Button, Result } from 'antd';
import Link from 'umi/link';
import React from 'react';
import { RouteChildrenProps } from 'react-router';
import styles from './style.less';

const actions = (
  <div className={styles.actions}>
    <Link to="/user/login" replace>
      <Button size="large" type="primary">
        去登录
      </Button>
    </Link>
  </div>
);

const RegisterResult: React.FC<RouteChildrenProps> = ({ location }) => (
  <Result
    className={styles.registerResult}
    status="success"
    title={<div className={styles.title}>你的账户：{location.state.account} 注册成功</div>}
    subTitle="请马上登录账号开始体验吧 :)"
    extra={actions}
  />
);

export default RegisterResult;
