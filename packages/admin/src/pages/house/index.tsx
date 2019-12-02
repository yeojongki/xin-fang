import React, { useRef, useState, useEffect, useCallback, FC } from 'react';
import { WrappedFormUtils } from 'antd/es/form/Form';
import { Tag } from 'antd';
import { House } from '@xf/common/src/entities';
import { HouseStatus, HouseStatusMap } from '@xf/common/src/constants/house.const';
import { TIDs } from '@xf/common/src/interfaces/id.interface';
import { TListQuery } from '@xf/common/src/interfaces/list.query.interface';
import { DEFAULT_PAGE_SIZE } from '@xf/common/src/constants/pagination.const';
import { ColumnProps } from 'antd/lib/table';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import create, { IResetSelectedFn } from '@/components/StandardTable';
import { StateType } from './model';
import { getForm, generateField } from '@/utils/form';
import { IDColumn, DateColumn, CenterTextColumn } from '@/components/TableColumn';
import ModalForm from '@/components/BaseFormWrap/ModalForm';
import { Base } from './components/Base';
import Query from './components/Query';
import { IUploadFile } from '@/components/PicturesWall';

interface IHousesProps {
  dispatch: Dispatch<any>;
  fetching: boolean;
  editing: boolean;
  creating: boolean;
  house: StateType;
}

export type TSubmitHouse = Omit<House, 'imgs'> & { imgs: IUploadFile[] };

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

  const fetchList = useCallback(
    (payload: Partial<TListQuery<House>> = { pageSize: DEFAULT_PAGE_SIZE, current: 1 }) => {
      dispatch({
        type: `${namespace}/getList`,
        payload,
      });
    },
    [pagination],
  );

  useEffect(() => {
    fetchList();
  }, []);

  // query
  const handleSearch = useCallback(
    (query: TListQuery<House>) => {
      const { total, ...rest } = pagination;
      fetchList({ ...rest, ...query });
    },
    [pagination],
  );

  const getUploadImgs = (imgs: IUploadFile[]) =>
    imgs
      .map(img => {
        const { response } = img;
        if (response && typeof response !== 'string' && response.result.filename) {
          return response.result.filename;
        }
        return null;
      })
      .filter(Boolean);

  // create
  const [createFormVisible, setCreateFormVisible] = useState<boolean>(false);
  const createFormRef = useRef<any>();

  const submitCreateForm = (values: TSubmitHouse) => {
    const imgs = getUploadImgs(values.imgs);
    dispatch({
      type: `${namespace}/create`,
      payload: {
        values: { ...values, imgs },
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
      const {
        imgs,
        clickCount,
        commentCount,
        likeCount,
        createdAt,
        updatedAt,
        status,
        ...rest
      } = row;
      form.setFields(
        generateField({
          ...rest,
          status: `${status}`,
        }),
      );
    } else {
      // init
      setCurrentRow(row);
    }
    setEditFormVisible(true);
  };

  const submitEditForm = (values: TSubmitHouse) => {
    const imgs = getUploadImgs(values.imgs);
    dispatch({
      type: `${namespace}/update`,
      payload: {
        values: { ...values, imgs },
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
    {
      key: 'status',
      dataIndex: 'status',
      title: '状态',
      render: (status: HouseStatus) => (
        <Tag color={status === 0 ? 'blue' : ''}>{HouseStatusMap[status]}</Tag>
      ),
    },
    {
      key: 'commentCount',
      dataIndex: 'commentCount',
      title: '评论数',
      align: 'center',
      width: 100,
      render: (text: string) => <CenterTextColumn text={text} />,
    },
    {
      key: 'likeCount',
      dataIndex: 'likeCount',
      title: '点赞数',
      align: 'center',
      width: 100,
      render: (text: string) => <CenterTextColumn text={text} />,
    },
    {
      key: 'clickCount',
      dataIndex: 'clickCount',
      title: '点击数',
      align: 'center',
      width: 100,
      render: (text: string) => <CenterTextColumn text={text} />,
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
        operationEditText="详情"
        onDeleteRow={handleDelete}
        onDeleteSelected={handleDelete}
        onEditRow={handleEdit}
      />
      <ModalForm
        title={`查看/编辑${pageName}`}
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
