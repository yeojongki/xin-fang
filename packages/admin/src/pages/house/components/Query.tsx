import React, { FC, useMemo, useCallback, FormEvent } from 'react';
import { Form, Input, Button, Select } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { houseOptions } from '@xf/common/src/constants/house.const';
import styles from '@/assets/styles/form.less';

interface IQueryProps extends FormComponentProps {
  onSearch: Function;
  onReset: Function;
}

const FormItem = Form.Item;
const { Option } = Select;

const Query: FC<IQueryProps> = (props: IQueryProps) => {
  const { onSearch, onReset, form } = props;
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

          <FormItem label="状态">
            {getFieldDecorator('status')(
              <Select style={{ minWidth: '174px' }}>
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
