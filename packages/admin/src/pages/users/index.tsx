import React, { Component } from 'react';
import { Table, Popconfirm, Alert, Divider } from 'antd';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { ColumnProps } from 'antd/lib/table';
import { IUser } from '@xf/common/interfaces/user.interfaces';
import { IPagination } from '@xf/common/interfaces/pagination.interface';
// import { page } from '@xf/common/constants/pagination.const';
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

interface UsersState {
  selectedRowKeys: string[];
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
        <>
          <a>编辑</a>
          <Divider type="vertical" />
          <Popconfirm title="确定删除吗?" onConfirm={() => this.handleDeleteUser(record.id)}>
            <a>删除</a>
          </Popconfirm>
        </>
      ),
    },
  ];

  state: UsersState = {
    selectedRowKeys: [],
  };

  componentDidMount() {
    this.fetchUsers();
  }

  onSelectChange = (selectedRowKeys: any) => {
    this.setState({ selectedRowKeys });
  };

  setPaginationChange({ pageSize, current }: Partial<IPagination>) {
    const params: Partial<IPagination> = {
      pageSize: pageSize ? +pageSize : DEFAULT_PAGE_SIZE,
      current: (current as number) - 1,
    };
    this.fetchUsers(params);
  }

  fetchUsers = (pagination: Partial<IPagination> = { pageSize: DEFAULT_PAGE_SIZE, current: 0 }) => {
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
          this.fetchUsers();
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
          this.fetchUsers();
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
          <Alert
            message={
              <>
                <span>当前选中 {selectedRowKeys.length} 位用户</span>{' '}
                {hasSelected ? (
                  <Popconfirm title="确定删除吗?" onConfirm={() => this.deleteSelectedUsers()}>
                    <a style={{ marginLeft: '20px' }}>删除选中</a>
                  </Popconfirm>
                ) : null}
              </>
            }
            type="info"
            showIcon
          />
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
