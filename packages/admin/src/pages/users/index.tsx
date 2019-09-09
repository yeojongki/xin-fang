import React, { FC, useState, useRef, useCallback } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { ColumnProps } from 'antd/lib/table';
import { IUser } from '@xf/common/src/interfaces/user.interfaces';
import { IPagination } from '@xf/common/src/interfaces/pagination.interface';
import { WrappedFormUtils } from 'antd/es/form/Form';
import { TIDs } from '@xf/common/src/interfaces/id.interface';
import { DEFAULT_PAGE_SIZE } from '@xf/common/src/constants/pagination.const';
import { Gender, GenderMap } from '@xf/common/src/constants/gender.const';
import { Tag } from 'antd';
import { StateType } from './model';
import create, { IResetSelectedFn } from '@/components/StandardTable';
import { getForm, generateField } from '@/utils/form';
import { BaseForm } from './components/Base';
import ModalForm from '@/components/BaseFormWrap/ModalForm';
import { IDColumn, DateColumn } from '@/components/TableColumn';
import { Md5 } from '@/utils';
import { IRoleStateType } from '@/models/role';

interface IUsersProps {
  dispatch: Dispatch<any>;
  fetching: boolean;
  editing: boolean;
  creating: boolean;
  users: StateType;
  roleList: IRoleStateType['list'];
  roleMap: IRoleStateType['map'];
}

export const namespace = 'users';
const pageName = '用户';
const UsersTable = create<IUser>();

const Users: FC<IUsersProps> = ({
  dispatch,
  fetching,
  editing,
  creating,
  users: { pagination, list },
  roleList,
  roleMap,
}) => {
  const tableRef = useRef<IResetSelectedFn | null>(null);

  const fetchList = useCallback(
    (payload: Partial<IPagination> = { pageSize: DEFAULT_PAGE_SIZE, current: 1 }) => {
      dispatch({
        type: `${namespace}/getList`,
        payload,
      });
    },
    [pagination],
  );

  // create
  const [createFormVisible, setCreateFormVisible] = useState<boolean>(false);
  const createFormRef = useRef<any>();

  const submitCreateForm = (values: IUser) => {
    const input = { ...values, password: Md5(values.password) };
    dispatch({
      type: `${namespace}/create`,
      payload: {
        values: input,
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

  // edit
  const [editFormVisible, setEditFormVisible] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<IUser>();
  const editFormRef = useRef<any>();

  const handleEdit = (row: IUser): void => {
    // set fields
    const form = getForm(editFormRef);
    if (form) {
      const { avatar, createdAt, updatedAt, gender, ...rest } = row;
      form.setFields(generateField(rest));
    } else {
      // init
      setCurrentRow(row);
    }
    setEditFormVisible(true);
  };

  const submitEditForm = (values: IUser) => {
    // 加密 password
    if (values.password) {
      values.password = Md5(values.password);
    }
    dispatch({
      type: `${namespace}/update`,
      payload: {
        values,
        callback: () => {
          fetchList();
          setEditFormVisible(false);
        },
      },
    });
  };

  // delete
  const handleDelete = (rows: IUser | TIDs) => {
    const ids = Array.isArray(rows) ? rows : [rows.id];
    dispatch({
      type: `${namespace}/delete`,
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

  const columns: ColumnProps<IUser>[] = [
    {
      key: 'id',
      dataIndex: 'id',
      title: 'id',
      render: (id: string) => <IDColumn id={id} />,
    },
    {
      key: 'username',
      dataIndex: 'username',
      title: '用户名',
    },
    {
      key: 'roles',
      dataIndex: 'roles',
      title: '角色',
      render: (roles: string[]) => roles.map(role => <Tag key={role}>{roleMap[role]}</Tag>),
    },
    {
      key: 'mobile',
      dataIndex: 'mobile',
      title: '手机号',
    },
    {
      key: 'email',
      dataIndex: 'email',
      title: '邮箱',
    },
    {
      key: 'gender',
      dataIndex: 'gender',
      title: '性别',
      render: (gender: Gender) => GenderMap[gender],
    },
    {
      key: 'createdAt',
      dataIndex: 'createdAt',
      title: '创建时间',
      width: 150,
      render: date => <DateColumn date={date} />,
    },
    {
      key: 'updatedAt',
      dataIndex: 'updatedAt',
      title: '更新时间',
      width: 150,
      render: date => <DateColumn date={date} />,
    },
  ];

  return (
    <>
      <UsersTable
        onAdd={() => {
          setCreateFormVisible(true);
        }}
        columns={columns}
        ref={tableRef}
        rowKey={record => record.id}
        loading={fetching}
        pagination={pagination}
        fetchList={fetchList}
        dataSource={list}
        onDeleteRow={handleDelete}
        onDeleteSelected={handleDelete}
        // getCheckboxProps={row => ({ disabled: DEFALT_ROLES.includes(row.token) })}
        onEditRow={handleEdit}
      />
      <ModalForm
        title={`编辑${pageName}`}
        type="edit"
        ref={editFormRef}
        renderItems={props => BaseForm({ ...props, roleList })}
        loading={editing}
        visible={editFormVisible}
        initValue={currentRow}
        onCancel={() => setEditFormVisible(false)}
        onSubmit={submitEditForm}
      />
      <ModalForm
        title={`创建${pageName}`}
        type="create"
        ref={createFormRef}
        renderItems={props => BaseForm({ ...props, roleList })}
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
    users,
    role,
    loading,
  }: {
    users: StateType;
    role: IRoleStateType;
    loading: {
      effects: {
        [key: string]: string;
      };
    };
  }) => ({
    users,
    roleList: role.list,
    roleMap: role.map,
    fetching: loading.effects[`${namespace}/getList`],
    editing: loading.effects[`${namespace}/update`],
    creating: loading.effects[`${namespace}/create`],
  }),
)(Users);
