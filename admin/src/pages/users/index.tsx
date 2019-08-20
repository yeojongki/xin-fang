import React, { Component } from 'react';
import { Table, Popconfirm } from 'antd';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { StateType } from './model';
import { ColumnProps, PaginationConfig } from 'antd/lib/table';

const DEFAULT_PAGE_SIZE = 20;
const DEFAULT_PAGE_OPTIONS = Array(5)
  .fill(DEFAULT_PAGE_SIZE)
  .map((n, i) => n * (i + 1) + '');

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
  columns: ColumnProps<IUser>[] = [
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
    {
      key: 'operation',
      dataIndex: 'operation',
      title: '操作',
      render: (_, record: IUser) => (
        <Popconfirm title="确定删除吗?" onConfirm={() => this.handleDeleteUser(record.id)}>
          <a>Delete</a>
        </Popconfirm>
      ),
    },
  ];

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

  setPaginationChange({ pageSize, current }: PaginationConfig) {
    const { pagination } = this.state;
    this.setPaginationParams(
      {
        ...pagination,
        take: pageSize ? +pageSize : DEFAULT_PAGE_SIZE,
        skip: current! - 1,
      },
      () => {
        this.fetchUsers(this.state.pagination);
      },
    );
  }

  handleDeleteUser = (id: string) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'usersManage/deleteUser',
      payload: {
        id,
        callback: () => {
          this.fetchUsers(this.state.pagination);
        },
      },
    });
  };

  render() {
    const { columns } = this;
    const { usersManage, fetching } = this.props;
    const { selectedRowKeys } = this.state;
    const { list, pagination } = usersManage;
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
          showTotal: total => `共${total}条记录 `,
          showSizeChanger: true,
          showQuickJumper: true,
          defaultCurrent: 1,
          ...pagination,
          current: pagination.current + 1,
          pageSizeOptions: DEFAULT_PAGE_OPTIONS,
        }}
        onChange={pagination => {
          this.setPaginationChange(pagination);
        }}
        columns={columns}
        dataSource={list}
      />
    );
  }
}

export default Users;
