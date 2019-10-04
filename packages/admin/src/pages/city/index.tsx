import React, { FC, useRef, useCallback, useState } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { Switch } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { TListQuery } from '@xf/common/src/interfaces/list.query.interface';
import { ICity } from '@xf/common/src/interfaces/city.interface';
import { DEFAULT_PAGE_SIZE } from '@xf/common/src/constants/pagination.const';
import { StateType } from './model';
import create, { IResetSelectedFn } from '@/components/StandardTable';
import { IDColumn, DateColumn } from '@/components/TableColumn';
import Query from './components/Query';

interface ICityProps {
  dispatch: Dispatch<any>;
  fetching: boolean;
  editing: boolean;
  city: StateType;
}

export const namespace = 'city';
// const pageName = '城市';
const CityTable = create<ICity>();

const City: FC<ICityProps> = ({ dispatch, fetching, editing, city: { pagination, list } }) => {
  const tableRef = useRef<IResetSelectedFn | null>(null);

  const fetchList = useCallback(
    (payload: Partial<TListQuery<ICity>> = { pageSize: DEFAULT_PAGE_SIZE, current: 1 }) => {
      dispatch({
        type: `${namespace}/getList`,
        payload,
      });
    },
    [pagination],
  );

  // query
  const handleSearch = useCallback(
    (query: TListQuery<ICity>) => {
      const { total, ...rest } = pagination;
      fetchList({ ...rest, ...query });
    },
    [pagination],
  );

  const renderSearchForm = useCallback(
    () => <Query onSearch={handleSearch} onReset={fetchList} />,
    [pagination],
  );

  // toggle status
  const [nowCityId, setNowCityId] = useState<number>();
  const onStatusChange = (value: boolean, _, { id }: ICity) => {
    setNowCityId(id);
    dispatch({
      type: `${namespace}/update`,
      payload: {
        values: { id, status: value ? 1 : 0 },
        callback: () => {
          fetchList();
        },
      },
    });
  };

  const columns: ColumnProps<ICity>[] = [
    {
      key: 'id',
      dataIndex: 'id',
      title: 'id',
      render: (id: string) => <IDColumn id={id} />,
    },
    {
      key: 'name',
      dataIndex: 'name',
      title: '城市名',
    },
    {
      key: 'pinyin',
      dataIndex: 'pinyin',
      title: '拼音',
    },
    {
      key: 'code',
      dataIndex: 'code',
      title: '城市代码',
    },
    {
      key: 'pre',
      dataIndex: 'pre',
      title: '简写',
    },
    {
      key: 'status',
      dataIndex: 'status',
      title: '是否开通',
      render: (status: 0 | 1, record: ICity) => (
        <Switch
          defaultChecked={!!status}
          loading={editing && nowCityId === record.id}
          onChange={(value, event) => onStatusChange(value, event, record)}
        />
      ),
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
      <CityTable
        renderSearchForm={renderSearchForm}
        columns={columns}
        ref={tableRef}
        rowKey={record => `${record.id}`}
        loading={fetching}
        pagination={pagination}
        fetchList={fetchList}
        dataSource={list}
        showCreateButton={false}
        showOperationColumn={false}
        showRowSection={false}
      />
    </>
  );
};

export default connect(
  ({
    city,
    loading,
  }: {
    city: StateType;
    loading: {
      effects: {
        [key: string]: string;
      };
    };
  }) => ({
    city,
    fetching: loading.effects[`${namespace}/getList`],
    editing: loading.effects[`${namespace}/update`],
  }),
)(City);
