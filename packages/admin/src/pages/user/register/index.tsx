import { Button, Form, Input, Popover, Progress, message } from 'antd';
import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import Link from 'umi/link';
import { connect } from 'dva';
import router from 'umi/router';
import { StateType } from './model';
import styles from './style.less';
import { Md5 } from '@/utils';

const FormItem = Form.Item;
const passwordStatusMap = {
  ok: <div className={styles.success}>密码强度：强</div>,
  pass: <div className={styles.warning}>密码强度：中</div>,
  poor: <div className={styles.error}>密码强度：太短</div>,
};
const passwordProgressMap: {
  ok: 'success';
  pass: 'normal';
  poor: 'exception';
} = {
  ok: 'success',
  pass: 'normal',
  poor: 'exception',
};
interface RegisterProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  userRegister: StateType;
  submitting: boolean;
}
interface RegisterState {
  // count: number;
  confirmDirty: boolean;
  showPwdTips: boolean;
  // prefix: string;
}
export interface UserRegisterParams {
  username: string;
  password: string;
  confirm: string;
  // mobile: string;
  // captcha: string;
  // prefix: string;
}

@connect(
  ({
    userRegister,
    loading,
  }: {
    userRegister: StateType;
    loading: { effects: { [key: string]: string } };
  }) => ({
    userRegister,
    submitting: loading.effects['userRegister/submit'],
  }),
)
class Register extends Component<RegisterProps, RegisterState> {
  state: RegisterState = {
    // count: 0,
    confirmDirty: false,
    showPwdTips: false,
    // prefix: '86',
  };

  interval: number | undefined = undefined;

  componentDidUpdate() {
    const { userRegister, form } = this.props;
    const account = form.getFieldValue('username');
    if (userRegister.errno === 0) {
      message.success('注册成功！');
      router.replace({
        pathname: '/user/register-result',
        state: {
          account,
        },
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  // onGetCaptcha = () => {
  //   let count = 59;
  //   this.setState({
  //     count,
  //   });
  //   this.interval = window.setInterval(() => {
  //     count -= 1;
  //     this.setState({
  //       count,
  //     });

  //     if (count === 0) {
  //       clearInterval(this.interval);
  //     }
  //   }, 1000);
  // };

  getPasswordStatus = () => {
    const { form } = this.props;
    const value = form.getFieldValue('password');

    if (value && value.length > 9) {
      return 'ok';
    }

    if (value && value.length > 5) {
      return 'pass';
    }

    return 'poor';
  };

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { form, dispatch } = this.props;
    form.validateFields(
      {
        force: true,
      },
      (err, values: UserRegisterParams) => {
        if (!err) {
          const { password, username } = values;
          dispatch({
            type: 'userRegister/submit',
            payload: { password: Md5(password), username },
          });
        }
      },
    );
  };

  checkConfirm = (rule: any, value: string, callback: (messgae?: string) => void) => {
    const { form } = this.props;

    if (value && value !== form.getFieldValue('password')) {
      callback('两次输入的密码不匹配!');
    } else {
      callback();
    }
  };

  checkPassword = (rule: any, value: string, callback: (messgae?: string) => void) => {
    const { showPwdTips, confirmDirty } = this.state;

    if (!value) {
      this.setState({
        showPwdTips: true,
      });
      callback('请输入密码!');
    } else {
      if (!showPwdTips) {
        this.setState({
          showPwdTips: true,
        });
      }

      if (value.length < 6) {
        callback('请输入至少6位密码!');
      } else {
        const { form } = this.props;

        if (value && confirmDirty) {
          form.validateFields(['confirm'], {
            force: true,
          });
        }

        callback();
      }
    }
  };

  // changePrefix = (value: string) => {
  //   this.setState({
  //     prefix: value,
  //   });
  // };

  renderPasswordProgress = () => {
    const { form } = this.props;
    const value = form.getFieldValue('password');
    const passwordStatus = this.getPasswordStatus();
    return value && value.length ? (
      <div className={styles[`progress-${passwordStatus}`]}>
        <Progress
          status={passwordProgressMap[passwordStatus]}
          className={styles.progress}
          strokeWidth={6}
          percent={value.length * 10 > 100 ? 100 : value.length * 10}
          showInfo={false}
        />
      </div>
    ) : null;
  };

  handlePasswoldBlur = () => {
    if (this.getValidPasswoldValue()) {
      this.setState({
        showPwdTips: false,
      });
    }
  };

  handlePasswoldFocus = () => {
    // if invalid value show helper
    const value = this.getPasswoldValue();
    if (value && (value as string).length) {
      this.setState({
        showPwdTips: true,
      });
    }
  };

  /**
   * 返回长度大于6的密码
   * @memberof Register
   */
  getValidPasswoldValue = (): string | undefined => {
    const value = this.getPasswoldValue();
    if (value && (value as string).length >= 6) {
      return value;
    }
    return undefined;
  };

  /**
   * 返回密码
   * @memberof Register
   */
  getPasswoldValue = (): string | undefined => {
    const { form } = this.props;
    const value = form.getFieldValue('password');
    return value;
  };

  render() {
    const { form, submitting } = this.props;
    const { getFieldDecorator } = form;
    const { showPwdTips } = this.state;
    const enteredPasswold = this.getPasswoldValue();

    return (
      <div className={styles.main}>
        <h3>注册</h3>
        <Form onSubmit={this.handleSubmit}>
          <FormItem hasFeedback>
            {getFieldDecorator('username', {
              rules: [
                {
                  required: true,
                  message: '请输入用户名！',
                },
              ],
            })(<Input size="large" maxLength={16} placeholder="用户名" />)}
          </FormItem>
          <FormItem hasFeedback>
            <Popover
              getPopupContainer={node => {
                if (node && node.parentNode) {
                  return node.parentNode as HTMLElement;
                }
                return node;
              }}
              content={
                <div
                  style={{
                    padding: '4px 0',
                  }}
                >
                  {passwordStatusMap[this.getPasswordStatus()]}
                  {this.renderPasswordProgress()}
                  <div
                    style={{
                      marginTop: 10,
                    }}
                  >
                    当前已输入{(enteredPasswold && enteredPasswold.length) || 0}个字符
                  </div>
                </div>
              }
              overlayStyle={{
                width: 240,
              }}
              placement="right"
              visible={showPwdTips}
            >
              {getFieldDecorator('password', {
                rules: [
                  {
                    validator: this.checkPassword,
                  },
                ],
              })(<Input.Password size="large" maxLength={16} placeholder="至少6位密码" />)}
            </Popover>
          </FormItem>
          <FormItem hasFeedback>
            {getFieldDecorator('confirm', {
              rules: [
                {
                  required: true,
                  message: '请输入确认密码！',
                },
                {
                  validator: this.checkConfirm,
                },
              ],
            })(
              <Input.Password size="large" maxLength={16} type="password" placeholder="确认密码" />,
            )}
          </FormItem>
          <FormItem>
            <Button
              size="large"
              loading={submitting}
              className={styles.submit}
              type="primary"
              htmlType="submit"
            >
              注册
            </Button>
            <Link className={styles.login} to="/user/login">
              使用已有账户登录
            </Link>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Form.create<RegisterProps>()(Register);
