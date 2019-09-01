import React, { useEffect, useState } from 'react';
import { Card, Alert, Table, Popconfirm, Divider } from 'antd';
import { ColumnProps, TableProps } from 'antd/es/table';

import { DEFAULT_PAGE_OPTIONS, DEFAULT_PAGE_SIZE } from '@xf/common/src/constants/pagination.const';
import { IPagination } from '@xf/common/src/interfaces/pagination.interface';
import { IID, TIDs } from '@xf/common/src/interfaces/id.interface';

import styles from './index.less';

export interface IStandardTableProps<T> extends Omit<TableProps<T>, 'columns'> {
  columns: ColumnProps<T>[];
  // selectedRows: ITableListItem[];
  onSelectRows?: (keys: TIDs, rows: any[]) => void;
  onDeleteRow?: (ids: TIDs) => void;
  onEditRow?: (row: any) => void;
  onDeleteSelected?: (ids: TIDs) => void;
  fetchList: (payload?: Partial<IPagination>) => void;
}

// export interface IStandardTableColumnProps<T> extends ColumnProps<T> {
//   needTotal?: boolean;
//   total?: number;
// }

// function initToTalList(columns: IStandardTableColumnProps[]) {
//   if (!columns) {
//     return [];
//   }
//   const toTotalList: IStandardTableColumnProps[] = [];
//   columns.forEach(column => {
//     if (column.needTotal) {
//       toTotalList.push({ ...column, total: 0 });
//     }
//   });
//   return toTotalList;
// }

export default (props: IStandardTableProps<any>) => {
  const {
    columns,
    dataSource = [],
    pagination = false,
    rowKey,
    fetchList,
    onDeleteSelected,
    onDeleteRow,
    onEditRow,
    onSelectRows,
    ...rest
  } = props;
  const [selectedRowKeys, setSelectedRowKeys] = useState<TIDs>([]);
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const hasSelected = selectedRowKeys.length > 0;
  console.log('selectedRows', selectedRows);
  const paginationProps = pagination
    ? {
        showTotal: total => `共${total}条记录 `,
        showSizeChanger: true,
        showQuickJumper: true,
        defaultCurrent: 1,
        pageSizeOptions: DEFAULT_PAGE_OPTIONS,
        ...pagination,
      }
    : false;

  const columnsProps = columns.concat({
    key: 'operation',
    dataIndex: 'operation',
    title: '操作',
    render: (_, record: IID) => (
      <>
        <a onClick={() => (onEditRow ? onEditRow(record) : null)}>编辑</a>
        <Divider type="vertical" />
        <Popconfirm
          title="确定删除吗?"
          onConfirm={() => onDeleteRow && onDeleteRow(new Array<any>(record.id))}
        >
          <a>删除</a>
        </Popconfirm>
      </>
    ),
  });

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: TIDs, rows: any[]) => {
      setSelectedRowKeys(keys);
      setSelectedRows(rows);
      onSelectRows && onSelectRows(keys, rows);
    },
    // getCheckboxProps: (record: TableListItem) => ({
    //   disabled: record.disabled,
    // }),
  };

  const handleTableChange = ({ pageSize, current }: Partial<IPagination>) => {
    const params: Partial<IPagination> = {
      pageSize: pageSize ? +pageSize : DEFAULT_PAGE_SIZE,
      current,
    };
    fetchList(params);
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <Card>
      <div className={styles.standardTable}>
        <div className={styles.tableAlert}>
          <Alert
            message={
              <>
                <span>
                  已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 项&nbsp;&nbsp;
                </span>
                {hasSelected ? (
                  <Popconfirm
                    title="确定删除吗?"
                    onConfirm={() => {
                      onDeleteSelected && onDeleteSelected(selectedRowKeys);
                    }}
                  >
                    <a style={{ marginLeft: '20px' }}>删除选中</a>
                  </Popconfirm>
                ) : null}
              </>
            }
            type="info"
            showIcon
          />
        </div>

        <Table
          columns={columnsProps}
          rowKey={rowKey}
          rowSelection={rowSelection}
          dataSource={dataSource}
          pagination={paginationProps}
          onChange={handleTableChange}
          {...rest}
        />
      </div>
    </Card>
  );
};
