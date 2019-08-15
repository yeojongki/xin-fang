import React from 'react';
import { Result, Button } from 'antd';
import { router } from 'umi';

export default () => (
  <Result
    status="403"
    title="403"
    subTitle="对不起, 您的权限不足"
    extra={
      <>
        <Button onClick={() => router.goBack()}>返回</Button>
        <Button type="primary" onClick={() => router.push('/')}>
          回到首页
        </Button>
      </>
    }
  />
);
