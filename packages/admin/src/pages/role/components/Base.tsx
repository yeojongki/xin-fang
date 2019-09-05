import React from 'react';
import { Form, Input } from 'antd';
import { IRole } from '@xf/common/src/interfaces/role.interfaces';
import { TRenderItems } from '@/components/BaseForm';

const FormItem = Form.Item;

export const Base = (props: TRenderItems<IRole>) => {
  const { initValue, form, type } = props;
  const { getFieldDecorator } = form;
  const isQueryForm = type === 'query';

  return (
    <>
      {type === 'edit' ? (
        <FormItem style={{ marginBottom: 0 }}>
          {getFieldDecorator('id', {
            initialValue: initValue ? initValue.id : '',
          })(<Input hidden readOnly />)}
        </FormItem>
      ) : null}

      <FormItem label="标识" hasFeedback={!isQueryForm}>
        {getFieldDecorator('token', {
          initialValue: initValue ? initValue.token : '',
          rules: [
            {
              required: !isQueryForm,
              message: '请输入标识！',
            },
          ],
        })(<Input maxLength={16} placeholder="标识" />)}
      </FormItem>

      <FormItem label="名称" hasFeedback={!isQueryForm}>
        {getFieldDecorator('name', {
          initialValue: initValue ? initValue.name : '',
          rules: [
            {
              required: !isQueryForm,
              message: '请输入名称！',
            },
          ],
        })(<Input maxLength={16} placeholder="名称" />)}
      </FormItem>

      <FormItem label="描述" hasFeedback={!isQueryForm}>
        {getFieldDecorator('desc', {
          initialValue: initValue ? initValue.desc : '',
        })(<Input maxLength={16} placeholder="描述" />)}
      </FormItem>
    </>
  );
};
