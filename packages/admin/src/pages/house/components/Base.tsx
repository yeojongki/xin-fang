import React from 'react';
import { Form, Input, Select } from 'antd';
import { ICity } from '@xf/common/src/interfaces/city.interface';
import { ISubway } from '@xf/common/src/interfaces/subway.interface';
import { houseOptions } from '@xf/common/src/constants/house.const';
import { CityStatus, DEFAULT_CITY_ID } from '@xf/common/src/constants/city.const';
import { TRenderItems } from '@/components/BaseFormWrap';
import { PicturesWall, IUploadFile } from '@/components/PicturesWall';
import { OSS_PREFIX } from '@/config';
import { TSubmitHouse } from '..';

const FormItem = Form.Item;
const { TextArea } = Input;
const { Option } = Select;

export const Base = (
  props: TRenderItems<TSubmitHouse> & {
    cityList: ICity[];
    subwayList: ISubway[];
    onCityChange: (id: number) => void;
  },
) => {
  const { initValue, form, type, cityList, subwayList, onCityChange } = props;
  const { getFieldDecorator } = form;

  const getUploadFileUrls = (fileList: IUploadFile[]): IUploadFile[] => fileList;

  const fileList = initValue
    ? initValue.imgs.map((item) => ({
        response: { result: { filename: item } },
        status: 'done',
        url: OSS_PREFIX + item,
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
          rules: [
            {
              required: true,
              message: '请输入详情！',
            },
          ],
          initialValue: initValue ? initValue.content : '',
        })(<TextArea rows={7} maxLength={500} placeholder="请输入详情" />)}
      </FormItem>

      <FormItem label="状态" hasFeedback>
        {getFieldDecorator('status', {
          initialValue: initValue ? `${initValue.status}` : houseOptions[0].value,
          rules: [
            {
              required: true,
              message: '请输入状态！',
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

      <FormItem label="所属城市" hasFeedback>
        {getFieldDecorator('city', {
          initialValue: initValue ? `${initValue.city.name}` : DEFAULT_CITY_ID,
          rules: [
            {
              required: true,
              message: '请选择城市',
            },
          ],
        })(
          <Select onChange={onCityChange}>
            {cityList.map(({ id, name, status }) => (
              <Option key={id} value={id} disabled={status === CityStatus.OFF}>
                {name}
              </Option>
            ))}
          </Select>,
        )}
      </FormItem>

      <FormItem label="所属地铁" hasFeedback>
        {getFieldDecorator('subway', {
          initialValue: initValue ? `${initValue.subway.name}` : undefined,
          rules: [
            {
              required: true,
              message: '请选择地铁!',
            },
          ],
        })(
          <Select placeholder="请选择地铁">
            {subwayList.map(({ id, name }) => (
              <Option key={id} value={id}>
                {name}
              </Option>
            ))}
          </Select>,
        )}
      </FormItem>

      <FormItem label="图片">
        {getFieldDecorator('imgs', {
          rules: [
            {
              required: true,
              message: '请上传图片!',
            },
          ],
          initialValue: fileList,
          valuePropName: 'fileList',
          getValueFromEvent: getUploadFileUrls,
        })(<PicturesWall dir="house" />)}
      </FormItem>
    </>
  );
};
