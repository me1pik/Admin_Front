import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState<TabItem>(tabs[0]);
  const [BrandData] = useState<BrandItem[]>(dummyBrands);

  // 탭 변경 시
  const handleTabChange = (tab: TabItem) => {
    setSelectedTab(tab);
    setPage(1);
  };

  // 탭 필터링
  const dataByTab = BrandData.filter((item) => {
    if (selectedTab.label === '전체보기') return true;
    return item.status === selectedTab.label;
  });

  // 검색 로직
  const filteredData = dataByTab.filter((item) => {
    const lowerTerm = searchTerm.toLowerCase();
    return (
      String(item.no).toLowerCase().includes(lowerTerm) ||
      item.group.toLowerCase().includes(lowerTerm) ||
      item.brand.toLowerCase().includes(lowerTerm) ||
      String(item.quantity).includes(lowerTerm) ||
      String(item.discount).includes(lowerTerm) ||
      item.manager.toLowerCase().includes(lowerTerm) ||
      item.contact.toLowerCase().includes(lowerTerm) ||
      item.registerDate.toLowerCase().includes(lowerTerm) ||
      item.status.toLowerCase().includes(lowerTerm)
    );
  });

  // 페이지네이션 상태
  const [page, setPage] = useState(1);
  const limit = 10;
  const totalCount = filteredData.length;
  const totalPages = Math.ceil(totalCount / limit);
  const offset = (page - 1) * limit;
  const currentPageData = filteredData.slice(offset, offset + limit);

  // 리스트에서 행 클릭 시 상세 이동
  const handleEdit = (no: number) => {
    // 예: /Branddetail/:no 로 이동
    navigate(`/Branddetail/${no}`);
  };

  // 브랜드 등록 버튼 클릭 시 -> Brandregister 페이지로 이동
  const handleRegisterClick = () => {
    navigate('/Brandregister');
  };

  return (
    <Content>
      <HeaderTitle>브랜드 관리</HeaderTitle>
      <SubHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        tabs={tabs}
        onTabChange={handleTabChange}
      />
      <InfoBar>
        <TotalCount>Total: {totalCount}</TotalCount>
      </InfoBar>
      <TableContainer>
        <BrandTable filteredData={currentPageData} handleEdit={handleEdit} />
      </TableContainer>
      {/* 하단에 버튼과 페이지네이션을 한 줄(row)로 정렬 */}
      <FooterRow>
        <RegisterButton text='브랜드등록' onClick={handleRegisterClick} />
        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
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
  text-align: left;
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 700;
  font-size: 16px;
  line-height: 18px;
  color: #000000;
  margin-bottom: 18px;
`;

const InfoBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const TotalCount = styled.div`
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 900;
  font-size: 12px;
  color: #000000;
`;

const TableContainer = styled.div`
  box-sizing: border-box;
`;

/* FooterRow: 버튼과 페이지네이션을 한 줄(row)로 정렬 */
const FooterRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
`;
