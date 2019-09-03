import React from 'react';
import { Form, Modal, Input } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { IRole } from '@xf/common/src/interfaces/role.interfaces';
import { UpdateRoleInput } from '@xf/common/src/dtos/role/update-role.input';

interface IUpdateFormProps extends FormComponentProps {
  visible: boolean;
  handleUpdateVisible: (visible: boolean) => void;
  onSubmit: (values: UpdateRoleInput) => void;
  onCancel: () => void;
  loading: boolean;
  initValue: IRole | undefined;
}

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
};

function UpdateForm({ visible, onCancel, onSubmit, form, initValue, loading }: IUpdateFormProps) {
  // const [formVals, setFormVals] = useState<IRole | undefined>(
  //   initValue ? { ...initValue } : undefined,
  // );

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
      title="编辑角色"
      onOk={onOk}
      onCancel={onCancel}
    >
      <Form {...formItemLayout}>
        <FormItem>
          {getFieldDecorator('id', {
            initialValue: initValue ? initValue.id : '',
          })(<Input hidden maxLength={16} placeholder="标识" />)}
        </FormItem>
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
}

export default Form.create<IUpdateFormProps>()(UpdateForm);
