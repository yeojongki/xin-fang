import { Button, Form, Input, Select, Upload, message } from 'antd';
import React, { Component, Fragment } from 'react';
import { FormComponentProps } from 'antd/es/form';
import { connect } from 'dva';
import GeographicView from './GeographicView';
// import PhoneView from './PhoneView';
import styles from './BaseView.less';
import { CurrentUser } from '@/models/user';
import DefaultAvatar from '@/assets/logo.svg';
import { OSS_PREFIX } from '@/config';

const FormItem = Form.Item;
const { Option } = Select; // 头像组件 方便以后独立，增加裁剪之类的功能

const AvatarView = ({ avatar }: { avatar: string }) => (
  <Fragment>
    <div className={styles.avatar_title}>头像</div>
    <div className={styles.avatar}>
      <img src={avatar} alt="avatar" />
    </div>
    <Upload fileList={[]}>
      <div className={styles.button_view}>
        <Button icon="upload">更换头像</Button>
      </div>
    </Upload>
  </Fragment>
);

interface SelectItem {
  label: string;
  key: string;
}

const validatorGeographic = (
  _: any,
  value: {
    province: SelectItem;
    city: SelectItem;
  },
  callback: (message?: string) => void,
) => {
  const { province, city } = value;

  if (!province.key) {
    callback('Please input your province!');
  }

  if (!city.key) {
    callback('Please input your city!');
  }

  callback();
};

const validatorPhone = (rule: any, value: string, callback: (message?: string) => void) => {
  const values = value.split('-');

  if (!values[0]) {
    callback('Please input your area code!');
  }

  if (!values[1]) {
    callback('Please input your phone number!');
  }

  callback();
};

interface BaseViewProps extends FormComponentProps {
  currentUser?: CurrentUser;
}

@connect(({ user }: { user: { currentUser: CurrentUser } }) => ({
  currentUser: user.currentUser,
}))
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
    const { form } = this.props;
    form.validateFields(err => {
      if (!err) {
        message.success('更新基本信息成功');
      }
    });
  };

  render() {
    const {
      currentUser = {},
      form: { getFieldDecorator },
    } = this.props;
    return (
      <div className={styles.baseView} ref={this.getViewDom}>
        <div className={styles.left}>
          <Form layout="vertical" hideRequiredMark>
            <FormItem label="邮箱">
              {getFieldDecorator('email', {
                initialValue: currentUser.email,
                rules: [
                  {
                    required: true,
                    message: '请输入您的邮箱!',
                  },
                ],
              })(<Input />)}
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
            <FormItem label="个人简介">
              {getFieldDecorator('selfDesc', {
                initialValue: currentUser.selfDesc,
                rules: [
                  {
                    required: true,
                    message: '请输入个人简介!',
                  },
                ],
              })(<Input.TextArea placeholder="个人简介" rows={4} />)}
            </FormItem>
            <FormItem label="国家/地区">
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
            </FormItem>
            <FormItem label="所在省市">
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
            <FormItem label="街道地址">
              {getFieldDecorator('address', {
                rules: [
                  {
                    required: true,
                    message: '请输入您的街道地址!',
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem label="联系电话">
              {getFieldDecorator('mobile', {
                initialValue: currentUser.mobile,
                rules: [
                  {
                    required: true,
                    message: '请输入您的联系电话!',
                  },
                  {
                    validator: validatorPhone,
                  },
                ],
              })(<Input />)}
              {/* })(<PhoneView />)} */}
            </FormItem>
            <Button type="primary" onClick={this.handlerSubmit}>
              更新基本信息
            </Button>
          </Form>
        </div>
        <div className={styles.right}>
          <AvatarView
            avatar={currentUser.avatar ? OSS_PREFIX + currentUser.avatar : DefaultAvatar}
          />
        </div>
      </div>
    );
  }
}

export default Form.create<BaseViewProps>()(BaseView);
