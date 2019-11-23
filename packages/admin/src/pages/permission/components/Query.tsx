import React, { FC, useMemo, useCallback, FormEvent } from 'react';
import { Form, Input, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import styles from '@/assets/styles/form.less';

interface IQueryProps extends FormComponentProps {
  onSearch: Function;
  onReset: Function;
}

const FormItem = Form.Item;

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
          <FormItem label="标识">
            {getFieldDecorator('token')(<Input maxLength={20} placeholder="请输入标识" />)}
          </FormItem>

          <FormItem label="名称">
            {getFieldDecorator('name')(<Input maxLength={20} placeholder="请输入名称" />)}
          </FormItem>

          <FormItem label="模块名">
            {getFieldDecorator('module')(<Input maxLength={20} placeholder="请输入模块名" />)}
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
