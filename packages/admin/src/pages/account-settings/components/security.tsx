import React, { Fragment, FC, useState, useRef } from 'react';
import { List, Input, Button } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { Dispatch } from 'redux';
import { MOBILE_REG } from '@xf/common/src/constants/validation.const';
import { CurrentUser } from '@/models/user';
import ModalForm from '@/components/BaseFormWrap/ModalForm';
import { TRenderItems } from '@/components/BaseFormWrap';
import { useInterval } from '@/hooks';

type Unpacked<T> = T extends (infer U)[] ? U : T;
// const passwordStrength = {
//   strong: <span className="strong">强</span>,
//   medium: <span className="medium">中</span>,
//   weak: <span className="weak">弱 Weak</span>,
// };

interface IProps {
  dispatch: Dispatch<any>;
  currentUser: CurrentUser;
  editing: boolean;
}

const SecurityView: FC<IProps> = ({ currentUser, editing, dispatch }) => {
  const { email, mobile } = currentUser;
  const encodeEmail = email ? `已绑定邮箱：${email.replace(/^(\w{0,4})/, '****')}` : '';
  const encodeMobile = mobile
    ? `已绑定手机：${mobile.replace(/^(\d{3})(.{4})(\d{4})$/, '$1****$3')}`
    : '';

  // for edit email
  const [editEmailVisible, setEditEmailVisible] = useState<boolean>(false);
  const editEmailRef = useRef<any>();

  // for send countdown
  const COUNTDOWN_TIME = 60;
  const [isCountdown, setIsCountdown] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(COUNTDOWN_TIME);

  useInterval(
    () => {
      setCountdown(countdown - 1);
      if (countdown <= 1) {
        setIsCountdown(false);
      }
    },
    isCountdown ? 1000 : null,
  );

  const getEmailVerifyCode = (emailAddr: string) => {
    dispatch({
      type: 'user/getEmailVerifyCode',
      payload: {
        email: emailAddr,
        callback: () => {
          setIsCountdown(true);
        },
      },
    });
  };
  const renderBindEmail = (props: TRenderItems<{ id: string; email: string }>) => {
    const { initValue, form } = props;
    const { getFieldDecorator } = form;
    return (
      <>
        <FormItem style={{ marginBottom: 0 }}>
          {getFieldDecorator('id', {
            initialValue: initValue ? initValue.id : '',
          })(<Input hidden readOnly />)}
        </FormItem>
        <FormItem label="邮箱">
          {getFieldDecorator('email', {
            initialValue: initValue ? initValue.email : '',
            rules: [
              { required: true, message: '请输入邮箱!' },
              {
                type: 'email',
                message: '邮箱格式不正确!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            disabled={isCountdown}
            onClick={() => getEmailVerifyCode(form.getFieldValue('email'))}
          >
            {isCountdown ? `剩余${countdown}s` : '发送验证码'}
          </Button>
        </FormItem>
        <FormItem label="验证码">
          {getFieldDecorator('verifyCode', {
            rules: [{ required: true, message: '请输入验证码!' }],
          })(<Input />)}
        </FormItem>
      </>
    );
  };

  // for edit mobile
  const [editMobileVisible, setEditMobileVisible] = useState<boolean>(false);
  const editMobileRef = useRef<any>();
  const renderBindMobile = (props: TRenderItems<{ id: string; mobile: string }>) => {
    const { initValue, form } = props;
    const { getFieldDecorator } = form;
    return (
      <>
        <FormItem style={{ marginBottom: 0 }}>
          {getFieldDecorator('id', {
            initialValue: initValue ? initValue.id : '',
          })(<Input hidden readOnly />)}
        </FormItem>
        <FormItem label="手机号">
          {getFieldDecorator('mobile', {
            initialValue: initValue ? initValue.mobile : '',
            rules: [
              { required: true, message: '请输入手机号!' },
              {
                pattern: MOBILE_REG,
                message: '手机号格式错误！',
              },
            ],
          })(<Input />)}
        </FormItem>
      </>
    );
  };

  const submitEditForm = (values: any, setVisibleFn: (visible: boolean) => void) => {
    dispatch({
      type: 'user/update',
      payload: {
        values,
        callback: () => {
          dispatch({
            type: 'user/fetchCurrent',
          });
          setVisibleFn(false);
        },
      },
    });
  };

  const getData = () => [
    {
      title: '我的手机',
      description: encodeMobile || '未绑定手机',
      actions: [
        <a key="Modify" onClick={() => setEditMobileVisible(true)}>
          {encodeMobile ? '修改' : '去绑定'}
        </a>,
      ],
    },
    // {
    //   title: '密保问题',
    //   description: '未设置密保问题，密保问题可有效保护账户安全',
    //   actions: [<a key="Set">设置</a>],
    // },
    {
      title: '我的邮箱',
      description: encodeEmail || '未绑定邮箱',
      actions: [
        <a key="Modify" onClick={() => setEditEmailVisible(true)}>
          {encodeEmail ? '修改' : '去绑定'}
        </a>,
      ],
    },
  ];

  const data = getData();
  return (
    <Fragment>
      <List<Unpacked<typeof data>>
        itemLayout="horizontal"
        dataSource={data}
        renderItem={item => (
          <List.Item actions={item.actions}>
            <List.Item.Meta title={item.title} description={item.description} />
          </List.Item>
        )}
      />
      <ModalForm
        layout="inline"
        width={500}
        title="绑定邮箱"
        type="edit"
        renderItems={renderBindEmail}
        loading={editing}
        ref={editEmailRef}
        initValue={currentUser}
        visible={editEmailVisible}
        onCancel={() => setEditEmailVisible(false)}
        onSubmit={values => submitEditForm(values, setEditEmailVisible)}
      />
      <ModalForm
        width={400}
        title="绑定手机"
        type="edit"
        renderItems={renderBindMobile}
        loading={editing}
        ref={editMobileRef}
        initValue={currentUser}
        visible={editMobileVisible}
        onCancel={() => setEditMobileVisible(false)}
        onSubmit={values => submitEditForm(values, setEditMobileVisible)}
      />
    </Fragment>
  );
};

export default SecurityView;
