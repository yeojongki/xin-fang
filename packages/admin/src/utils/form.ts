import { MutableRefObject } from 'react';
import { WrappedFormUtils } from 'antd/es/form/Form';
import { TKeyStringObj } from '@xf/common/src/interfaces/common.interface';

export const generateField = (obj: TKeyStringObj) => {
  const result: TKeyStringObj = {};
  Object.keys(obj).forEach(key => {
    result[key] = {
      value: obj[key],
    };
  });
  return result;
};

export const getForm = (_form: MutableRefObject<any>) => _form.current as WrappedFormUtils;
