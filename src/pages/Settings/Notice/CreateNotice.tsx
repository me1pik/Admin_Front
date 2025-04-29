// src/pages/CreateNotice.tsx
import React from 'react';
import NoticeDetail from './NoticeDetail';
import { TabItem } from '../../../components/Header/SearchSubHeader';

const noticeSelectOptions: TabItem[] = [
  { label: '공지', path: '' },
  { label: '안내', path: '' },
];

const CreateNotice: React.FC = () => (
  <NoticeDetail isCreate selectOptions={noticeSelectOptions} />
);

export default CreateNotice;
