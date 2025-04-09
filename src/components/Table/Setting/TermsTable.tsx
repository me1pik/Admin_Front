import React from 'react';
import { CommonTable, BaseTableItem } from './CommonTable';

/** Terms 아이템 인터페이스 */
export interface TermsItem extends BaseTableItem {}

interface TermsTableProps {
  filteredData: TermsItem[];
  handleEdit: (author: string, no: number) => void;
}

const TermsTable: React.FC<TermsTableProps> = ({
  filteredData,
  handleEdit,
}) => {
  return <CommonTable data={filteredData} onAuthorClick={handleEdit} />;
};

export default TermsTable;
