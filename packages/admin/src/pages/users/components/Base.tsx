import React from 'react';
import { Form, Input, Select } from 'antd';
import { IUser } from '@xf/common/src/interfaces/user.interfaces';
import {
  MAX_LENGTH_EMAIL,
  MAX_LENGTH_USERNAME,
  MAX_LENGTH_PASSWORD,
  MAX_LENGTH_MOBILE,
  MIN_LENGTH_PASSWORD,
  MOBILE_REG,
} from '@xf/common/src/constants/validation.const';
import { IRole } from '@xf/common/src/interfaces/role.interfaces';
import { DEFAULT_ROLE } from '@xf/common/src/constants/roles.const';
import { TRenderItems } from '@/components/BaseFormWrap';

const FormItem = Form.Item;
const { Option } = Select;

interface IBaseProps extends TRenderItems<IUser> {
  roleList: IRole[];
}

export const BaseForm = ({ initValue, form, type, roleList }: IBaseProps) => {
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

      <FormItem label="用户名" hasFeedback>
        {getFieldDecorator('username', {
          initialValue: initValue ? initValue.username : '',
          rules: [
            {
              required: true,
              message: '请输入用户名！',
            },
          ],
        })(<Input maxLength={MAX_LENGTH_USERNAME} placeholder="请输入用户名" />)}
      </FormItem>

      <FormItem label="密码" hasFeedback>
        {getFieldDecorator('password', {
          initialValue: initValue ? initValue.password : '',
          rules: [
            {
              required: type === 'create',
              message: '请输入密码！',
            },
            {
              min: MIN_LENGTH_PASSWORD,
              message: `长度最小为${MIN_LENGTH_PASSWORD}位!`,
            },
          ],
        })(
          <Input
            maxLength={MAX_LENGTH_PASSWORD}
            type="password"
            placeholder={`请输入${MIN_LENGTH_PASSWORD}-${MAX_LENGTH_PASSWORD}位的密码`}
          />,
        )}
      </FormItem>

      <FormItem label="角色" hasFeedback>
        {getFieldDecorator('roles', {
          initialValue: initValue ? initValue.roles : [DEFAULT_ROLE],
          rules: [{ required: true, message: '请选择用户角色!' }],
        })(
          <Select mode="multiple" placeholder="请选择用户角色">
            {roleList.map(({ token, name }) => (
              <Option key={token} value={token}>
                {name}
              </Option>
            ))}
          </Select>,
        )}
      </FormItem>

      <FormItem label="手机号" hasFeedback>
        {getFieldDecorator('mobile', {
          initialValue: initValue ? initValue.mobile : '',
          rules: [
            {
              validator: (_, value, callback: Function) => {
                if (value === '' || value === null || value === undefined) {
                  callback();
                  return;
                }
                const result = MOBILE_REG.test(value);
                if (!result) {
                  callback('手机号格式不正确');
                  return;
                }
                callback();
              },
            },
          ],
        })(<Input maxLength={MAX_LENGTH_MOBILE} placeholder="请输入手机号" />)}
      </FormItem>

      <FormItem label="邮箱" hasFeedback>
        {getFieldDecorator('email', {
          initialValue: initValue ? initValue.email : '',
          rules: [
            {
              type: 'email',
              message: '邮箱格式不正确',
            },
          ],
        })(<Input maxLength={MAX_LENGTH_EMAIL} placeholder="请输入邮箱" />)}
      </FormItem>
    </>
  );
};
