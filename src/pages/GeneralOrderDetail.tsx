import React, { useState } from 'react';
import styled from 'styled-components';
import GeneralOrderDetailTable, {
  GeneralOrderDetailItem,
} from '../components/Table/GeneralOrderTable';
import SubHeader, { TabItem } from '../components/Header/SearchSubHeader';
import Pagination from '../components/Pagination';

/** 일반주문내역 더미 데이터 (배송 관련 필드 제거, 결제 필드 추가) */
const dummyGeneralOrderDetail: GeneralOrderDetailItem[] = [
  {
    no: 13486,
    orderDate: '2024-12-12',
    buyerAccount: 'styleweex',
    brand: 'CC Collect',
    styleCode: '24AWSE231',
    size: '55 (M)',
    color: 'BLACK',
    paymentMethod: '일시불',
    paymentStatus: '결제완료', // 초록 (#4AA361)
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
    paymentStatus: '결제대기', // 파랑 (#3071B2)
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
    paymentStatus: '결제완료', // 초록 (#4AA361)
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
    paymentStatus: '결제완료', // 초록 (#4AA361)
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
    paymentStatus: '취소요청', // 검정 (#000000)
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
    paymentStatus: '환불 진행중', // 벽돌색 (#CD5542)
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
    paymentStatus: '결제완료', // 초록 (#4AA361)
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
    paymentStatus: '환불완료', // 주황 (#F39C12)
  },
];

/** 서브헤더 탭: 전체보기 / 진행내역 / 취소내역 */
const tabs: TabItem[] = [
  { label: '전체보기', path: '' },
  { label: '진행내역', path: '진행내역' },
  { label: '취소내역', path: '취소' },
];

const GeneralOrderDetail: React.FC = () => {
  // 검색 상태
  const [searchTerm, setSearchTerm] = useState('');

  // 현재 선택된 탭 상태 (기본값: "전체보기")
  const [selectedTab, setSelectedTab] = useState<TabItem>(tabs[0]);

  // 일반주문내역 목록 (임시 데이터)
  const [GeneralOrderDetailData] = useState<GeneralOrderDetailItem[]>(
    dummyGeneralOrderDetail
  );

  // 탭 변경 시
  const handleTabChange = (tab: TabItem) => {
    setSelectedTab(tab);
    setPage(1);
  };

  /**
   * 탭 필터링:
   * - "전체보기": 모든 데이터
   * - "진행내역": 결제상태가 '취소요청', '환불 진행중', '결제실패'가 아닌 항목
   * - "취소내역": 결제상태가 '취소요청', '환불 진행중', '결제실패'인 항목
   */
  const dataByTab = GeneralOrderDetailData.filter((item) => {
    if (selectedTab.label === '전체보기') return true;
    if (selectedTab.label === '진행내역') {
      return !(
        item.paymentStatus === '취소요청' ||
        item.paymentStatus === '환불 진행중' ||
        item.paymentStatus === '결제실패'
      );
    }
    if (selectedTab.label === '취소내역') {
      return (
        item.paymentStatus === '취소요청' ||
        item.paymentStatus === '환불 진행중' ||
        item.paymentStatus === '결제실패'
      );
    }
    return true;
  });

  // 검색 로직: 모든 문자열 필드 및 번호(no)도 문자열 변환 후 검색
  const filteredData = dataByTab.filter((item) => {
    const lowerTerm = searchTerm.toLowerCase();
    return (
      String(item.no).includes(lowerTerm) ||
      item.orderDate.toLowerCase().includes(lowerTerm) ||
      item.buyerAccount.toLowerCase().includes(lowerTerm) ||
      item.brand.toLowerCase().includes(lowerTerm) ||
      item.styleCode.toLowerCase().includes(lowerTerm) ||
      item.size.toLowerCase().includes(lowerTerm) ||
      item.color.toLowerCase().includes(lowerTerm) ||
      item.paymentMethod.toLowerCase().includes(lowerTerm) ||
      item.paymentStatus.toLowerCase().includes(lowerTerm)
    );
  });

  // 페이지네이션 상태
  const [page, setPage] = useState(1);
  const limit = 10;
  const totalCount = filteredData.length;
  const totalPages = Math.ceil(totalCount / limit);
  const offset = (page - 1) * limit;
  const currentPageData = filteredData.slice(offset, offset + limit);

  // 주문자(계정) 클릭 시 이벤트
  const handleEdit = (account: string) => {
    alert(`주문자 계정(${account}) 클릭됨`);
  };

  return (
    <Content>
      <HeaderTitle>일반주문 내역</HeaderTitle>
      <SubHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        tabs={tabs}
        onTabChange={handleTabChange}
      />
      <InfoBar>
        <TotalCountText>Total: {totalCount}</TotalCountText>
      </InfoBar>
      <TableContainer>
        <GeneralOrderDetailTable
          filteredData={currentPageData}
          handleEdit={handleEdit}
        />
      </TableContainer>
      <FooterRow>
        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      </FooterRow>
    </Content>
  );
};

export default GeneralOrderDetail;

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

const TotalCountText = styled.div`
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 900;
  font-size: 12px;
  color: #000000;
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
