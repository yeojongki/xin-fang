import React, { FC, useMemo, useCallback, FormEvent } from 'react';
import { Form, Input, Button, Select } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { houseOptions } from '@xf/common/src/constants/house.const';
import { ICity } from '@xf/common/src/interfaces/city.interface';
import { CityStatus } from '@xf/common/src/constants/city.const';
import styles from '@/assets/styles/form.less';
import { ISubway } from '@xf/common/src/interfaces/subway.interface';

interface IQueryProps extends FormComponentProps {
  onSearch: Function;
  onReset: Function;
  cityList: ICity[];
  subwayList: ISubway[];
  onCityChange: (id: number) => void;
}

const FormItem = Form.Item;
const { Option } = Select;

const Query: FC<IQueryProps> = (props: IQueryProps) => {
  const { onSearch, onReset, form, cityList, subwayList, onCityChange } = props;
  const { getFieldDecorator } = form;

  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const values = form.getFieldsValue();
      onSearch(values);
    },
    [onSearch],
  );

  const handleFormReset = useCallback(() => {
    form.resetFields();
    onReset();
  }, [form]);

  const onChange = (id: number) => {
    form.resetFields(['subwayId']);
    onCityChange(id);
  };

  return useMemo(
    () => (
      <>
        <Form layout="inline" onSubmit={onSubmit} className={styles.tableListForm}>
          <FormItem label="ID">
            {getFieldDecorator('id')(<Input maxLength={64} placeholder="请输入ID" />)}
          </FormItem>

          <FormItem label="标题">
            {getFieldDecorator('title')(<Input maxLength={50} placeholder="请输入标题" />)}
          </FormItem>

          <FormItem label="发布者">
            {getFieldDecorator('username')(<Input maxLength={50} placeholder="请输入发布者名字" />)}
          </FormItem>

          <FormItem label="城市">
            {getFieldDecorator('cityId')(
              <Select onChange={onChange} placeholder="请选择城市" style={{ minWidth: '174px' }}>
                {cityList.map(({ id, name, status }) => (
                  <Option key={id} value={id} disabled={status === CityStatus.OFF}>
                    {name}
                  </Option>
                ))}
              </Select>,
            )}
          </FormItem>

          <FormItem label="地铁">
            {getFieldDecorator('subwayId')(
              <Select placeholder="请选择地铁" style={{ minWidth: '174px' }}>
                {subwayList.map(({ id, name }) => (
                  <Option key={id} value={id}>
                    {name}
                  </Option>
                ))}
              </Select>,
            )}
          </FormItem>

          <FormItem label="状态">
            {getFieldDecorator('status')(
              <Select placeholder="请选择状态" style={{ minWidth: '174px' }}>
                {houseOptions.map(({ value, name }) => (
                  <Option key={value} value={value}>
                    {name}
                  </Option>
                ))}
              </Select>,
            )}
          </FormItem>

          <span className={styles.submitButtons}>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={handleFormReset}>
              重置
            </Button>
          </span>
        </Form>
      </>
    ),
    [props],
  );
};

export default Form.create<IQueryProps>({ name: 'query' })(Query);
