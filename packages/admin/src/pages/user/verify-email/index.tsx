import React, { FC, useState, useEffect } from 'react';
import { connect } from 'dva';
import { Result, Button } from 'antd';
import { Link } from 'umi';
import { stringify } from 'querystring';
import { ConnectProps } from '@/models/connect';
import { CurrentUser } from '@/models/user';

const VerifyEmail: FC<
  ConnectProps & { user: CurrentUser; location: { query: { id?: string; email?: string } } }
> = props => {
  const [status, setStatus] = useState<'success' | 'error' | 'warning'>('warning');
  const {
    user = {},
    dispatch,
    location: { query },
  } = props;

  useEffect(() => {
    const { id, email } = query;
    if (id && email && dispatch) {
      dispatch({
        type: 'user/verifyEmailByLink',
        payload: {
          id,
          email,
          success: () => {
            setStatus('success');
          },
          fail: () => {
            setStatus('error');
          },
        },
      });
    }
  }, [query]);

  const titleMap = {
    success: '验证成功',
    error: '验证失败',
    warning: '正在验证邮箱...',
  };

  const actionMap = {
    success: (
      <Link to={user.username ? '/' : '/user/login'} replace>
        <Button size="large" type="primary">
          {user.username ? '去首页' : '去登录'}
        </Button>
      </Link>
    ),
    error: (
      <Link
        to={
          user.username
            ? '/'
            : `/user/login?${stringify({
                redirect: '/account/settings?tab=security',
              })}`
        }
        replace
      >
        <Button size="large" type="primary">
          {user.username ? '重新发送' : '登录后重新发送'}
        </Button>
      </Link>
    ),
    warning: (
      <Button loading type="primary">
        loading
      </Button>
    ),
  };

  return (
    // <Spin tip="正在验证邮箱 请稍后..." size="large">
    <Result
      status={status}
      title={titleMap[status]}
      subTitle="tips: 若验证失败，则需要重新发送邮件验证"
      extra={actionMap[status]}
    />
    // </Spin>
  );
};

export default connect(({ user }) => ({ user }))(VerifyEmail);
