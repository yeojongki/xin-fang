import React, { useRef, useState } from 'react';
import { IRole } from '@xf/common/src/interfaces/role.interfaces';
import DEFALT_ROLES from '@xf/common/src/constants/roles.const';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { ColumnProps } from 'antd/lib/table';
import { WrappedFormUtils } from 'antd/es/form/Form';
import { TIDs } from '@xf/common/src/interfaces/id.interface';
import create, { IResetSelectedFn } from '@/components/StandardTable';
import { IRoleStateType } from '@/models/role';
import ModalForm from '@/components/BaseFormWrap/ModalForm';
import { Base } from './components/Base';
import { getForm, generateField } from '@/utils/form';
import { IDColumn } from '@/components/TableColumn';

interface IRoleListProps {
  dispatch: Dispatch<any>;
  role: IRoleStateType;
  fetching: boolean;
  editing: boolean;
  creating: boolean;
}

export const namespace = 'role';
const RoleTable = create<IRole>();

const RoleList: React.FC<IRoleListProps> = ({
  dispatch,
  fetching,
  editing,
  creating,
  role: { list },
}) => {
  const tableRef = useRef<IResetSelectedFn | null>(null);

  const fetchList = (payload?: any) => {
    dispatch({
      type: `${namespace}/getList`,
      payload,
    });
  };

  // delete
  const handleDelete = (rows: IRole | TIDs) => {
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

  // edit
  const [editFormVisible, setEditFormVisible] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<IRole>();
  const editFormRef = useRef<any>();

  const handleEdit = (row: IRole): void => {
    // set fields
    const form = getForm(editFormRef);
    if (form) {
      form.setFields(generateField(row));
    } else {
      // init
      setCurrentRow(row);
    }
    setEditFormVisible(true);
  };

  const submitEditForm = values => {
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

  // create
  const [createFormVisible, setCreateFormVisible] = useState<boolean>(false);
  const createFormRef = useRef<any>();

  const submitCreateForm = (values: IRole) => {
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

  const columns: ColumnProps<IRole>[] = [
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
      key: 'desc',
      dataIndex: 'desc',
      title: '描述',
    },
  ];

  return (
    <>
      <RoleTable
        onAdd={() => {
          setCreateFormVisible(true);
        }}
        columns={columns}
        ref={tableRef}
        rowKey={record => record.id}
        loading={fetching}
        pagination={false}
        fetchList={fetchList}
        dataSource={list}
        onDeleteRow={handleDelete}
        onDeleteSelected={handleDelete}
        getCheckboxProps={row => ({ disabled: DEFALT_ROLES.includes(row.token) })}
        onEditRow={handleEdit}
      />
      <ModalForm
        title="编辑角色"
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
        title="创建角色"
        type="create"
        ref={createFormRef}
        renderItems={props => Base(props)}
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
    fetching: loading.effects[`${namespace}/getList`],
    editing: loading.effects[`${namespace}/update`],
    creating: loading.effects[`${namespace}/create`],
  }),
)(RoleList);
