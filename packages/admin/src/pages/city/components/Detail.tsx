import React from 'react';
import { Subway } from '@xf/common/src/entities';
import { Table } from 'antd';
import { ColumnProps } from 'antd/es/table';
import { IDColumn } from '@/components/TableColumn';

interface IProps {
  subways: Subway[];
}

export const Detail = ({ subways }: IProps) => {
  const columns: ColumnProps<Subway>[] = [
    {
      key: 'id',
      dataIndex: 'id',
      title: 'id',
      render: (id: string) => <IDColumn id={id} />,
    },
    {
      key: 'name',
      dataIndex: 'name',
      title: '地铁名',
    },
  ];
  return (
    <Table
      scroll={{ x: '100%', y: 500 }}
      rowKey={record => `${record.id}`}
      columns={columns}
      dataSource={subways}
      pagination={false}
    />
  );
};
