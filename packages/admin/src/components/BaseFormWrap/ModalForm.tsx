import React, { CSSProperties } from 'react';
import { Modal } from 'antd';
import { WrappedFormUtils } from 'antd/es/form/Form';
import BaseFormWrap, { IBaseFormWrapProps } from '.';

export interface IModalFormProps extends Omit<IBaseFormWrapProps, 'form'> {
  width?: number;
  title: string;
  visible: boolean;
  bodyStyle?: CSSProperties;
  onOk?: () => void;
  onCancel: () => void;
  loading: boolean;
  forwardRef?: any;
}

const ModalForm = ({
  width = 620,
  title,
  visible,
  bodyStyle,
  onOk,
  onCancel,
  onSubmit,
  forwardRef,
  loading,
  ...rest
}: IModalFormProps) => {
  const prepareOk = () => {
    if (forwardRef && onSubmit) {
      const form: WrappedFormUtils = forwardRef.current;
      form.validateFields((err: any, values: any) => {
        if (err) {
          return;
        }
        onSubmit(values);
      });
    }
    onOk && onOk();
  };

  return (
    <Modal
      width={width}
      okButtonProps={{ loading, htmlType: 'submit' }}
      visible={visible}
      title={title}
      bodyStyle={bodyStyle}
      onOk={prepareOk}
      onCancel={onCancel}
    >
      <BaseFormWrap {...rest} ref={forwardRef} />
    </Modal>
  );
};

export default React.forwardRef<any, IModalFormProps>((props, ref) => (
  <ModalForm forwardRef={ref} {...props} />
));
