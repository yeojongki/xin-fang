import React, { FC, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { Switch, Form, Input, InputNumber, Button } from 'antd';
import { StateType } from './model';
import { EditableTagGroup } from '@/components/EditableTagGroup';
import { FormComponentProps } from 'antd/es/form';

export const namespace = 'config';

interface IConfigProps {
  dispatch: Dispatch<any>;
  loading: boolean;
  config: StateType;
  form: FormComponentProps['form'];
}

const formItemLayout = {
  labelCol: {
    xs: { span: 12 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 12 },
    sm: { span: 8 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const Config: FC<IConfigProps> = ({ dispatch, config, form, loading }) => {
  const { getFieldDecorator } = form;

  useEffect(() => {
    if (!config.spiderConfig.length) {
      dispatch({
        type: `${namespace}/getSpiderConfig`,
      });
    }
  }, []);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({
      type: `${namespace}/updateSpiderConfig`,
      payload: {
        values: form.getFieldsValue(),
      },
    });
  };

  const compMap = {
    boolean: <Switch />,
    string: <Input />,
    number: <InputNumber />,
    arrayString: <EditableTagGroup tagName="关键词" />,
  };

  return (
    <PageHeaderWrapper title={false}>
      <Form {...formItemLayout} onSubmit={onSubmit}>
        {config.spiderConfig.map((item) => (
          <Form.Item label={item.name} key={item.key} extra={item.extra}>
            {getFieldDecorator(item.key, {
              initialValue: item.value,
              valuePropName: item.type === 'boolean' ? 'checked' : 'value',
            })(compMap[item.type] ? compMap[item.type] : <div>{item.value}</div>)}
          </Form.Item>
        ))}
        <Form.Item {...tailFormItemLayout}>
          <Button loading={loading} type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </PageHeaderWrapper>
  );
};

export default connect(
  ({
    config,
    loading,
  }: {
    config: StateType;
    loading: {
      global: boolean;
    };
  }) => ({ config, loading: loading.global }),
)(Form.create()(Config));
