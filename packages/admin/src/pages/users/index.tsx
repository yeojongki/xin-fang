import React, { Component } from 'react';
import { Table, Popconfirm, Button } from 'antd';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { ColumnProps, PaginationConfig } from 'antd/lib/table';
import { StateType } from './model';

const DEFAULT_PAGE_SIZE = 20;
const DEFAULT_PAGE_OPTIONS = Array(5)
  .fill(DEFAULT_PAGE_SIZE)
  .map((n, i) => `${n * (i + 1)}`);

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
    this.setState({ selectedRowKeys });
  };

  setPaginationParams = (pagination: IPaginationParams, callback: () => void) => {
    this.setState({ pagination }, callback);
  };

  setPaginationChange({ pageSize, current }: PaginationConfig) {
    const { pagination } = this.state;
    this.setPaginationParams(
      {
        ...pagination,
        take: pageSize ? +pageSize : DEFAULT_PAGE_SIZE,
        skip: (current as number) - 1,
      },
      () => {
        this.fetchUsers(this.state.pagination);
      },
    );
  }

  fetchUsers = (pagination: IPaginationParams) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'usersManage/getList',
      payload: pagination,
    });
  };

  handleDeleteUser = (id: string) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'usersManage/deleteUser',
      payload: {
        ids: [id],
        callback: () => {
          this.fetchUsers(this.state.pagination);
        },
      },
    });
  };

  deleteSelectedUsers = () => {
    const { selectedRowKeys } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'usersManage/deleteUser',
      payload: {
        ids: selectedRowKeys,
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
    const hasSelected = selectedRowKeys.length > 0;

    return (
      <>
        <div style={{ marginBottom: 16 }}>
          <Button
            type="danger"
            onClick={this.deleteSelectedUsers}
            disabled={!hasSelected}
            loading={fetching}
          >
            删除选中
          </Button>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `当前选中 ${selectedRowKeys.length} 位用户` : ''}
          </span>
        </div>
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
          onChange={_pagination => {
            this.setPaginationChange(_pagination);
          }}
          columns={columns}
          dataSource={list}
        />
      </>
    );
  }
}

export default Users;
