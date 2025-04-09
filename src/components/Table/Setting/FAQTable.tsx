import React from 'react';
import { CommonTable, BaseTableItem } from './CommonTable';

/** FAQ 아이템 인터페이스 (CommonTableItem 확장) */
export interface FAQItem extends BaseTableItem {}

/** FAQTable Props */
interface FAQTableProps {
  filteredData: FAQItem[];
  /** 작성자 클릭 시 이벤트 */
  handleEdit: (author: string, no: number) => void;
}

const FAQTable: React.FC<FAQTableProps> = ({ filteredData, handleEdit }) => {
  return <CommonTable data={filteredData} onAuthorClick={handleEdit} />;
};

export default FAQTable;
