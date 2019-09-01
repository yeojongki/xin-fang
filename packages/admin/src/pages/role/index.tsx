import React, { useCallback, useRef } from 'react';
// import { Table, Popconfirm, Card, Divider, Button } from 'antd';
import { IRole } from '@xf/common/src/interfaces/role.interfaces';
import { DEFAULT_PAGE_SIZE } from '@xf/common/src/constants/pagination.const';
import { IPagination } from '@xf/common/src/interfaces/pagination.interface';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { ColumnProps } from 'antd/lib/table';
import { TIDs } from '@xf/common/src/interfaces/id.interface';
import StandardTable from '@/components/StandardTable';
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

  const tableRef = useRef<any>();

  const fetchList = useCallback(
    (payload: Partial<IPagination> = { pageSize: DEFAULT_PAGE_SIZE, current: 1 }) => {
      dispatch({
        type: 'role/getList',
        payload,
      });
    },
    [pagination],
  );

  const handleDeleteRoles = (ids: TIDs) => {
    dispatch({
      type: 'role/deleteRoles',
      payload: {
        ids,
        callback: () => {
          const { current } = tableRef;
          current && current.resetSelected();
          fetchList();
        },
      },
    });
  };

  const handleEditRole = (role: IRole) => {
    console.log('edit row', role);
  };

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
  ];

  return (
    <StandardTable
      ref={tableRef}
      rowKey={record => record.id}
      loading={loading}
      columns={columns}
      pagination={pagination}
      fetchList={fetchList}
      dataSource={list}
      onDeleteRow={handleDeleteRoles}
      onDeleteSelected={handleDeleteRoles}
      onEditRow={handleEditRole}
    />
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
