import React, { useEffect, useState, useImperativeHandle, forwardRef, ReactNode } from 'react';
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
  onAdd?: () => void;
  renderSearchForm?: () => ReactNode;
  showCreateButton?: boolean;
  showOperationColumn?: boolean;
  showOperationEdit?: boolean;
  operationEditText?: string;
  showOperationDelete?: boolean;
  operationDeleteText?: string;
  operationWidth?: number;
  showRowSection?: boolean;
  customOperation?: (row: T) => ReactNode;
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
    onAdd,
    renderSearchForm,
    showCreateButton = true,
    showOperationColumn = true,
    showOperationEdit = true,
    operationEditText = '编辑',
    showOperationDelete = true,
    operationDeleteText = '删除',
    operationWidth = 150,
    showRowSection = true,
    customOperation = null,
    ...rest
  } = props;

  const paginationProps = pagination
    ? {
        showTotal: (total) => `共${total}条记录 `,
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
    width: operationWidth,
    fixed: 'right',
    render: (_, record) => {
      const disabled = getCheckboxProps ? getCheckboxProps(record).disabled : false;

      // 自定义操作
      if (customOperation) {
        return customOperation(record);
      }

      return (
        <>
          {showOperationEdit ? (
            <Button type="link" size="small" onClick={() => (onEditRow ? onEditRow(record) : null)}>
              {operationEditText}
            </Button>
          ) : null}

          {showOperationEdit && showOperationDelete ? <Divider type="vertical" /> : null}

          {showOperationDelete ? (
            <Popconfirm
              title="确定删除吗?"
              disabled={disabled}
              onConfirm={() => onDeleteRow && onDeleteRow(record)}
            >
              <Button disabled={disabled} type="link" size="small">
                {operationDeleteText}
              </Button>
            </Popconfirm>
          ) : null}
        </>
      );
    },
  };

  const finalColumns = showOperationColumn ? columns.concat(operationColumn) : columns;

  const rowSelection = showRowSection
    ? {
        selectedRowKeys,
        onChange: (keys: TIDs, rows: T[]) => {
          keys && setSelectedRowKeys(keys);
          setSelectedRows(rows);
          keys && onSelectRows && onSelectRows(keys, rows);
        },
        getCheckboxProps,
      }
    : undefined;

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
          {renderSearchForm && renderSearchForm()}
          {showCreateButton ? (
            <Button icon="plus" type="primary" className={styles.addBtn} onClick={onAdd}>
              新建
            </Button>
          ) : null}

          {showRowSection ? (
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
          ) : null}

          <Table
            scroll={{ x: 'max-content' }}
            rowKey={rowKey}
            columns={finalColumns}
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
