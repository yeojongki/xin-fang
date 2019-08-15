import React from 'react';
import { Result, Button } from 'antd';
import { router } from 'umi';

export default () => (
  <Result
    status="500"
    title="500"
    subTitle="对不起, 服务器发生了错误"
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
