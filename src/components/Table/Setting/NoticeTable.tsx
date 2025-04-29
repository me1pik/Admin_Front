// src/components/Table/Setting/NoticeTable.tsx
import React from 'react';
import { CommonTable, BaseTableItem } from './CommonTable';

export interface NoticeItem extends BaseTableItem {}

interface NoticeTableProps {
  filteredData: NoticeItem[];
  handleEdit: (author: string, no: number) => void;
}

const NoticeTable: React.FC<NoticeTableProps> = ({
  filteredData,
  handleEdit,
}) => <CommonTable data={filteredData} onAuthorClick={handleEdit} />;

export default NoticeTable;
