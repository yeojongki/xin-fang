import React, { FC, useState, useRef, useCallback } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { ColumnProps } from 'antd/lib/table';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Permission } from '@xf/common/src/entities';
import { TListQuery } from '@xf/common/src/interfaces/list.query.interface';
import { DEFAULT_PAGE_SIZE } from '@xf/common/src/constants/pagination.const';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { TIDs } from '@xf/common/src/interfaces/id.interface';
import create, { IResetSelectedFn } from '@/components/StandardTable';
import { generateField, getForm } from '@/utils/form';
import { IDColumn } from '@/components/TableColumn';
import ModalForm from '@/components/BaseFormWrap/ModalForm';
import { Base } from './components/Base';
import { IPermissionStateType } from '@/models/permission';
import Query from './components/Query';

interface IPermissionListProps {
  dispatch: Dispatch<any>;
  permission: IPermissionStateType;
  fetching: boolean;
  editing: boolean;
  creating: boolean;
}

export const namespace = 'permission';
const pageName = '权限';
const PermissionTable = create<Permission>();

const PermissionList: FC<IPermissionListProps> = ({
  dispatch,
  fetching,
  editing,
  creating,
  permission: { pagination, list },
}) => {
  const tableRef = useRef<IResetSelectedFn | null>(null);

  const fetchList = useCallback(
    (payload: Partial<TListQuery<Permission>> = { pageSize: DEFAULT_PAGE_SIZE, current: 1 }) => {
      dispatch({
        type: `${namespace}/getList`,
        payload: { pagination: payload },
      });
    },
    [pagination],
  );

  // query
  const handleSearch = useCallback(
    (query: TListQuery<Permission>) => {
      const { total, ...rest } = pagination;
      fetchList({ ...rest, ...query });
    },
    [pagination],
  );

  // create
  const [createFormVisible, setCreateFormVisible] = useState<boolean>(false);
  const createFormRef = useRef<any>();

  const submitCreateForm = (values: Permission) => {
    // const input = { ...values, password: Md5(values.password) };
    dispatch({
      type: `${namespace}/create`,
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

  // edit
  const [editFormVisible, setEditFormVisible] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<Permission>();
  const editFormRef = useRef<any>();

  const handleEdit = (row: Permission): void => {
    // set fields
    const form = getForm(editFormRef);
    if (form) {
      const { desc, token, name } = row;
      form.setFields(generateField({ desc, token, name }));
    } else {
      // init
      setCurrentRow(row);
    }
    setEditFormVisible(true);
  };

  const submitEditForm = (values: Permission) => {
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
  const handleDelete = (rows: Permission | TIDs) => {
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

  const columns: ColumnProps<Permission>[] = [
    {
      key: 'id',
      dataIndex: 'id',
      title: 'id',
      render: (id: string) => <IDColumn id={id} />,
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
      key: 'module',
      dataIndex: 'module',
      title: '模块',
    },
    {
      key: 'desc',
      dataIndex: 'desc',
      title: '描述',
    },
  ];

  return (
    <PageHeaderWrapper title={false}>
      <PermissionTable
        onAdd={() => {
          setCreateFormVisible(true);
        }}
        renderSearchForm={() => <Query onSearch={handleSearch} onReset={fetchList} />}
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
        renderItems={props => Base(props)}
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
        renderItems={props => Base(props)}
        loading={creating}
        visible={createFormVisible}
        onCancel={() => setCreateFormVisible(false)}
        onSubmit={submitCreateForm}
      />
    </PageHeaderWrapper>
  );
};

export default connect(
  ({
    permission,
    loading,
  }: {
    permission: IPermissionListProps;
    loading: {
      effects: {
        [key: string]: string;
      };
    };
  }) => ({
    permission,
    fetching: loading.effects[`${namespace}/getList`],
    editing: loading.effects[`${namespace}/update`],
    creating: loading.effects[`${namespace}/create`],
  }),
)(PermissionList);
