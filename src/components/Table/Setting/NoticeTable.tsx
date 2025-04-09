import React from 'react';
import { CommonTable, BaseTableItem } from './CommonTable';

/** Notice 아이템 인터페이스 */
export interface NoticeItem extends BaseTableItem {}

interface NoticeTableProps {
  filteredData: NoticeItem[];
  handleEdit: (author: string, no: number) => void;
}

const NoticeTable: React.FC<NoticeTableProps> = ({
  filteredData,
  handleEdit,
}) => {
  return <CommonTable data={filteredData} onAuthorClick={handleEdit} />;
};

export default NoticeTable;
