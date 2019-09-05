import React from 'react';
import { Modal } from 'antd';
import { WrappedFormUtils } from 'antd/es/form/Form';
import BaseForm, { IBaseFormProps } from '.';

export interface IModalFormProps extends Omit<IBaseFormProps, 'form'> {
  title: string;
  visible: boolean;
  onSubmit: (values: any) => void;
  onCancel: () => void;
  loading: boolean;
  forwardRef?: any;
}

const ModalForm = ({
  visible,
  title,
  onCancel,
  onSubmit,
  forwardRef,
  loading,
  ...rest
}: IModalFormProps) => {
  const onOk = () => {
    if (forwardRef) {
      const form: WrappedFormUtils = forwardRef.current;
      form.validateFields((err: any, values: any) => {
        if (err) {
          return;
        }
        onSubmit(values);
      });
    }
  };

  return (
    <Modal
      okButtonProps={{ loading, htmlType: 'submit' }}
      visible={visible}
      title={title}
      onOk={onOk}
      onCancel={onCancel}
    >
      <BaseForm {...rest} ref={forwardRef} />
    </Modal>
  );
};

export default React.forwardRef<any, IModalFormProps>((props, ref) => (
  <ModalForm forwardRef={ref} {...props} />
));