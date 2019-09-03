import React, { useCallback, useRef, useState } from 'react';
import { IRole } from '@xf/common/src/interfaces/role.interfaces';
import { DEFAULT_PAGE_SIZE } from '@xf/common/src/constants/pagination.const';
import DEFALT_ROLES from '@xf/common/src/constants/roles.const';
import { IPagination } from '@xf/common/src/interfaces/pagination.interface';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { Button } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { WrappedFormUtils } from 'antd/es/form/Form';
import { TIDs } from '@xf/common/src/interfaces/id.interface';
import create, { IResetSelectedFn } from '@/components/StandardTable';
import { IRoleStateType } from './model';
import BaseForm from './components/_baseForm';

interface IRoleListProps {
  dispatch: Dispatch<any>;
  role: IRoleStateType;
  fetching: boolean;
  editing: boolean;
  creating: boolean;
}

const RoleTable = create<IRole>();

const RoleList: React.FC<IRoleListProps> = ({
  dispatch,
  fetching,
  role: { pagination, list },
  editing,
  creating,
}) => {
  const roleTableRef = useRef<IResetSelectedFn | null>(null);

  const fetchList = useCallback(
    (payload: Partial<IPagination> = { pageSize: DEFAULT_PAGE_SIZE, current: 1 }) => {
      dispatch({
        type: 'role/getList',
        payload,
      });
    },
    [pagination],
  );

  // delete
  const handleDeleteRoles = (rows: IRole | TIDs) => {
    const ids = Array.isArray(rows) ? rows : [rows.id];
    dispatch({
      type: 'role/deleteRoles',
      payload: {
        ids,
        callback: () => {
          const { current } = roleTableRef;
          current && current.resetSelected();
          fetchList();
        },
      },
    });
  };

  // edit
  const [editFormVisible, setEditFormVisible] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<IRole>();

  const handleEditRole = (role: IRole): void => {
    setCurrentRow(role);
    setEditFormVisible(true);
  };

  const submitEditForm = values => {
    dispatch({
      type: 'role/update',
      payload: {
        values,
        callback: () => {
          fetchList();
          setEditFormVisible(false);
        },
      },
    });
  };

  // create
  const [createFormVisible, setCreateFormVisible] = useState<boolean>(false);
  const createFormRef = useRef<any>();

  const submitCreateForm = values => {
    dispatch({
      type: 'role/create',
      payload: {
        values,
        callback: () => {
          fetchList();
          setCreateFormVisible(false);
          // reset fields
          const form: WrappedFormUtils = createFormRef.current;
          form.resetFields();
        },
      },
    });
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
      <Button
        icon="plus"
        type="primary"
        style={{ marginBottom: '10px' }}
        onClick={() => {
          setCreateFormVisible(true);
        }}
      >
        新建
      </Button>
      <RoleTable
        columns={columns}
        ref={roleTableRef}
        rowKey={record => record.id}
        loading={fetching}
        pagination={pagination}
        fetchList={fetchList}
        dataSource={list}
        onDeleteRow={handleDeleteRoles}
        onDeleteSelected={handleDeleteRoles}
        getCheckboxProps={row => ({ disabled: DEFALT_ROLES.includes(row.token) })}
        onEditRow={handleEditRole}
      />
      <BaseForm
        type="edit"
        title="编辑角色"
        loading={editing}
        visible={editFormVisible}
        initValue={currentRow}
        onCancel={() => setEditFormVisible(false)}
        onSubmit={submitEditForm}
      />
      <BaseForm
        type="create"
        title="创建角色"
        ref={createFormRef}
        loading={creating}
        visible={createFormVisible}
        onCancel={() => setCreateFormVisible(false)}
        onSubmit={submitCreateForm}
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
    fetching: loading.effects['role/getList'],
    editing: loading.effects['role/update'],
    creating: loading.effects['role/create'],
  }),
)(RoleList);
