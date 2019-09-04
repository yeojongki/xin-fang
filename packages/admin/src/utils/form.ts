import { MutableRefObject } from 'react';
import { WrappedFormUtils } from 'antd/es/form/Form';

type TStringKeyObject = Record<string, any>;

export const generateField = (obj: TStringKeyObject) => {
  const result: TStringKeyObject = {};
  Object.keys(obj).forEach(key => {
    result[key] = {
      value: obj[key],
    };
  });
  return result;
};

export const getForm = (_form: MutableRefObject<any>) => _form.current as WrappedFormUtils;
