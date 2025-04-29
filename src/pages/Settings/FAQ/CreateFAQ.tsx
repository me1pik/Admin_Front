// src/pages/CreateFAQ.tsx
import React from 'react';
import FAQDetail from './FAQDetail';
import { TabItem } from '../../../components/Header/SearchSubHeader';

const FAQSelectOptions: TabItem[] = [
  { label: '공지', path: '' },
  { label: '안내', path: '' },
];

const CreateFAQ: React.FC = () => (
  <FAQDetail isCreate selectOptions={FAQSelectOptions} />
);

export default CreateFAQ;
