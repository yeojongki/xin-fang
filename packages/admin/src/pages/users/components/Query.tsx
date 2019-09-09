import React, { FC, useMemo, forwardRef, useCallback, FormEvent } from 'react';
import { Form, Input, Select, Button } from 'antd';
import {
  MAX_LENGTH_USERNAME,
  MAX_LENGTH_MOBILE,
  MAX_LENGTH_EMAIL,
} from '@xf/common/src/constants/validation.const';
import { FormComponentProps } from 'antd/lib/form';
import styles from '@/assets/styles/form.less';

interface IQueryProps extends FormComponentProps {
  onSearch: Function;
}

const FormItem = Form.Item;

const Query: FC<IQueryProps> = ({ onSearch, form }, ref) => {
  const { getFieldDecorator } = form;

  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      onSearch(form.getFieldsValue());
    },
    [onSearch],
  );

  const handleFormReset = useCallback(() => form.resetFields(), [form]);

  return (
    <>
      <Form ref={ref} layout="inline" onSubmit={onSubmit} className={styles.tableListForm}>
        <FormItem label="用户名">
          {getFieldDecorator('username')(
            <Input maxLength={MAX_LENGTH_USERNAME} placeholder="请输入用户名" />,
          )}
        </FormItem>

        <FormItem label="手机号">
          {getFieldDecorator('mobile')(
            <Input maxLength={MAX_LENGTH_MOBILE} placeholder="请输入手机号" />,
          )}
        </FormItem>

        <FormItem label="邮箱">
          {getFieldDecorator('email')(
            <Input maxLength={MAX_LENGTH_EMAIL} placeholder="请输入邮箱" />,
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
  );
};

export default Form.create<IQueryProps>()(forwardRef(Query));
