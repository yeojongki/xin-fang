import React, { FC, useMemo, useCallback, FormEvent } from 'react';
import { Form, Input, Button, Select } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
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
          <FormItem label="城市名">
            {getFieldDecorator('name')(<Input maxLength={20} placeholder="请输入城市名" />)}
          </FormItem>

          <FormItem label="是否开通">
            {getFieldDecorator('status')(
              <Select style={{ minWidth: '174px' }} placeholder="请选择是否开通">
                <Option value="">不限</Option>
                <Option value={1}>已开通</Option>
                <Option value={0}>未开通</Option>
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
