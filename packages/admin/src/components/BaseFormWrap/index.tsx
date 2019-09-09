import React, { forwardRef, memo, Ref, ReactNode } from 'react';
import { Form } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { FormLayout } from 'antd/es/form/Form';
import { TKeyStringObj } from '@xf/common/src/interfaces/common.interface';
import defaultFormItemLayout from './_defaultFormItemLayout';

export interface IBaseFormWrapProps<V = any> extends FormComponentProps {
  initValue?: V | undefined;
  type: TFormType;
  onSubmit?: (values: V) => void;
  renderItems: (props: TRenderItems<V>) => ReactNode;
  formItemLayout?: IFormItemLayout;
  layout?: FormLayout;
}

export type TRenderItems<T> = Pick<IBaseFormWrapProps<T>, 'initValue' | 'form' | 'type'> &
  TKeyStringObj;

/**
 * 表单项的布局
 * @see https://ant.design/components/grid/#Col
 */
export interface IFormItemLayout {
  labelCol: TKeyStringObj;
  wrapperCol: TKeyStringObj;
}

export type TFormType = 'create' | 'edit' | 'query';

const BaseFormWrap = (props: IBaseFormWrapProps, ref: Ref<any>) => {
  const {
    form,
    type,
    onSubmit,
    renderItems,
    formItemLayout,
    initValue,
    layout = type === 'query' ? 'inline' : 'horizontal',
  } = props;

  // set formItem layout
  let finalFormItemLayout: IFormItemLayout;
  if (formItemLayout) {
    finalFormItemLayout = formItemLayout;
  } else {
    finalFormItemLayout = defaultFormItemLayout;
  }

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
      {...finalFormItemLayout}
      layout={layout}
      ref={ref}
    >
      {renderItems({ initValue, form, type })}
    </Form>
  );
};

export default memo(Form.create<IBaseFormWrapProps>()(forwardRef(BaseFormWrap)));
