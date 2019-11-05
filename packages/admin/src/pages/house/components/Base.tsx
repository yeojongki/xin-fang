import React from 'react';
import { Form, Input } from 'antd';
import { House } from '@xf/common/src/entities';
import { TRenderItems } from '@/components/BaseFormWrap';

const FormItem = Form.Item;

export const Base = (props: TRenderItems<House>) => {
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

      <FormItem label="标题" hasFeedback>
        {getFieldDecorator('title', {
          initialValue: initValue ? initValue.title : '',
          rules: [
            {
              required: true,
              message: '请输入标识标题！',
            },
          ],
        })(<Input maxLength={50} placeholder="标题" />)}
      </FormItem>
    </>
  );
};
