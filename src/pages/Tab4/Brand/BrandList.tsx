// src/pages/Tab4/Brand/BrandList.tsx

import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import BrandTable, { BrandItem } from '../../../components/Table/BrandTable';
import SubHeader, { TabItem } from '../../../components/Header/SearchSubHeader';
import Pagination from '../../../components/Pagination';
import RegisterButton from '../../../components/RegisterButton';
import { getAdminBrandList, AdminBrand } from '../../../api/brand/brandApi';

// --------------------
// AdminBrand → BrandItem 매핑 함수
// --------------------
const mapAdminBrandToBrandItem = (b: AdminBrand): BrandItem => {
  return {
    no: b.id,
    group: b.groupName,
    brand: b.brandName,
    // 백엔드에 quantity, discount, registerDate, status 필드가 없으므로
    // 필요하다면 실제 API 스펙에 맞춰 여기 값을 수정하세요.
    quantity: 0,
    discount: 0,
    manager: b.contactPerson,
    contact: b.contactNumber,
    registerDate: '', // 예: b.registerDate 가 있다면 사용
    status: b.isActive ? '등록완료' : '계약종료', // 혹은 b.isPopular, b.isActive 조합으로 변경
  };
};

const tabs: TabItem[] = [
  { label: '전체보기', path: '' },
  { label: '등록완료', path: '등록완료' },
  { label: '등록대기', path: '등록대기' },
  { label: '계약종료', path: '계약종료' },
];

const BrandList: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // API에서 불러온 원본 데이터(AdminBrand)
  const [adminBrands, setAdminBrands] = useState<AdminBrand[]>([]);
  // 화면용 데이터(BrandItem)
  const [brandData, setBrandData] = useState<BrandItem[]>([]);
  // 로딩/에러 상태
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // URL 쿼리 값: search, page
  const searchTerm = (searchParams.get('search') ?? '').toLowerCase();
  const page = parseInt(searchParams.get('page') ?? '1', 10);
  const limit = 10;

  const [selectedTab, setSelectedTab] = useState<TabItem>(tabs[0]);

  // 1) 컴포넌트 마운트 시 AdminBrand 목록 조회
  useEffect(() => {
    const fetchAdminBrands = async () => {
      setIsLoading(true);
      try {
        const data = await getAdminBrandList();
        setAdminBrands(data);
        // 매핑 후 brandData 세팅
        const mapped = data.map((b) => mapAdminBrandToBrandItem(b));
        setBrandData(mapped);
      } catch (err) {
        console.error('관리자용 브랜드 목록 조회 실패:', err);
        setError('브랜드 목록을 불러오는 중 오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdminBrands();
  }, []);

  // 탭 변경 시 URL의 page=1로 리셋
  const handleTabChange = (tab: TabItem) => {
    setSelectedTab(tab);
    const params = Object.fromEntries(searchParams.entries());
    params.page = '1';
    setSearchParams(params);
  };

  // 로딩 상태일 때
  if (isLoading) {
    return <LoadingMessage>브랜드 목록을 불러오는 중...</LoadingMessage>;
  }

  // 에러 상태일 때
  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  // 1차 탭별 필터링
  const dataByTab = brandData.filter((item) =>
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

  // 편집 버튼 클릭시
  const handleEdit = (no: number) => {
    navigate(`/Branddetail/${no}`);
  };

  // 브랜드 등록 버튼 클릭시
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

const LoadingMessage = styled.div`
  padding: 20px;
  text-align: center;
  font-size: 14px;
  color: #888;
`;

const ErrorMessage = styled.div`
  padding: 20px;
  text-align: center;
  font-size: 14px;
  color: red;
`;
