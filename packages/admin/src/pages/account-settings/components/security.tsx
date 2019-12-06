import React, { Fragment, FC } from 'react';
import { List } from 'antd';
import { Dispatch } from 'redux';
import { CurrentUser } from '@/models/user';

type Unpacked<T> = T extends (infer U)[] ? U : T;
// const passwordStrength = {
//   strong: <span className="strong">强</span>,
//   medium: <span className="medium">中</span>,
//   weak: <span className="weak">弱 Weak</span>,
// };

interface IProps {
  dispatch: Dispatch<any>;
  currentUser: CurrentUser;
}

const SecurityView: FC<IProps> = ({ currentUser, dispatch }) => {
  const { email, mobile } = currentUser;
  const encodeEmail = email ? `${email.substring(0, 3)}***${email.substring(4)}` : '';
  const encodeMobile = mobile ? `${mobile.substring(0, 3)}****${mobile.substring(7)}` : '';
  const getData = () => [
    {
      title: '我的手机',
      description: encodeMobile || '未绑定手机',
      actions: [<a key="Modify">修改</a>],
    },
    // {
    //   title: '密保问题',
    //   description: '未设置密保问题，密保问题可有效保护账户安全',
    //   actions: [<a key="Set">设置</a>],
    // },
    {
      title: '我的邮箱',
      description: encodeEmail || '未绑定邮箱',
      actions: [<a key="Modify">修改</a>],
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
    </Fragment>
  );
};

export default SecurityView;
