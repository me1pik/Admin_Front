import React from 'react';
import { CommonTable, BaseTableItem } from './CommonTable';

/** Privacy 아이템 인터페이스 */
export interface PrivacyItem extends BaseTableItem {}

interface PrivacyTableProps {
  filteredData: PrivacyItem[];
  handleEdit: (author: string, no: number) => void;
}

const PrivacyTable: React.FC<PrivacyTableProps> = ({
  filteredData,
  handleEdit,
}) => {
  return <CommonTable data={filteredData} onAuthorClick={handleEdit} />;
};

export default PrivacyTable;
