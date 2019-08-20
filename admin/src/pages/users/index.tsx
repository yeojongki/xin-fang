import React, { Component } from 'react';
import { Table } from 'antd';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { StateType } from './model';
import { ColumnProps } from 'antd/lib/table';

const DEFAULT_PAGE_SIZE = 5;

interface UsersProps {
  dispatch: Dispatch<any>;
  fetching: boolean;
  usersManage: StateType;
}

export interface IPaginationParams {
  take: number;
  skip: number;
}

interface UsersState {
  pagination: IPaginationParams;
  selectedRowKeys: string[];
}

export interface IUser {
  id: string;
  createdAt: Date;
  username: string;
  password: string;
  email: string;
  mobile: string;
  gender: number;
  avatar: string;
  roles: any[];
}

const columns: ColumnProps<IUser>[] = [
  {
    key: 'id',
    dataIndex: 'id',
    title: 'id',
  },
  {
    key: 'username',
    dataIndex: 'username',
    title: '用户名',
  },
  {
    key: 'createdAt',
    dataIndex: 'createdAt',
    title: '创建时间',
  },
];

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
    pagination: { take: DEFAULT_PAGE_SIZE, skip: 0 },
    selectedRowKeys: [],
  };

  componentDidMount() {
    const { pagination } = this.state;
    this.fetchUsers(pagination);
  }

  onSelectChange = (selectedRowKeys: any) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  setPaginationParams = (pagination: IPaginationParams, callback: () => void) => {
    this.setState({ pagination }, callback);
  };

  fetchUsers = (pagination: IPaginationParams) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'usersManage/getList',
      payload: pagination,
    });
  };

  render() {
    const { usersManage, fetching } = this.props;
    const { selectedRowKeys } = this.state;
    const { list, pagination } = usersManage;
    const paginationParam = this.state.pagination;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    return (
      <Table
        rowKey={record => record.id}
        rowSelection={rowSelection}
        loading={fetching}
        pagination={{
          showSizeChanger: true,
          showQuickJumper: true,
          defaultCurrent: 1,
          ...pagination,
          current: pagination.current + 1,
          pageSizeOptions: ['5', '10', '20', '30', '40'],
        }}
        onChange={({ pageSize, current }) => {
          this.setPaginationParams(
            {
              ...paginationParam,
              take: pageSize ? +pageSize : DEFAULT_PAGE_SIZE,
              skip: current! - 1,
            },
            () => {
              this.fetchUsers(this.state.pagination);
            },
          );
        }}
        columns={columns}
        dataSource={list}
      />
    );
  }
}

export default Users;
