// src/pages/OrderList.tsx
import React, { useState } from "react";
import styled from "styled-components";
import OrderTable, { Order } from "../components/OrderTable";
import SubHeader, { TabItem } from "../components/SubHeader";
import Pagination from "../components/Pagination";

/** 주문 더미 데이터 (paymentDate 제거) */
const dummyOrders: Order[] = [
  {
    no: 13486,
    orderDate: "2024-12-12",
    buyerAccount: "style_hwan",
    brand: "CC Collect",
    styleCode: "CA234ES321",
    size: "55 (M)",
    productOption: "BLACK",
    paymentMethod: "일시불",
    paymentStatus: "결제 완료", // 파란색
  },
  {
    no: 13485,
    orderDate: "2024-12-12",
    buyerAccount: "jmarr_sunwoo",
    brand: "M.IO.DES.PHNE",
    styleCode: "20MEE090",
    size: "55 (M)",
    productOption: "PINK",
    paymentMethod: "카드결제",
    paymentStatus: "취소일정", // 검은색
  },
  {
    no: 13484,
    orderDate: "2024-12-12",
    buyerAccount: "jimmyInstagram",
    brand: "M.IO.DES.PHNE",
    styleCode: "20MEE090",
    size: "55 (M)",
    productOption: "BLACK",
    paymentMethod: "계좌이체",
    paymentStatus: "환불 진행중", // 빨간색
  },
  {
    no: 13483,
    orderDate: "2024-12-12",
    buyerAccount: "mkkyoons_k",
    brand: "SATIN",
    styleCode: "24AGT609",
    size: "55 (M)",
    productOption: "PINK",
    paymentMethod: "계좌이체",
    paymentStatus: "환불 완료", // 노란색
  },
  {
    no: 13482,
    orderDate: "2024-12-12",
    buyerAccount: "olive3625",
    brand: "ZZOC",
    styleCode: "12MEE099",
    size: "55 (M)",
    productOption: "BLACK",
    paymentMethod: "카드결제",
    paymentStatus: "결제실패", // 회색
  },
  {
    no: 13481,
    orderDate: "2024-12-12",
    buyerAccount: "biscossiny520",
    brand: "MOMOA",
    styleCode: "23APY010",
    size: "55 (M)",
    productOption: "LIGHT BEIGE",
    paymentMethod: "일시불",
    paymentStatus: "결제 완료", // 파란색
  },
  {
    no: 13480,
    orderDate: "2024-12-12",
    buyerAccount: "biscossiny520",
    brand: "MOMOA",
    styleCode: "23APY010",
    size: "55 (M)",
    productOption: "GRAY",
    paymentMethod: "카드결제",
    paymentStatus: "취소일정", // 검은색
  },
  {
    no: 13479,
    orderDate: "2024-12-12",
    buyerAccount: "biscossiny520",
    brand: "MOMOA",
    styleCode: "23APY010",
    size: "55 (M)",
    productOption: "LIGHT BLUE",
    paymentMethod: "계좌이체",
    paymentStatus: "환불 진행중", // 빨간색
  },
];

/** 서브헤더 탭: 전체보기 / 주문내역 / 완료내역 / 취소내역 */
const tabs: TabItem[] = [
  { label: "전체보기", path: "" },
  { label: "주문내역", path: "주문내역" },
  { label: "완료내역", path: "결제 완료" }, // 결제 완료만 필터링
  { label: "취소내역", path: "취소일정" }, // 취소일정만 필터링
];

const OrderList: React.FC = () => {
  // 검색 상태
  const [searchTerm, setSearchTerm] = useState("");
  // 기본 검색 분류: "buyerAccount" (주문자)
  const [searchType, setSearchType] = useState("buyerAccount");

  // 현재 선택된 탭 상태 (기본값: "전체보기")
  const [selectedTab, setSelectedTab] = useState<TabItem>(tabs[0]);

  // 주문 목록 (임시 데이터)
  const [orderData] = useState<Order[]>(dummyOrders);

  // 탭 변경 시
  const handleTabChange = (tab: TabItem) => {
    setSelectedTab(tab);
    setPage(1);
  };

  // 탭 필터링
  const dataByTab = orderData.filter((item) => {
    if (selectedTab.label === "전체보기") return true;
    if (selectedTab.label === "주문내역") {
      // 실제 로직에 맞춰 필터링 or 전체
      return true;
    }
    return item.paymentStatus === selectedTab.path;
  });

  // 검색 로직
  // 검색 분류: buyerAccount(주문자), brand(브랜드), productOption(제품명), paymentStatus(결제상태)
  const filteredData = dataByTab.filter((item) => {
    const lowerTerm = searchTerm.toLowerCase();

    if (searchType === "buyerAccount") {
      return item.buyerAccount.toLowerCase().includes(lowerTerm);
    } else if (searchType === "brand") {
      return item.brand.toLowerCase().includes(lowerTerm);
    } else if (searchType === "productOption") {
      return item.productOption.toLowerCase().includes(lowerTerm);
    } else if (searchType === "paymentStatus") {
      return item.paymentStatus.toLowerCase().includes(lowerTerm);
    }
    return true;
  });

  // 페이지네이션 상태
  const [page, setPage] = useState(1);
  const limit = 10;

  // 페이지네이션 계산
  const totalCount = filteredData.length;
  const totalPages = Math.ceil(totalCount / limit);
  const offset = (page - 1) * limit;
  const currentPageData = filteredData.slice(offset, offset + limit);

  // 예: 주문자 계정 클릭 시 이벤트
  const handleEdit = (account: string) => {
    alert(`주문자 계정(${account}) 클릭됨`);
  };

  return (
    <Content>
      <HeaderTitle>일반 주문내역</HeaderTitle>
      <SubHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        searchType={searchType}
        setSearchType={setSearchType}
        tabs={tabs}
        onTabChange={handleTabChange}
      />
      <InfoBar>
        <TotalCount>Total: {totalCount}</TotalCount>
      </InfoBar>
      <TableContainer>
        <OrderTable filteredData={currentPageData} handleEdit={handleEdit} />
      </TableContainer>
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </Content>
  );
};

export default OrderList;

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
  font-family: "NanumSquare Neo OTF", sans-serif;
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
  font-family: "NanumSquare Neo OTF", sans-serif;
  font-weight: 900;
  font-size: 12px;
  color: #000000;
`;

const TableContainer = styled.div`
  box-sizing: border-box;
`;
