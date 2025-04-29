// src/pages/CreatePrivacy.tsx
import React from 'react';
import PrivacyDetail from './PrivacyDetail';
import { TabItem } from '../../../components/Header/SearchSubHeader';

const PrivacySelectOptions: TabItem[] = [
  { label: '공지', path: '' },
  { label: '안내', path: '' },
];

const CreatePrivacy: React.FC = () => (
  <PrivacyDetail isCreate selectOptions={PrivacySelectOptions} />
);

export default CreatePrivacy;
