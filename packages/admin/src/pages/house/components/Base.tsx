import React from 'react';
import { Form, Input, Select } from 'antd';
import { houseOptions } from '@xf/common/src/constants/house.const';
import { TRenderItems } from '@/components/BaseFormWrap';
import { PicturesWall, IUploadFile } from '@/components/PicturesWall';
import { TSubmitHouse } from '..';

const FormItem = Form.Item;
const { TextArea } = Input;
const { Option } = Select;

export const Base = (props: TRenderItems<TSubmitHouse>) => {
  const { initValue, form, type } = props;
  const { getFieldDecorator } = form;

  const getUploadFileUrls = (fileList: IUploadFile[]): IUploadFile[] => fileList;

  const prefix = 'http://fang.yeojongki.cn/_upload/';

  const fileList = initValue
    ? initValue.imgs.map(item => ({
        response: { result: { filename: item } },
        status: 'done',
        url: prefix + item,
        name: item,
        uid: item,
        size: 0,
        type: 'image',
      }))
    : [];

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

      <FormItem label="图片">
        {getFieldDecorator('imgs', {
          initialValue: fileList,
          valuePropName: 'fileList',
          getValueFromEvent: getUploadFileUrls,
        })(<PicturesWall />)}
      </FormItem>
    </>
  );
};
