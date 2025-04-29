// src/pages/Settings/FAQ/CreateFAQ.tsx
import React from 'react';
import FAQDetail from './FAQDetail';
import { TabItem } from '../../../components/Header/SearchSubHeader';

const faqSelectOptions: TabItem[] = [
  { label: '서비스', path: '서비스' },
  { label: '주문/결제', path: '주문/결제' },
  { label: '배송/반품', path: '배송/반품' },
  { label: '이용권', path: '이용권' },
];

/**
 * 등록 모드에서 FAQDetail을 빈 초기값으로 렌더링합니다.
 */
const CreateFAQ: React.FC = () => (
  <FAQDetail isCreate selectOptions={faqSelectOptions} />
);

export default CreateFAQ;
