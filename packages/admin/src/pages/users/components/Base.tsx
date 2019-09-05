import React from 'react';
import { Form, Input } from 'antd';
import { IUser } from '@xf/common/src/interfaces/user.interfaces';
import { TRenderItems } from '@/components/BaseForm';

const FormItem = Form.Item;

export const Base = (props: TRenderItems<IUser>) => {
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

      <FormItem label="用户名" hasFeedback={!isQueryForm}>
        {getFieldDecorator('username', {
          initialValue: initValue ? initValue.username : '',
          rules: [
            {
              required: !isQueryForm,
              message: '请输入用户名！',
            },
          ],
        })(<Input maxLength={16} placeholder="用户名" />)}
      </FormItem>

      <FormItem label="密码" hasFeedback={!isQueryForm}>
        {getFieldDecorator('password', {
          initialValue: initValue ? initValue.password : '',
          rules: [
            {
              required: type === 'create',
              message: '请输入密码！',
            },
          ],
        })(<Input maxLength={16} type="password" placeholder="密码" />)}
      </FormItem>

      <FormItem label="手机号" hasFeedback={!isQueryForm}>
        {getFieldDecorator('mobile', {
          initialValue: initValue ? initValue.mobile : '',
        })(<Input maxLength={16} placeholder="手机号" />)}
      </FormItem>

      <FormItem label="邮箱" hasFeedback={!isQueryForm}>
        {getFieldDecorator('email', {
          initialValue: initValue ? initValue.email : '',
        })(<Input maxLength={50} placeholder="邮箱" />)}
      </FormItem>
    </>
  );
};
