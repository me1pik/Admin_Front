// src/pages/GeneralOrderList.tsx

import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import GeneralOrderListTable, {
  GeneralOrderListItem,
} from '../../../components/Table/GeneralOrderTable';
import SubHeader, { TabItem } from '../../../components/Header/SearchSubHeader';
import Pagination from '../../../components/Pagination';

/** 더미 데이터 */
const dummyGeneralOrderList: GeneralOrderListItem[] = [
  {
    no: 13486,
    orderDate: '2024-12-12',
    buyerAccount: 'styleweex',
    brand: 'CC Collect',
    styleCode: '24AWSE231',
    size: '55 (M)',
    color: 'BLACK',
    paymentMethod: '일시불',
    paymentStatus: '결제완료',
  },
  {
    no: 13487,
    orderDate: '2024-12-12',
    buyerAccount: 'jmerr_sunwoo',
    brand: 'M.IO.DES.PHINE',
    styleCode: '20MEE090',
    size: '55 (M)',
    color: 'PINK',
    paymentMethod: '카드결제',
    paymentStatus: '결제대기',
  },
  {
    no: 13488,
    orderDate: '2024-12-12',
    buyerAccount: 'jimmyInstagram',
    brand: 'M.IO.DES.PHINE',
    styleCode: '20MEE090',
    size: '55 (M)',
    color: 'PINK',
    paymentMethod: '24개월 할부',
    paymentStatus: '결제완료',
  },
  {
    no: 13489,
    orderDate: '2024-12-12',
    buyerAccount: 'mikeyoons_k',
    brand: 'SATIN',
    styleCode: '24AGT603',
    size: '55 (M)',
    color: 'BLACK',
    paymentMethod: '계좌이체',
    paymentStatus: '결제완료',
  },
  {
    no: 13490,
    orderDate: '2024-12-12',
    buyerAccount: 'olive3625',
    brand: 'ZZOC',
    styleCode: 'Z24AW5609',
    size: '55 (M)',
    color: 'BLACK',
    paymentMethod: '카드결제',
    paymentStatus: '취소요청',
  },
  {
    no: 13491,
    orderDate: '2024-12-12',
    buyerAccount: 'blossomy529',
    brand: 'MOMOA',
    styleCode: '23APY010',
    size: '55 (M)',
    color: 'LIGHT BEIGE',
    paymentMethod: '카드결제',
    paymentStatus: '환불 진행중',
  },
  {
    no: 13492,
    orderDate: '2024-12-12',
    buyerAccount: 'blossomy529',
    brand: 'MICHAA',
    styleCode: 'MOAWPD010',
    size: '55 (M)',
    color: 'GRAY',
    paymentMethod: '24개월 할부',
    paymentStatus: '결제완료',
  },
  {
    no: 13493,
    orderDate: '2024-12-12',
    buyerAccount: 'blossomy529',
    brand: 'MICHAA',
    styleCode: 'MOAWPD210',
    size: '55 (M)',
    color: 'LIGHT BLUE',
    paymentMethod: '카드결제',
    paymentStatus: '환불완료',
  },
];

/** 서브헤더 탭 */
const tabs: TabItem[] = [
  { label: '전체보기', path: '' },
  { label: '진행내역', path: '진행내역' },
  { label: '취소내역', path: '취소' },
];

const GeneralOrderList: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = (searchParams.get('search') ?? '').toLowerCase();

  // 페이지 & 페이징 설정
  const page = parseInt(searchParams.get('page') ?? '1', 10);
  const limit = 10;

  const [selectedTab, setSelectedTab] = useState<TabItem>(tabs[0]);
  const [data] = useState<GeneralOrderListItem[]>(dummyGeneralOrderList);

  // 탭 변경 핸들러 (페이지 리셋)
  const handleTabChange = (tab: TabItem) => {
    setSelectedTab(tab);
    setSearchParams({ status: tab.path, page: '1' });
  };

  // 탭별 필터링
  const dataByTab = data.filter((item) => {
    if (selectedTab.label === '전체보기') return true;
    if (selectedTab.label === '진행내역') {
      return !['취소요청', '환불 진행중', '결제실패'].includes(
        item.paymentStatus
      );
    }
    return ['취소요청', '환불 진행중', '결제실패'].includes(item.paymentStatus);
  });

  // 검색어 필터링 (case-insensitive)
  const filteredData = dataByTab.filter((item) => {
    const t = searchTerm;
    return (
      String(item.no).toLowerCase().includes(t) ||
      item.orderDate.toLowerCase().includes(t) ||
      item.buyerAccount.toLowerCase().includes(t) ||
      item.brand.toLowerCase().includes(t) ||
      item.styleCode.toLowerCase().includes(t) ||
      item.size.toLowerCase().includes(t) ||
      item.color.toLowerCase().includes(t) ||
      item.paymentMethod.toLowerCase().includes(t) ||
      item.paymentStatus.toLowerCase().includes(t)
    );
  });

  // 페이징 로직
  const totalCount = filteredData.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / limit));
  const offset = (page - 1) * limit;
  const currentPageData = filteredData.slice(offset, offset + limit);

  // 상세 페이지로 이동
  const handleEdit = (no: number) => {
    navigate(`/generalorderdetail/${no}`, {
      state: { selectOptions: tabs },
    });
  };

  return (
    <Content>
      <HeaderTitle>구매 내역</HeaderTitle>

      {/* SubHeader 에 검색 Input 포함 */}
      <SubHeader tabs={tabs} onTabChange={handleTabChange} />

      <InfoBar>
        <TotalCountText>Total: {totalCount}</TotalCountText>
      </InfoBar>

      <TableContainer>
        <GeneralOrderListTable
          filteredData={currentPageData}
          handleEdit={handleEdit}
        />
      </TableContainer>

      <FooterRow>
        <Pagination totalPages={totalPages} />
      </FooterRow>
    </Content>
  );
};

export default GeneralOrderList;

/* Styled Components */
const Content = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  flex-grow: 1;
  font-size: 14px;
  padding: 10px;
`;
const HeaderTitle = styled.h1`
  font-weight: 700;
  font-size: 16px;
  margin-bottom: 18px;
`;
const InfoBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`;
const TotalCountText = styled.div`
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
