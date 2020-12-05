import React, { FC, useMemo, useCallback, FormEvent } from 'react';
import { Form, Input, Select, Button, DatePicker } from 'antd';
import {
  MAX_LENGTH_USERNAME,
  MAX_LENGTH_MOBILE,
  MAX_LENGTH_EMAIL,
  MAX_LENGTH_WECHAT,
} from '@xf/common/src/constants/validation.const';
import { IRole } from '@xf/common/src/interfaces/role.interfaces';
import { FormComponentProps } from 'antd/lib/form';
import styles from '@/assets/styles/form.less';
import moment, { Moment } from 'moment';

interface IQueryProps extends FormComponentProps {
  onSearch: Function;
  onReset: Function;
  roleList: IRole[];
}

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;

const Query: FC<IQueryProps> = (props: IQueryProps) => {
  const { onSearch, onReset, form, roleList } = props;
  const { getFieldDecorator } = form;

  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const values = form.getFieldsValue();
      if (values.createdAt) {
        values.createdAt = values.createdAt.map((time: Moment) =>
          time.format('YYYY-MM-DD HH:mm:ss'),
        );
      }
      onSearch(values);
    },
    [onSearch],
  );

  const handleFormReset = useCallback(() => {
    form.resetFields();
    onReset();
  }, [form]);

  const disabledEndDate = (endvalue: moment.Moment | null) => {
    if (endvalue === null) return false;
    return endvalue.valueOf() > moment().valueOf();
  };

  return useMemo(
    () => (
      <>
        <Form layout="inline" onSubmit={onSubmit} className={styles.tableListForm}>
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

          <FormItem label="微信号">
            {getFieldDecorator('wechat')(
              <Input maxLength={MAX_LENGTH_WECHAT} placeholder="请输入微信号" />,
            )}
          </FormItem>

          <FormItem label="角色">
            {getFieldDecorator('roles')(
              <Select style={{ minWidth: '174px' }} placeholder="请选择用户角色">
                {roleList.map(({ token, name }) => (
                  <Option key={token} value={token}>
                    {name}
                  </Option>
                ))}
              </Select>,
            )}
          </FormItem>

          <FormItem label="注册时间">
            {getFieldDecorator('createdAt')(
              <RangePicker
                disabledDate={disabledEndDate}
                ranges={{
                  Today: [moment(), moment()],
                }}
                showTime={{ format: 'HH:mm' }}
                format="YYYY-MM-DD HH:mm"
                placeholder={['开始时间', '结束时间']}
              />,
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
