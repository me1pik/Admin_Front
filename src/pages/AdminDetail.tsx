// src/pages/UserDetail.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import ListButtonDetailSubHeader, {
  DetailSubHeaderProps,
} from '../components/Header/ListButtonDetailSubHeader';
import AdminDetailTopBoxes from '../components/AdminDetailTopBoxes';
import ShippingTabBar from '../components/TabBar';
// 작업내역 테이블
import TaskHistoryTable, {
  TaskHistoryRow,
} from '../components/Table/admin/TaskHistoryTable';
// 권한설정 테이블 (새로운 구조)
import PermissionSettingsTable, {
  PermissionGroup,
} from '../components/Table/admin/PermissionSettingsTable';

import Pagination from '../components/Pagination';

const dummyProducts = [{ no: 5 }];

// 탭 목록
const tabs = ['작업내역', '권한설정'];

/** 작업내역 더미 데이터 (동일) */
const dummyTaskData: TaskHistoryRow[] = [
  {
    workDate: '서비스 > 제품목록 관리',
    workContent:
      '변경전 작업내용을 기여합니다. 관리자 내 상세 변경된 내용을 검토 및 반영',
    changedAt: '2025-03-02 00:00:00',
  },
  // ...생략
];

/**
 * 권한설정 더미 데이터 (이미지 구조)
 * - 카테고리: 관리자, 회원, 서비스, 고객센터
 * - 각 카테고리에 대해 여러 권한(체크박스)
 */
const dummyPermissionData: PermissionGroup[] = [
  {
    category: '관리자',
    permissions: [
      { label: '관리자 관리', checked: true },
      { label: '분석정보 목록', checked: false },
      // 필요한 만큼 추가
    ],
  },
  {
    category: '회원',
    permissions: [
      { label: '회원관리', checked: true },
      { label: '페이지 목록', checked: false },
      { label: '스케줄 목록', checked: false },
      { label: '판매내역', checked: false },
      { label: '정산내역', checked: true },
    ],
  },
  {
    category: '서비스',
    permissions: [
      { label: '제품목록', checked: true },
      { label: '브랜드 목록', checked: false },
      { label: '마켓 주문내역', checked: false },
      { label: '일반 주문내역', checked: false },
      { label: '모니터링', checked: false },
    ],
  },
  {
    category: '고객센터',
    permissions: [
      { label: '공지사항', checked: false },
      { label: '이용약관', checked: false },
      { label: '개인정보보호', checked: false },
      { label: 'FAQ', checked: false },
    ],
  },
];

const AdminDetail: React.FC = () => {
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

  // 탭 클릭 시 페이지를 1로 초기화
  const handleTabClick = (index: number) => {
    setActiveTab(index);
    setPage(1);
  };

  // 현재 활성 탭에 해당하는 전체 데이터 반환
  const getActiveData = (): any[] => {
    switch (activeTab) {
      case 0:
        return dummyTaskData;
      case 1:
        return dummyPermissionData;
      default:
        return [];
    }
  };

  const activeData = getActiveData();
  const totalPages = Math.max(1, Math.ceil(activeData.length / pageSize));

  // 현재 페이지에 해당하는 데이터 슬라이스 (작업내역과 달리, 권한설정은 굳이 페이지 필요없으면 생략 가능)
  const sliceData = (data: any[]) =>
    data.slice((page - 1) * pageSize, page * pageSize);

  const renderTable = () => {
    const slicedData = sliceData(activeData);
    switch (activeTab) {
      case 0:
        return <TaskHistoryTable data={slicedData} />;
      case 1:
        // 권한설정
        return <PermissionSettingsTable data={slicedData} />;
      default:
        return null;
    }
  };

  return (
    <Container>
      <HeaderRow>
        <Title>제품관리</Title>
      </HeaderRow>

      <ListButtonDetailSubHeader {...detailSubHeaderProps} />

      <ProductNumberWrapper>
        <ProductNumberLabel>번호</ProductNumberLabel>
        <ProductNumberValue>{dummyProducts[0].no}</ProductNumberValue>
      </ProductNumberWrapper>

      <AdminDetailTopBoxes />

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

export default AdminDetail;

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
