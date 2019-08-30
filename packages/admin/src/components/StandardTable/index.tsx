// import React, { useEffect, useState } from 'react';
// import { Alert, Table, Popconfirm } from 'antd';
// import { ColumnProps, TableRowSelection, TableProps } from 'antd/es/table';

// import styles from './index.less';

// export interface IStandardTableProps<T, ITableListItem> extends Omit<TableProps<T>, 'columns'> {
//   columns: IStandardTableColumnProps[];
//   data: {
//     list: ITableListItem[];
//     pagination: IStandardTableProps<ITableListItem>['pagination'];
//   };
//   selectedRows: ITableListItem[];
//   onSelectRow: (rows: any) => void;
// }

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

// export default (props: IStandardTableProps) => {
//   const { data, rowKey, ...rest } = props;
//   const { list = [], pagination = false } = data || {};
//   const [selectedRowKeys, setSelectedRowKeys] = useState([]);
//   // const [needTotalList, set]

//   const rowSelection = {
//     selectedRowKeys,
//     onChange: (keys: number[] | string[]) => setSelectedRowKeys(keys),
//     getCheckboxProps: (record: TableListItem) => ({
//       disabled: record.disabled,
//     }),
//   };

//   return (
//     <div className={styles.standardTable}>
//       <div className={styles.tableAlert}>
//         <Alert
//           message={
//             <>
//               <span>
//                 已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 项&nbsp;&nbsp;
//               </span>
//               {hasSelected ? (
//                 <Popconfirm title="确定删除吗?" onConfirm={() => this.deleteSelectedUsers()}>
//                   <a style={{ marginLeft: '20px' }}>删除选中</a>
//                 </Popconfirm>
//               ) : null}
//             </>
//           }
//           type="info"
//           showIcon
//         />
//       </div>

//       <Table
//         rowKey={rowKey}
//         rowSelection={rowSelection}
//         dataSource={list}
//         pagination={paginationProps}
//         onChange={this.handleTableChange}
//         {...rest}
//       ></Table>
//     </div>
//   );
// };
