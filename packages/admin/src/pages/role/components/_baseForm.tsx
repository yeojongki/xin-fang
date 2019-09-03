import React, { forwardRef } from 'react';
import { Form, Modal, Input } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { IRole } from '@xf/common/src/interfaces/role.interfaces';
import formItemLayout from './_formItemLayout';

export interface IBaseFormProps extends FormComponentProps {
  title: string;
  type: 'create' | 'edit';
  visible: boolean;
  onSubmit: (values: any) => void;
  onCancel: () => void;
  loading: boolean;
  initValue?: IRole | undefined;
}

const FormItem = Form.Item;

const BaseForm = (
  { visible, title, onCancel, onSubmit, form, initValue, loading, type }: IBaseFormProps,
  ref: React.Ref<any>,
) => {
  const { getFieldDecorator } = form;
  const onOk = () => {
    form.validateFields((err: any, values: any) => {
      if (err) {
        return;
      }
      onSubmit(values);
    });
  };

  return (
    <Modal
      okButtonProps={{ loading }}
      visible={visible}
      title={title}
      onOk={onOk}
      onCancel={onCancel}
    >
      <Form {...formItemLayout} ref={ref}>
        {/* id for edit */}
        {type === 'edit' ? (
          <FormItem style={{ marginBottom: 0 }}>
            {getFieldDecorator('id', {
              initialValue: initValue ? initValue.id : '',
            })(<Input hidden maxLength={16} placeholder="标识" />)}
          </FormItem>
        ) : null}

        <FormItem label="标识" hasFeedback>
          {getFieldDecorator('token', {
            initialValue: initValue ? initValue.token : '',
            rules: [
              {
                required: true,
                message: '请输入标识！',
              },
            ],
          })(<Input maxLength={16} placeholder="标识" />)}
        </FormItem>
        <FormItem label="名称" hasFeedback>
          {getFieldDecorator('name', {
            initialValue: initValue ? initValue.name : '',
            rules: [
              {
                required: true,
                message: '请输入名称！',
              },
            ],
          })(<Input maxLength={16} placeholder="名称" />)}
        </FormItem>
      </Form>
    </Modal>
  );
};

export default Form.create<IBaseFormProps>()(forwardRef(BaseForm));
