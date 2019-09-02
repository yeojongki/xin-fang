import React, { useCallback, useRef } from 'react';
import { IRole } from '@xf/common/src/interfaces/role.interfaces';
import { DEFAULT_PAGE_SIZE } from '@xf/common/src/constants/pagination.const';
import DEFALT_ROLES from '@xf/common/src/constants/roles.const';
import { IPagination } from '@xf/common/src/interfaces/pagination.interface';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { ColumnProps } from 'antd/lib/table';
import { TIDs } from '@xf/common/src/interfaces/id.interface';
import create, { IResetSelectedFn } from '@/components/StandardTable';
import { IRoleStateType } from './model';

interface IRoleListProps {
  dispatch: Dispatch<any>;
  role: IRoleStateType;
  loading: boolean;
}

const RoleTable = create<IRole>();

const RoleList: React.FC<IRoleListProps> = ({ dispatch, loading, role: { pagination, list } }) => {
  const tableRef = useRef<IResetSelectedFn | null>(null);

  const fetchList = useCallback(
    (payload: Partial<IPagination> = { pageSize: DEFAULT_PAGE_SIZE, current: 1 }) => {
      dispatch({
        type: 'role/getList',
        payload,
      });
    },
    [pagination],
  );

  const handleDeleteRoles = (rows: IRole | TIDs) => {
    const ids = Array.isArray(rows) ? rows : [rows.id];
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

  const handleEditRole = (role: IRole): void => {
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
    <>
      <RoleTable
        columns={columns}
        ref={tableRef}
        // getCheckboxProps={record=>  }
        rowKey={record => record.id}
        loading={loading}
        pagination={pagination}
        fetchList={fetchList}
        dataSource={list}
        onDeleteRow={handleDeleteRoles}
        onDeleteSelected={handleDeleteRoles}
        getCheckboxProps={row => ({ disabled: DEFALT_ROLES.includes(row.token) })}
        onEditRow={handleEditRole}
      />
    </>
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
