import React from 'react';
import { Form, Input } from 'antd';
import { Permission } from '@xf/common/src/entities';
import { TRenderItems } from '@/components/BaseFormWrap';

const FormItem = Form.Item;

export const Base = (props: TRenderItems<Permission>) => {
  const { initValue, form, type } = props;
  const { getFieldDecorator } = form;

  return (
    <>
      {type === 'edit' ? (
        <FormItem style={{ marginBottom: 0 }}>
          {getFieldDecorator('id', {
            initialValue: initValue ? initValue.id : '',
          })(<Input hidden readOnly />)}
        </FormItem>
      ) : null}

      <FormItem label="标识" hasFeedback>
        {getFieldDecorator('token', {
          initialValue: initValue ? initValue.token : '',
          rules: [
            {
              required: true,
              message: '请输入标识！',
            },
          ],
        })(<Input maxLength={50} placeholder="标识" />)}
      </FormItem>

      <FormItem label="名称" hasFeedback>
        {getFieldDecorator('name', {
          initialValue: initValue ? initValue.name : '',
          rules: [
            {
              required: true,
              message: '请输入名称！',
            },
          ],
        })(<Input maxLength={16} placeholder="名称" />)}
      </FormItem>

      <FormItem label="模块名" hasFeedback>
        {getFieldDecorator('module', {
          initialValue: initValue ? initValue.module : '',
          rules: [
            {
              required: true,
              message: '请输入模块名！',
            },
          ],
        })(<Input maxLength={16} placeholder="模块名" />)}
      </FormItem>

      <FormItem label="描述" hasFeedback>
        {getFieldDecorator('desc', {
          initialValue: initValue ? initValue.desc : '',
        })(<Input maxLength={16} placeholder="描述" />)}
      </FormItem>
    </>
  );
};
