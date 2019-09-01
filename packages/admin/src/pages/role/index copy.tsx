import React, { useEffect, useCallback } from 'react';
import { Table, Popconfirm, Card, Divider, Button } from 'antd';
import { IRole } from '@xf/common/src/interfaces/role.interfaces';
import { DEFAULT_PAGE_SIZE, DEFAULT_PAGE_OPTIONS } from '@xf/common/src/constants/pagination.const';
import { IPagination } from '@xf/common/src/interfaces/pagination.interface';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { ColumnProps } from 'antd/lib/table';
import { IRoleStateType } from './model';

interface IRoleListProps {
  dispatch: Dispatch<any>;
  role: IRoleStateType;
  loading: boolean;
}

const RoleList = (props: IRoleListProps) => {
  // const [list, setList] = useState<IRole[]>([]);
  // const [pageSize, setPageSize] = useState<number>(DEFAULT_PAGE_SIZE);
  // const [current, setCurrent] = useState<number>(1);
  // const [total, setTotal] = useState<number>();
  // const [loading, setLoading] = useState<boolean>(false);

  const {
    dispatch,
    loading,
    role: { pagination, list },
  } = props;

  const fetchList = useCallback(
    (payload: Partial<IPagination> = { pageSize: DEFAULT_PAGE_SIZE, current: 0 }) => {
      dispatch({
        type: 'role/getList',
        payload,
      });
    },
    [pagination],
  );

  const handleTableChange = ({ pageSize, current }: Partial<IPagination>) => {
    const params: Partial<IPagination> = {
      pageSize: pageSize ? +pageSize : DEFAULT_PAGE_SIZE,
      current: (current as number) - 1,
    };
    fetchList(params);
  };

  useEffect(() => {
    fetchList();
  }, []);

  const columns: ColumnProps<IRole>[] = [
    {
      key: 'id',
      dataIndex: 'id',
      title: 'id',
    },
    {
      key: 'token',
      dataIndex: 'token',
      title: '标识',
    },
    {
      key: 'name',
      dataIndex: 'name',
      title: '名称',
    },
    {
      key: 'desc',
      dataIndex: 'desc',
      title: '描述',
    },
    {
      key: 'operation',
      dataIndex: 'operation',
      title: '操作',
      render: (_, record: IRole) => (
        <>
          <a>编辑</a>
          <Divider type="vertical" />
          <Popconfirm title="确定删除吗?" onConfirm={() => console.log('delete', record.token)}>
            <a>删除</a>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <Card bordered={false}>
      <Button icon="plus" type="primary" style={{ marginBottom: 16 }}>
        新增
      </Button>
      <Table
        rowKey={record => record.id}
        loading={loading}
        pagination={{
          showTotal: total => `共${total}条记录 `,
          showSizeChanger: true,
          showQuickJumper: true,
          defaultCurrent: 1,
          ...pagination,
          current: pagination.current + 1,
          pageSizeOptions: DEFAULT_PAGE_OPTIONS,
        }}
        onChange={handleTableChange}
        columns={columns}
        dataSource={list}
      />
    </Card>
  );
};

export default connect(
  ({
    role,
    loading,
  }: {
    role: IRoleStateType;
    loading: {
      effects: {
        [key: string]: string;
      };
    };
  }) => ({
    role,
    loading: loading.effects['role/getList'],
  }),
)(RoleList);
