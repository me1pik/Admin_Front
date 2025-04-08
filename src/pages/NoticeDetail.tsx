// src/pages/UserDetail.tsx (파일명은 예시입니다. 실제로는 NoticeDetail.tsx 등 원하는 이름 사용)
import React, { useState } from 'react';
import styled from 'styled-components';
import ListButtonDetailSubHeader, {
  DetailSubHeaderProps,
} from '../components/Header/ListButtonDetailSubHeader';
import NoticeDetailTopBoxes from '../components/NoticeDetailTopBoxes';
import ShippingTabBar from '../components/TabBar';
import NoticeDetailTable, {
  NoticeDetailRow,
} from '../components/Table/Setting/NoticeDetailTable';
import Pagination from '../components/Pagination';

const dummyProducts = [{ no: 5 }];

// 탭 목록 (상세내용만 1개)
const tabs = ['상세내용'];

/** 노티스 상세내용 더미 데이터 (이미지에 맞춰 구성) */
const dummyNoticeDetail: NoticeDetailRow = {
  title: '회사에서 제공하는 판매 서비스 사항',
  category: '개인정보처리방침',
  content: `본 약관은 주식회사 스타일윅스(이하 “회사”라 합니다.)가 제공하는 의류 및 잡화(이하 “제품”이라 합니다.) 대여 및 전자상거래에 관한 온/오프라인상의 제반 서비스(이하 “서비스”라 합니다.)를 이용함에 있어 회사와 회원의 권리와 의무에 대한 책임사항을 규정함을 목적으로 합니다..`,
};

const NoticeDetail: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  /** 버튼 핸들러들 */
  const handleBackClick = () => {
    window.history.back();
  };
  const handleEditClick = () => {
    alert('정보가 수정되었습니다!');
  };
  const handleEndClick = () => {
    alert('종료 처리가 완료되었습니다!');
  };

  const detailSubHeaderProps: DetailSubHeaderProps = {
    backLabel: '목록이동',
    onBackClick: handleBackClick,
    editLabel: '정보수정',
    onEditClick: handleEditClick,
    endLabel: '종료처리',
    onEndClick: handleEndClick,
  };

  // 탭 클릭 시 페이지를 1로 초기화 (여기서는 탭이 1개뿐이므로 의미는 적음)
  const handleTabClick = (index: number) => {
    setActiveTab(index);
    setPage(1);
  };

  // 실제 데이터 (현재는 dummy 한 개만)
  const noticeDetailData = [dummyNoticeDetail];

  // 페이지네이션 계산 (현재 탭이 1개뿐이라 사실상 의미 없음)
  const totalPages = 1; // 여기서는 1
  // renderTable
  const renderTable = () => {
    switch (activeTab) {
      case 0:
        // NoticeDetailTable에 배열로 넘겨주되, 1개 아이템만
        return <NoticeDetailTable data={noticeDetailData} />;
      default:
        return null;
    }
  };

  return (
    <Container>
      <HeaderRow>
        <Title>공지사항</Title>
      </HeaderRow>

      <ListButtonDetailSubHeader {...detailSubHeaderProps} />

      <ProductNumberWrapper>
        <ProductNumberLabel>번호</ProductNumberLabel>
        <ProductNumberValue>{dummyProducts[0].no}</ProductNumberValue>
      </ProductNumberWrapper>

      <NoticeDetailTopBoxes />

      <MiddleDivider />

      <ShippingTabBar
        tabs={tabs}
        activeIndex={activeTab}
        onTabClick={handleTabClick}
      />

      {renderTable()}

      <FooterRow>
        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      </FooterRow>
    </Container>
  );
};

export default NoticeDetail;

/* ====================== Styled Components ====================== */

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
  font-family: 'NanumSquare Neo OTF', sans-serif;
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const Title = styled.h1`
  font-family: 'NanumSquare Neo OTF';
  font-weight: 700;
  font-size: 16px;
  line-height: 18px;
  color: #000000;
`;

const ProductNumberWrapper = styled.div`
  display: flex;
  align-items: baseline;
  gap: 5px;
  margin: 10px 0;
  margin-top: 34px;
`;

const ProductNumberLabel = styled.div`
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 700;
  font-size: 12px;
  color: #000000;
`;

const ProductNumberValue = styled.div`
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 900;
  font-size: 12px;
  color: #000000;
`;

const MiddleDivider = styled.hr`
  border: 0;
  border-top: 1px dashed #dddddd;
  margin: 30px 0;
`;
const FooterRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
`;
