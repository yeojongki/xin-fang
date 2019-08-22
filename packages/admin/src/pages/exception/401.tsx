import React from 'react';
import { Result, Button } from 'antd';
import { router } from 'umi';

export default () => (
  <Result
    status="403"
    title="401"
    subTitle="您的登录信息已过期或不合法，请重新登录"
    extra={
      <>
        <Button
          type="primary"
          onClick={() => router.replace(`/user/login${window.location.search}`)}
        >
          重新登录
        </Button>
      </>
    }
  />
);
