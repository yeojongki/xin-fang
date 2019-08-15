import React from 'react';
import { Result, Button } from 'antd';
import { router } from 'umi';

export default () => (
  <Result
    status="404"
    title="404"
    subTitle="对不起, 你访问的页面不存在"
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
