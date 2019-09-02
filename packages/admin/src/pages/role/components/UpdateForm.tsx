import React, { FC } from 'react';
import { Form, Modal, Input } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { IRole } from '@xf/common/src/interfaces/role.interfaces';

interface IUpdateFormProps extends FormComponentProps {
  visible: boolean;
  handleUpdateVisible: (visible: boolean) => void;
  handleOk: () => void;
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

const UpdateForm: FC<IUpdateFormProps> = ({
  visible,
  handleUpdateVisible,
  handleOk,
  form,
  initValue,
}) => {
  // const [formVals, setFormVals] = useState<IRole | undefined>(
  //   initValue ? { ...initValue } : undefined,
  // );

  const { getFieldDecorator } = form;
  return (
    <Modal
      destroyOnClose
      visible={visible}
      title="编辑角色"
      onOk={handleOk}
      onCancel={() => handleUpdateVisible(false)}
    >
      <Form {...formItemLayout}>
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
      </Form>
    </Modal>
  );
};

UpdateForm.defaultProps = {
  handleUpdateVisible: () => {},
};

export default Form.create<IUpdateFormProps>()(UpdateForm);
