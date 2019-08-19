import React, { Component } from 'react';
// import { Table } from 'antd';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { StateType } from './model';

interface UsersProps {
  dispatch: Dispatch<any>;
  fetching: boolean;
  usersManage: StateType;
}

interface UsersState {
  pagination: IPagination;
}

export interface IPagination {
  skip: number;
  take: number;
}

@connect(
  ({
    usersManage,
    loading,
  }: {
    usersManage: StateType;
    loading: {
      effects: {
        [key: string]: string;
      };
    };
  }) => ({ usersManage, fetching: loading.effects['usersManage/getList'] }),
)
class Users extends Component<UsersProps, UsersState> {
  state: UsersState = {
    pagination: {
      skip: 0,
      take: 20,
    },
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const { pagination } = this.state;
    dispatch({
      type: 'usersManage/getList',
      payload: pagination,
    });
  }

  render() {
    const { usersManage, fetching } = this.props;
    const { list } = usersManage;
    console.log(list, fetching);
    return <div />;
  }
}

export default Users;
