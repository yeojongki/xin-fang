import React from 'react';
import { Form, Input, Select } from 'antd';
import { House } from '@xf/common/src/entities';
import { houseOptions } from '@xf/common/src/constants/house.const';
import { TRenderItems } from '@/components/BaseFormWrap';

const FormItem = Form.Item;
const { TextArea } = Input;
const { Option } = Select;

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
        })(<Input maxLength={50} placeholder="请输入标题" />)}
      </FormItem>

      <FormItem label="详情" hasFeedback>
        {getFieldDecorator('content', {
          initialValue: initValue ? initValue.content : '',
          rules: [
            {
              required: true,
              message: '请输入详情！',
            },
          ],
        })(<TextArea rows={7} maxLength={500} placeholder="请输入详情" />)}
      </FormItem>

      <FormItem label="状态" hasFeedback>
        {getFieldDecorator('status', {
          initialValue: initValue ? `${initValue.status}` : houseOptions[0].value,
          rules: [
            {
              required: true,
              message: '请输入详情！',
            },
          ],
        })(
          <Select>
            {houseOptions.map(({ value, name }) => (
              <Option key={value} value={value}>
                {name}
              </Option>
            ))}
          </Select>,
        )}
      </FormItem>
    </>
  );
};
