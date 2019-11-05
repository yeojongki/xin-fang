import React, { useRef, useState, useEffect, useCallback, FC } from 'react';
import { WrappedFormUtils } from 'antd/es/form/Form';
import { Switch } from 'antd';
import { House } from '@xf/common/src/entities';
import { HouseStatus } from '@xf/common/src/constants/house.const';
import { TIDs } from '@xf/common/src/interfaces/id.interface';
import { TListQuery } from '@xf/common/src/interfaces/list.query.interface';
import { DEFAULT_PAGE_SIZE } from '@xf/common/src/constants/pagination.const';
import { ColumnProps } from 'antd/lib/table';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import create, { IResetSelectedFn } from '@/components/StandardTable';
import { StateType } from './model';
import { getForm, generateField } from '@/utils/form';
import { IDColumn, DateColumn } from '@/components/TableColumn';
import ModalForm from '@/components/BaseFormWrap/ModalForm';
import { Base } from './components/Base';
import Query from './components/Query';

interface IHousesProps {
  dispatch: Dispatch<any>;
  fetching: boolean;
  editing: boolean;
  creating: boolean;
  house: StateType;
}

export const namespace = 'house';
const pageName = '房子';
const HouseTable = create<House>();

const Houses: FC<IHousesProps> = ({
  dispatch,
  fetching,
  editing,
  creating,
  house: { pagination, list },
}) => {
  const tableRef = useRef<IResetSelectedFn | null>(null);

  useEffect(() => {
    dispatch({
      type: `${namespace}/getList`,
    });
  }, []);

  const fetchList = useCallback(
    (payload: Partial<TListQuery<House>> = { pageSize: DEFAULT_PAGE_SIZE, current: 1 }) => {
      dispatch({
        type: `${namespace}/getList`,
        payload,
      });
    },
    [pagination],
  );

  // query
  const handleSearch = useCallback(
    (query: TListQuery<House>) => {
      const { total, ...rest } = pagination;
      fetchList({ ...rest, ...query });
    },
    [pagination],
  );

  // create
  const [createFormVisible, setCreateFormVisible] = useState<boolean>(false);
  const createFormRef = useRef<any>();

  const submitCreateForm = (values: House) => {
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
  const [currentRow, setCurrentRow] = useState<House>();
  const editFormRef = useRef<any>();

  const handleEdit = (row: House): void => {
    // set fields
    const form = getForm(editFormRef);
    if (form) {
      const { createdAt, updatedAt, ...rest } = row;
      form.setFields(generateField(rest));
    } else {
      // init
      setCurrentRow(row);
    }
    setEditFormVisible(true);
  };

  const submitEditForm = (values: House) => {
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
  const handleDelete = (rows: House | TIDs) => {
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

  const columns: ColumnProps<House>[] = [
    {
      key: 'id',
      dataIndex: 'id',
      title: 'id',
      render: (id: string) => <IDColumn id={id} />,
    },
    {
      key: 'title',
      dataIndex: 'title',
      title: '标题',
    },
    // {
    //   key: 'content',
    //   dataIndex: 'content',
    //   title: '详情',
    // },
    {
      key: 'imgs',
      dataIndex: 'imgs',
      title: '图片',
    },
    {
      key: 'status',
      dataIndex: 'status',
      title: '状态',
      render: (status: HouseStatus) => <Switch disabled checked={status === 0} />,
    },
    {
      key: 'commentCount',
      dataIndex: 'commentCount',
      title: '评论数',
    },
    {
      key: 'likeCount',
      dataIndex: 'likeCount',
      title: '点赞数',
    },
    {
      key: 'clickCount',
      dataIndex: 'clickCount',
      title: '点击数',
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
      <HouseTable
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
    </>
  );
};

export default connect(
  ({
    house,
    loading,
  }: {
    house: StateType;
    loading: {
      effects: {
        [key: string]: string;
      };
    };
  }) => ({
    house,
    fetching: loading.effects[`${namespace}/getList`],
    editing: loading.effects[`${namespace}/update`],
    creating: loading.effects[`${namespace}/create`],
  }),
)(Houses);