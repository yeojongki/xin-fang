import React, { FC, useRef, useCallback, useState } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { Switch, Modal, Button } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { TListQuery } from '@xf/common/src/interfaces/list.query.interface';
import { ICity } from '@xf/common/src/interfaces/city.interface';
import { ISubway } from '@xf/common/src/interfaces/subway.interface';
import { DEFAULT_PAGE_SIZE } from '@xf/common/src/constants/pagination.const';
import { CityStatus } from '@xf/common/src/constants/city.const';
import { CityStateType, namespace } from '@/models/city';
import create, { IResetSelectedFn } from '@/components/StandardTable';
import { IDColumn, DateColumn } from '@/components/TableColumn';
import Query from './components/Query';
import { Detail } from './components/Detail';

interface ICityProps {
  dispatch: Dispatch<any>;
  fetching: boolean;
  editing: boolean;
  viewDetailing: boolean;
  city: CityStateType;
}

// const pageName = '城市';
const CityTable = create<ICity>();

const City: FC<ICityProps> = ({
  dispatch,
  fetching,
  editing,
  viewDetailing,
  city: { pagination, list },
}) => {
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

  // 查看城市所有地铁
  const [detailVisible, setDetailVisible] = useState<boolean>(false);
  const [detailTitle, setDetailTitle] = useState<string>('');
  const [subways, setSubways] = useState<ISubway[]>([]);
  const viewDetail = ({ id, name }: ICity) => {
    setDetailTitle(`「${name}」所有地铁`);
    dispatch({
      type: `${namespace}/getSubwaysByCityId`,
      payload: {
        id,
        callback: (subwayList: ISubway[]) => {
          setDetailVisible(true);
          setSubways(subwayList);
        },
      },
    });
  };

  const customOperation = (row: ICity) => (
    <Button
      onClick={() => viewDetail(row)}
      disabled={row.status === CityStatus.OFF}
      type="link"
      size="small"
    >
      查看地铁列表
    </Button>
  );

  return (
    <PageHeaderWrapper title={false}>
      <CityTable
        renderSearchForm={renderSearchForm}
        columns={columns}
        ref={tableRef}
        rowKey={(record) => `${record.id}`}
        loading={fetching || viewDetailing}
        pagination={pagination}
        fetchList={fetchList}
        dataSource={list}
        showCreateButton={false}
        showRowSection={false}
        customOperation={customOperation}
      />
      <Modal
        title={detailTitle}
        visible={detailVisible}
        onCancel={() => setDetailVisible(false)}
        onOk={() => setDetailVisible(false)}
      >
        <Detail subways={subways} />
      </Modal>
    </PageHeaderWrapper>
  );
};

export default connect(
  ({
    city,
    loading,
  }: {
    city: CityStateType;
    loading: {
      effects: {
        [key: string]: string;
      };
    };
  }) => ({
    city,
    fetching: loading.effects[`${namespace}/getList`],
    viewDetailing: loading.effects[`${namespace}/getSubwaysByCityId`],
  }),
)(City);
