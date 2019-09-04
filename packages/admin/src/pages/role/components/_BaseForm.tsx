import React, { forwardRef, memo, Ref, ReactNode } from 'react';
import { Form, Input } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { IRole } from '@xf/common/src/interfaces/role.interfaces';
import formItemLayout from './_formItemLayout';

export interface IBaseFormProps extends FormComponentProps {
  initValue?: IRole | undefined;
  type: TFormItemLayout;
  onSubmit?: (values: any) => void;
  renderOthers?: () => ReactNode;
  excludeDescColumn?: boolean;
}

export type TFormItemLayout = 'create' | 'edit' | 'query';

const FormItem = Form.Item;

const BaseForm = (props: IBaseFormProps, ref: Ref<any>) => {
  const { initValue, form, type, onSubmit, renderOthers, excludeDescColumn } = props;
  const { getFieldDecorator } = form;
  const isQueryForm = type === 'query';

  return (
    <Form
      onSubmit={(e: React.FormEvent) => {
        e.preventDefault();
        form.validateFields((err: any, values: any) => {
          if (err) {
            return;
          }
          onSubmit && onSubmit(values);
        });
      }}
      {...formItemLayout}
      layout={isQueryForm ? 'inline' : 'horizontal'}
      ref={ref}
    >
      {type === 'edit' ? (
        <FormItem style={{ marginBottom: 0 }}>
          {getFieldDecorator('id', {
            initialValue: initValue ? initValue.id : '',
          })(<Input hidden readOnly />)}
        </FormItem>
      ) : null}

      <FormItem label="标识" hasFeedback={!isQueryForm}>
        {getFieldDecorator('token', {
          initialValue: initValue ? initValue.token : '',
          rules: [
            {
              required: !isQueryForm,
              message: '请输入标识！',
            },
          ],
        })(<Input maxLength={16} placeholder="标识" />)}
      </FormItem>

      <FormItem label="名称" hasFeedback={!isQueryForm}>
        {getFieldDecorator('name', {
          initialValue: initValue ? initValue.name : '',
          rules: [
            {
              required: !isQueryForm,
              message: '请输入名称！',
            },
          ],
        })(<Input maxLength={16} placeholder="名称" />)}
      </FormItem>

      {excludeDescColumn ? null : (
        <FormItem label="描述" hasFeedback={!isQueryForm}>
          {getFieldDecorator('desc', {
            initialValue: initValue ? initValue.desc : '',
          })(<Input maxLength={16} placeholder="描述" />)}
        </FormItem>
      )}

      {renderOthers && renderOthers()}
    </Form>
  );
};

export default memo(Form.create<IBaseFormProps>()(forwardRef(BaseForm)));
