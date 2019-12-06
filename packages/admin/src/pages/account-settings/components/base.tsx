import { Button, Form, Input, Radio } from 'antd';
import React, { Component } from 'react';
import { FormComponentProps } from 'antd/es/form';
// import { MOBILE_REG } from '@xf/common/src/constants/validation.const';
import { Dispatch } from 'redux';
import { Gender } from '@xf/common/src/constants/gender.const';
// import GeographicView from './GeographicView';
// import PhoneView from './PhoneView';
import styles from './BaseView.less';
import { CurrentUser } from '@/models/user';
import { IUploadFile, PicturesWall } from '@/components/PicturesWall';
import { OSS_PREFIX } from '@/config';
import { getUploadImgs, getFileList } from '@/components/PicturesWall/utils';

const FormItem = Form.Item;
// const { Option } = Select;

// interface SelectItem {
//   label: string;
//   key: string;
// }

// const validatorGeographic = (
//   _: any,
//   value: {
//     province: SelectItem;
//     city: SelectItem;
//   },
//   callback: (message?: string) => void,
// ) => {
//   const { province, city } = value;

//   if (!province.key) {
//     callback('Please input your province!');
//   }

//   if (!city.key) {
//     callback('Please input your city!');
//   }

//   callback();
// };

// const validatorPhone = (rule: any, value: string, callback: (message?: string) => void) => {
//   const values = value.split('-');

//   if (!values[0]) {
//     callback('Please input your area code!');
//   }

//   if (!values[1]) {
//     callback('Please input your phone number!');
//   }

//   callback();
// };

interface BaseViewProps extends FormComponentProps {
  currentUser?: CurrentUser;
  dispatch: Dispatch<any>;
  editing: boolean;
}

class BaseView extends Component<BaseViewProps> {
  view: HTMLDivElement | undefined = undefined;

  componentDidMount() {
    this.setBaseInfo();
  }

  setBaseInfo = () => {
    const { currentUser, form } = this.props;

    if (currentUser) {
      Object.keys(form.getFieldsValue()).forEach(key => {
        const obj = {};
        obj[key] = currentUser[key] || null;
        form.setFieldsValue(obj);
      });
    }
  };

  getViewDom = (ref: HTMLDivElement) => {
    this.view = ref;
  };

  handlerSubmit = (event: React.MouseEvent) => {
    event.preventDefault();
    const { dispatch } = this.props;
    const { form } = this.props;
    form.validateFields(err => {
      if (!err) {
        const values = form.getFieldsValue();
        const avatar =
          typeof values.avatar === 'string' ? values.avatar : getUploadImgs(values.avatar)[0];
        dispatch({
          type: 'user/update',
          payload: {
            values: { ...values, avatar },
            callback: () => {
              dispatch({
                type: 'user/fetchCurrent',
              });
            },
          },
        });
      }
    });
  };

  getUploadFileUrls = (fileList: IUploadFile[]): IUploadFile[] => fileList;

  getFileList = (e: string | undefined | IUploadFile[]) => {
    const { currentUser = {} } = this.props;
    if (e && typeof e === 'string') {
      return [
        {
          response: { result: { filename: currentUser.avatar } },
          status: 'done',
          url: OSS_PREFIX + currentUser.avatar,
          name: currentUser.avatar,
          uid: currentUser.avatar,
          size: 0,
          type: 'image',
        },
      ];
    }
    return [];
  };

  render() {
    const {
      editing,
      currentUser = {},
      form: { getFieldDecorator },
    } = this.props;

    return (
      <Form layout="vertical">
        <div className={styles.baseView} ref={this.getViewDom}>
          <div className={styles.left}>
            <FormItem
              label="id"
              style={{ height: 0, overflow: 'hidden', padding: 0, marginBottom: 0 }}
            >
              {getFieldDecorator('id', {
                initialValue: currentUser.id,
              })(<Input hidden />)}
            </FormItem>
            <FormItem label="昵称">
              {getFieldDecorator('username', {
                initialValue: currentUser.username,
                rules: [
                  {
                    required: true,
                    message: '请输入您的昵称!',
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem label="性别">
              {getFieldDecorator('gender', {
                rules: [
                  {
                    required: true,
                    message: '请选择您的性别!',
                  },
                ],
              })(
                <Radio.Group>
                  <Radio value={Gender.MALE}>男</Radio>
                  <Radio value={Gender.FEMALE}>女</Radio>
                </Radio.Group>,
              )}
            </FormItem>

            {/* <FormItem label="邮箱">
              {getFieldDecorator('email', {
                initialValue: currentUser.email,
                rules: [
                  {
                    type: 'email',
                    message: '邮箱格式不正确!',
                  },
                ],
              })(<Input />)}
            </FormItem> */}
            <FormItem label="个人简介">
              {getFieldDecorator('selfDesc', {
                initialValue: currentUser.selfDesc,
              })(<Input.TextArea placeholder="个人简介" rows={4} />)}
            </FormItem>
            {/* <FormItem label="国家/地区">
              {getFieldDecorator('country', {
                rules: [
                  {
                    required: true,
                    message: '请输入您的国家或地区!',
                  },
                ],
              })(
                <Select
                  style={{
                    maxWidth: 220,
                  }}
                >
                  <Option value="China">中国</Option>
                </Select>,
              )}
            </FormItem> */}
            {/* <FormItem label="所在省市">
              {getFieldDecorator('geographic', {
                rules: [
                  {
                    required: true,
                    message: '请输入您的所在省市!',
                  },
                  {
                    validator: validatorGeographic,
                  },
                ],
              })(<GeographicView />)}
            </FormItem>
            <FormItem label="街道地址">{getFieldDecorator('address', {})(<Input />)}</FormItem> */}
            {/* <FormItem label="联系电话">
              {getFieldDecorator('mobile', {
                initialValue: currentUser.mobile,
                rules: [
                  {
                    validator: (_, value, callback: Function) => {
                      if (value === '' || value === null || value === undefined) {
                        callback();
                        return;
                      }
                      const result = MOBILE_REG.test(value);
                      if (!result) {
                        callback('手机号格式不正确!');
                        return;
                      }
                      callback();
                    },
                  },
                ],
              })(<Input />)}
            </FormItem> */}
            <Button type="primary" loading={editing} onClick={this.handlerSubmit}>
              更新基本信息
            </Button>
          </div>
          <div className={styles.right}>
            <FormItem label="头像">
              {getFieldDecorator('avatar', {
                rules: [{ required: true, message: '头像不能为空!' }],
                initialValue: getFileList(currentUser.avatar),
                valuePropName: 'fileList',
                getValueFromEvent: this.getUploadFileUrls,
              })(<PicturesWall dir="avatar" previewWidth="500px" maxLength={1} />)}
            </FormItem>
          </div>
        </div>
      </Form>
    );
  }
}

export default Form.create<BaseViewProps>()(BaseView);
