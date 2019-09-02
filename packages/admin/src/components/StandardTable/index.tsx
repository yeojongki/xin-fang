import React, { useEffect, useState, useImperativeHandle, forwardRef } from 'react';
import { Card, Alert, Table, Popconfirm, Divider, Button } from 'antd';
import { TableProps, ColumnProps } from 'antd/es/table';

import { DEFAULT_PAGE_OPTIONS, DEFAULT_PAGE_SIZE } from '@xf/common/src/constants/pagination.const';
import { IPagination } from '@xf/common/src/interfaces/pagination.interface';
import { TIDs } from '@xf/common/src/interfaces/id.interface';

import styles from './index.less';

export interface IStandardTableProps<T> extends Omit<TableProps<T>, 'columns'> {
  columns: ColumnProps<T>[];
  fetchList: (payload?: Partial<IPagination>) => void;
  onSelectRows?: (keys: TIDs, rows: T[]) => void;
  onDeleteRow?: (row: T) => void;
  onEditRow?: (row: T) => void;
  onDeleteSelected?: (ids: TIDs | T) => void;
  getCheckboxProps?: (row: T) => { disabled: boolean };
}

export interface IResetSelectedFn {
  resetSelected(): void;
}

function StandardTable<T>(props: IStandardTableProps<T>, tableRef: any) {
  const [selectedRowKeys, setSelectedRowKeys] = useState<TIDs>([]);
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const hasSelected = selectedRows.length > 0;

  const {
    columns,
    dataSource = [],
    pagination = false,
    rowKey,
    fetchList,
    onDeleteRow,
    onDeleteSelected,
    onEditRow,
    onSelectRows,
    getCheckboxProps,
    ...rest
  } = props;

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

  const operationColumn: ColumnProps<T> = {
    key: 'operation',
    dataIndex: 'operation',
    title: '操作',
    width: 150,
    render: (_, record) => (
      <>
        <Button type="link" size="small" onClick={() => (onEditRow ? onEditRow(record) : null)}>
          编辑
        </Button>
        <Divider type="vertical" />
        <Popconfirm title="确定删除吗?" onConfirm={() => onDeleteRow && onDeleteRow(record)}>
          <Button
            disabled={getCheckboxProps ? getCheckboxProps(record).disabled : false}
            type="link"
            size="small"
          >
            删除
          </Button>
        </Popconfirm>
      </>
    ),
  };

  const columnsProps = columns.concat(operationColumn);

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: TIDs, rows: T[]) => {
      keys && setSelectedRowKeys(keys);
      setSelectedRows(rows);
      keys && onSelectRows && onSelectRows(keys, rows);
    },
    getCheckboxProps,
  };

  const handleTableChange = ({ pageSize, current }: Partial<IPagination>) => {
    const params: Partial<IPagination> = {
      pageSize: pageSize ? +pageSize : DEFAULT_PAGE_SIZE,
      current,
    };
    fetchList(params);
  };

  const resetSelected = () => {
    setSelectedRowKeys([]);
    setSelectedRows([]);
  };

  useEffect(() => {
    fetchList();
  }, []);

  // 第一个参数 要暴露那个 ref , 第二个参数为暴露出什么
  useImperativeHandle(tableRef, () => ({
    resetSelected,
  }));

  return (
    <div ref={tableRef}>
      <Card>
        <div className={styles.standardTable}>
          <div className={styles.tableAlert}>
            <Alert
              message={
                <>
                  <span>
                    已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a>{' '}
                    项&nbsp;&nbsp;
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
            rowKey={rowKey}
            columns={columnsProps}
            dataSource={dataSource}
            pagination={paginationProps}
            rowSelection={rowSelection}
            onChange={handleTableChange}
            {...rest}
          />
        </div>
      </Card>
    </div>
  );
}

export default function create<T>() {
  return forwardRef<IResetSelectedFn, IStandardTableProps<T>>(StandardTable);
}
