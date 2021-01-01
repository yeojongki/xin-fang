import React, { useRef, useState, useEffect, useCallback, FC } from 'react';
import { WrappedFormUtils } from 'antd/es/form/Form';
import { Tag } from 'antd';
import { House } from '@xf/common/src/entities';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { HouseStatus, HouseStatusMap } from '@xf/common/src/constants/house.const';
import { TIDs } from '@xf/common/src/interfaces/id.interface';
import { ICity } from '@xf/common/src/interfaces/city.interface';
import { TListQuery } from '@xf/common/src/interfaces/list.query.interface';
import { DEFAULT_PAGE_SIZE } from '@xf/common/src/constants/pagination.const';
import { ISubway } from '@xf/common/src/interfaces/subway.interface';
import { DEFAULT_CITY_ID } from '@xf/common/src/constants/city.const';
import { ColumnProps } from 'antd/lib/table';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import create, { IResetSelectedFn } from '@/components/StandardTable';
import { IDColumn, DateColumn, CenterTextColumn } from '@/components/TableColumn';
import ModalForm from '@/components/BaseFormWrap/ModalForm';
import { IUploadFile } from '@/components/PicturesWall';
import { getUploadImgs } from '@/components/PicturesWall/utils';
import TooltipColumn from '@/components/TableColumn/TooltipColumn';
import { CityStateType, namespace as cityNS } from '@/models/city';
import { Base } from './components/Base';
import Query from './components/Query';
import { StateType } from './model';

interface IHousesProps {
  dispatch: Dispatch<any>;
  fetching: boolean;
  editing: boolean;
  creating: boolean;
  house: StateType;
  city: CityStateType;
}

export type TSubmitHouse = Omit<House, 'imgs'> & {
  imgs: IUploadFile[];
  city: number;
  cityId: number;
  subway: number;
  subwayId: number;
};

export const namespace = 'house';
const pageName = '房子';
const HouseTable = create<House>();

const Houses: FC<IHousesProps> = ({
  dispatch,
  fetching,
  editing,
  creating,
  house: { pagination, list },
  city,
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

  const fetchCityList = useCallback(
    (payload: Partial<TListQuery<ICity>> = { pageSize: DEFAULT_PAGE_SIZE, current: 1 }) => {
      dispatch({
        type: `${cityNS}/getList`,
        payload,
      });
    },
    [pagination],
  );

  useEffect(() => {
    fetchList();
  }, []);

  // cityList
  useEffect(() => {
    if (!city.list.length) {
      fetchCityList({ pageSize: 99999, current: 1, skip: 1 });
    }
  }, []);

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

  const submitCreateForm = (values: TSubmitHouse) => {
    values.cityId = values.city;
    values.subwayId = values.subway;
    // @ts-ignore
    delete values.city;
    // @ts-ignore
    delete values.subway;
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
    setCurrentRow(row);
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

  // subwayList
  const [subwayList, setSubwayList] = useState<ISubway[]>([]);

  const getSubways = (id: number) => {
    dispatch({
      type: `${cityNS}/getSubwaysByCityId`,
      payload: {
        id,
        callback: (subways: ISubway[]) => {
          setSubwayList(subways);
        },
      },
    });
  };

  useEffect(() => {
    getSubways(DEFAULT_CITY_ID);
  }, []);

  const onCityChange = async (id: number) => {
    getSubways(id);
    if (editFormVisible) {
      (editFormRef.current as WrappedFormUtils<any>).setFieldsValue({ subway: undefined });
    }
    if (createFormVisible) {
      (createFormRef.current as WrappedFormUtils<any>).setFieldsValue({ subway: undefined });
    }
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
      render: (title: string) => <TooltipColumn text={title} width="300px" />,
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
      key: 'user',
      dataIndex: 'user',
      title: '发布者',
    },
    {
      key: 'city',
      dataIndex: 'city',
      title: '城市',
      render: (c: string) => <div>{c}</div>,
    },
    {
      key: 'subway',
      dataIndex: 'subway',
      title: '地铁站',
      render: (subway: string) => <div>{subway}</div>,
    },
    {
      key: 'commentCount',
      dataIndex: 'commentCount',
      title: '评论',
      align: 'center',
      width: 100,
      render: (text: string) => <CenterTextColumn text={text} />,
    },
    {
      key: 'likeCount',
      dataIndex: 'likeCount',
      title: '点赞',
      align: 'center',
      width: 100,
      render: (text: string) => <CenterTextColumn text={text} />,
    },
    {
      key: 'clickCount',
      dataIndex: 'clickCount',
      title: '点击',
      align: 'center',
      width: 100,
      render: (text: string) => <CenterTextColumn text={text} />,
    },
    {
      key: 'createdAt',
      dataIndex: 'createdAt',
      title: '创建时间',
      width: 150,
      render: (date) => <DateColumn date={date} />,
    },
    {
      key: 'updatedAt',
      dataIndex: 'updatedAt',
      title: '更新时间',
      width: 150,
      render: (date) => <DateColumn date={date} />,
    },
  ];

  return (
    <PageHeaderWrapper title={false}>
      <HouseTable
        onAdd={() => {
          setCreateFormVisible(true);
        }}
        renderSearchForm={() => (
          <Query
            cityList={city.list}
            subwayList={subwayList}
            onSearch={handleSearch}
            onReset={fetchList}
            onCityChange={onCityChange}
          />
        )}
        columns={columns}
        ref={tableRef}
        rowKey={(record) => record.id}
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
        renderItems={(props) =>
          Base({
            ...props,
            cityList: city.list,
            subwayList,
            onCityChange,
          })
        }
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
        renderItems={(props) =>
          Base({
            ...props,
            cityList: city.list,
            subwayList,
            onCityChange,
          })
        }
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
    city,
    house,
    loading,
  }: {
    city: CityStateType;
    house: StateType;
    loading: {
      effects: {
        [key: string]: string;
      };
    };
  }) => ({
    city,
    house,
    fetching: loading.effects[`${namespace}/getList`],
    editing: loading.effects[`${namespace}/update`],
    creating: loading.effects[`${namespace}/create`],
  }),
)(Houses);
