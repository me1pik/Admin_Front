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
// 권한설정 테이블
import PermissionSettingsTable, {
  PermissionRow,
} from '../components/Table/admin/PermissionSettingsTable';

import Pagination from '../components/Pagination';

// 예시 제품 번호
const dummyProducts = [
  {
    no: 5,
  },
];

// 탭 목록
const tabs = ['작업내역', '권한설정'];

/** ─────────────────────────────
 *  작업내역 더미 데이터 수정
 *  - 컬럼: 작업일자, 작업내용, 변경일시 (변경내용 제거)
 *  ───────────────────────────── */
const dummyTaskData: TaskHistoryRow[] = [
  {
    workDate: '서비스 > 제품목록 관리',
    workContent:
      '변경전 작업내용을 기여합니다. 관리자 내 상세 변경된 내용을 검토 및 반영',
    changedAt: '2025-03-02 00:00:00',
  },
  {
    workDate: '서비스 > 회원목록 관리',
    workContent:
      '회원목록 검색 기능 수정(변경전). 관리자 내 상세 조회 항목 추가',
    changedAt: '2025-03-03 12:20:00',
  },
  {
    workDate: '서비스 > 주문목록 관리',
    workContent: '주문 취소 프로세스(변경전). 관리자 내 세부 권한 점검 필요',
    changedAt: '2025-03-04 09:15:30',
  },
  // 필요 시 더 많은 데이터 추가
];

/** ─────────────────────────────
 *  권한설정 더미 데이터 (기존과 동일)
 *  ───────────────────────────── */
const dummyPermissionData: PermissionRow[] = [
  {
    no: 42,
    applicationDate: '2025-03-10',
    role: '관리자',
    status: '활성',
    remarks: '전체 권한 부여',
  },
  {
    no: 41,
    applicationDate: '2025-03-10',
    role: '편집자',
    status: '비활성',
    remarks: '일부 권한 제한',
  },
  {
    no: 40,
    applicationDate: '2025-03-09',
    role: '조회자',
    status: '활성',
    remarks: '조회만 가능',
  },
];

const AdminDetail: React.FC = () => {
  // 현재 활성화된 탭 인덱스와 페이지 상태 관리
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

  // 현재 페이지에 해당하는 데이터 슬라이스
  const sliceData = (data: any[]) =>
    data.slice((page - 1) * pageSize, page * pageSize);

  const renderTable = () => {
    const slicedData = sliceData(activeData);
    switch (activeTab) {
      case 0:
        return <TaskHistoryTable data={slicedData} />;
      case 1:
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

      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
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
