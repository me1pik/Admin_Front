// src/pages/CreateTerms.tsx
import React from 'react';
import TermsDetail from './TermsDetail';
import { TabItem } from '../../../components/Header/SearchSubHeader';

const TermsSelectOptions: TabItem[] = [
  { label: '공지', path: '' },
  { label: '안내', path: '' },
];

const CreateTerms: React.FC = () => (
  <TermsDetail isCreate selectOptions={TermsSelectOptions} />
);

export default CreateTerms;
