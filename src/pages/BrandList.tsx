// src/pages/BrandList.tsx

import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import BrandTable, { BrandItem } from '../components/Table/BrandTable';
import SubHeader, { TabItem } from '../components/Header/SearchSubHeader';
import Pagination from '../components/Pagination';
import RegisterButton from '../components/RegisterButton'; // 새 버튼 컴포넌트 임포트

/** 더미 브랜드 데이터 */
const dummyBrands: BrandItem[] = [
  {
    no: 13486,
    group: '대현 (DAEHYUN)',
    brand: 'CC Collect',
    quantity: 340,
    discount: 20,
    manager: '김미정 매니저',
    contact: '010-1234-5678',
    registerDate: '2024-11-15',
    status: '등록완료',
  },
  {
    no: 13487,
    group: '대현 (DAEHYUN)',
    brand: 'MUJO',
    quantity: 340,
    discount: 20,
    manager: '김미정 매니저',
    contact: '010-1234-5678',
    registerDate: '2024-11-15',
    status: '등록완료',
  },
  {
    no: 13488,
    group: '대현 (DAEHYUN)',
    brand: 'DEWL',
    quantity: 340,
    discount: 20,
    manager: '김미정 매니저',
    contact: '010-1234-5678',
    registerDate: '2024-11-15',
    status: '등록완료',
  },
  {
    no: 13489,
    group: '대현 (DAEHYUN)',
    brand: 'ZZOC',
    quantity: 340,
    discount: 20,
    manager: '김미정 매니저',
    contact: '010-1234-5678',
    registerDate: '2024-11-15',
    status: '등록완료',
  },
  {
    no: 13490,
    group: '대현 (DAEHYUN)',
    brand: 'SATIN',
    quantity: 340,
    discount: 20,
    manager: '김미정 매니저',
    contact: '010-1234-5678',
    registerDate: '2024-11-15',
    status: '등록완료',
  },
  {
    no: 13491,
    group: '대현 (DAEHYUN)',
    brand: 'MICHAA',
    quantity: 340,
    discount: 20,
    manager: '김미정 매니저',
    contact: '010-1234-5678',
    registerDate: '2024-11-15',
    status: '등록완료',
  },
  {
    no: 13492,
    group: '대현 (DAEHYUN)',
    brand: 'R2D',
    quantity: 340,
    discount: 20,
    manager: '김미정 매니저',
    contact: '010-1234-5678',
    registerDate: '2024-11-15',
    status: '등록대기',
  },
  {
    no: 13493,
    group: '대현 (DAEHYUN)',
    brand: 'RIGOIST',
    quantity: 340,
    discount: 20,
    manager: '김미정 매니저',
    contact: '010-1234-5678',
    registerDate: '2024-11-15',
    status: '계약종료',
  },
];

const tabs: TabItem[] = [
  { label: '전체보기', path: '' },
  { label: '등록완료', path: '등록완료' },
  { label: '등록대기', path: '등록대기' },
  { label: '계약종료', path: '계약종료' },
];

const BrandList: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = (searchParams.get('search') ?? '').toLowerCase();

  // URL 쿼리에서 현재 페이지 읽기
  const page = parseInt(searchParams.get('page') ?? '1', 10);
  const limit = 10;

  const [selectedTab, setSelectedTab] = useState<TabItem>(tabs[0]);
  const [BrandData] = useState<BrandItem[]>(dummyBrands);

  // 탭 변경 시 URL의 page=1로 리셋
  const handleTabChange = (tab: TabItem) => {
    setSelectedTab(tab);
    const params = Object.fromEntries(searchParams.entries());
    params.page = '1';
    setSearchParams(params);
  };

  // 1차 탭별 필터링
  const dataByTab = BrandData.filter((item) =>
    selectedTab.label === '전체보기' ? true : item.status === selectedTab.label
  );

  // 2차 검색어 필터링
  const filteredData = dataByTab.filter((item) => {
    const t = searchTerm;
    return (
      String(item.no).includes(t) ||
      item.group.toLowerCase().includes(t) ||
      item.brand.toLowerCase().includes(t) ||
      String(item.quantity).includes(t) ||
      String(item.discount).includes(t) ||
      item.manager.toLowerCase().includes(t) ||
      item.contact.toLowerCase().includes(t) ||
      item.registerDate.toLowerCase().includes(t) ||
      item.status.toLowerCase().includes(t)
    );
  });

  // 페이지네이션 계산 및 데이터 슬라이스
  const totalCount = filteredData.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / limit));
  const offset = (page - 1) * limit;
  const currentPageData = filteredData.slice(offset, offset + limit);

  const handleEdit = (no: number) => {
    navigate(`/Branddetail/${no}`);
  };
  const handleRegisterClick = () => {
    navigate('/Brandregister');
  };

  return (
    <Content>
      <HeaderTitle>브랜드 관리</HeaderTitle>

      <SubHeader tabs={tabs} onTabChange={handleTabChange} />

      <InfoBar>
        <TotalCount>Total: {totalCount}</TotalCount>
      </InfoBar>

      <TableContainer>
        <BrandTable filteredData={currentPageData} handleEdit={handleEdit} />
      </TableContainer>

      <FooterRow>
        <RegisterButton text='브랜드등록' onClick={handleRegisterClick} />
        <Pagination totalPages={totalPages} />
      </FooterRow>
    </Content>
  );
};

export default BrandList;

/* ====================== Styled Components ====================== */

const Content = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  flex-grow: 1;
  font-size: 14px;
  padding: 10px;
`;

const HeaderTitle = styled.h1`
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 700;
  font-size: 16px;
  margin-bottom: 18px;
`;

const InfoBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const TotalCount = styled.div`
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 900;
  font-size: 12px;
`;

const TableContainer = styled.div`
  box-sizing: border-box;
`;

const FooterRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
`;
