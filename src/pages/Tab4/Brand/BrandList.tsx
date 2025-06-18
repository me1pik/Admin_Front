// src/pages/Tab4/Brand/BrandList.tsx

import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import BrandTable, { BrandItem } from '../../../components/Table/BrandTable';
import SubHeader, { TabItem } from '../../../components/Header/SearchSubHeader';
import Pagination from '../../../components/Pagination';
import RegisterButton from '../../../components/RegisterButton';
// API 불러오기
import { getAdminBrandList, AdminBrand } from '../../../api/brand/brandApi';

/**
 * AdminBrand 스펙에 productCount가 포함되어 있을 수 있고,
 * 기존 코드에서 productNum을 사용했으나 스펙 변경에 따라 productCount로 매핑하거나 기본값 0 사용.
 * createdAt을 registerDate로 표시.
 */
const mapAdminBrandToBrandItem = (b: AdminBrand): BrandItem => {
  // productCount가 AdminBrand에 있으면 사용, 없으면 0
  const quantity =
    // @ts-ignore: AdminBrand 타입에 productCount가 있을 수 있다면 사용
    typeof (b as any).productCount === 'number' ? (b as any).productCount : 0;

  // createdAt을 YYYY-MM-DD 형태로 포맷
  let registerDateStr = '';
  if ((b as any).createdAt) {
    try {
      const date = new Date((b as any).createdAt);
      const yyyy = date.getFullYear();
      const mm = String(date.getMonth() + 1).padStart(2, '0');
      const dd = String(date.getDate()).padStart(2, '0');
      registerDateStr = `${yyyy}-${mm}-${dd}`;
    } catch {
      registerDateStr = String((b as any).createdAt);
    }
  }

  return {
    no: b.id,
    group: b.groupName,
    brand: b.brandName,
    quantity,
    discount: b.discount_rate,
    manager: b.contactPerson,
    contact: b.contactNumber,
    registerDate: registerDateStr,
    status: b.isActive ? '등록완료' : '계약종료',
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

  const [brandData, setBrandData] = useState<BrandItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // 검색어, 페이지 파라미터
  const searchTerm = (searchParams.get('search') ?? '').toLowerCase();
  const page = parseInt(searchParams.get('page') ?? '1', 10);
  const limit = 10;
  const [selectedTab, setSelectedTab] = useState<TabItem>(tabs[0]);

  useEffect(() => {
    const fetchAdminBrands = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getAdminBrandList();
        // 매핑
        const mapped = data.map(mapAdminBrandToBrandItem);
        setBrandData(mapped);
      } catch (err) {
        console.error('관리자용 브랜드 목록 조회 실패:', err);
        setError('브랜드 목록을 불러오는 중 오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchAdminBrands();
    // 빈 deps로 한 번만 호출
  }, []);

  const handleTabChange = (tab: TabItem) => {
    setSelectedTab(tab);
    // 탭 변경 시 페이지 1로 초기화, 기존 search는 유지
    const params = Object.fromEntries(searchParams.entries());
    params.page = '1';
    setSearchParams(params);
  };

  if (isLoading) {
    return <LoadingMessage>브랜드 목록을 불러오는 중...</LoadingMessage>;
  }
  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  // 탭 필터링: status 필드와 일치하는지 비교
  const dataByTab = brandData.filter((item) =>
    selectedTab.label === '전체보기' ? true : item.status === selectedTab.label
  );
  // 검색어 필터링
  const filteredData = dataByTab.filter((item) => {
    const t = searchTerm;
    const registerLower = item.registerDate
      ? item.registerDate.toLowerCase()
      : '';
    return (
      String(item.no).includes(t) ||
      item.group.toLowerCase().includes(t) ||
      item.brand.toLowerCase().includes(t) ||
      String(item.quantity).includes(t) ||
      String(item.discount).includes(t) ||
      item.manager.toLowerCase().includes(t) ||
      item.contact.toLowerCase().includes(t) ||
      registerLower.includes(t) ||
      item.status.toLowerCase().includes(t)
    );
  });

  const totalCount = filteredData.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / limit));
  const offset = (page - 1) * limit;
  const currentPageData = filteredData.slice(offset, offset + limit);

  const handleEdit = (no: number) => {
    // 상세 페이지 경로: /branddetail/:no
    navigate(`/branddetail/${no}`);
  };
  const handleRegisterClick = () => {
    // 등록 페이지가 있다면 해당 경로로. 예: /branddetail/create 혹은 별도 경로
    navigate(`/branddetail/create`);
    // 만약 별도 생성 페이지가 없다면, 적절히 수정하세요.
  };

  return (
    <Content>
      <HeaderTitle>브랜드 관리</HeaderTitle>
      <SubHeader
        tabs={tabs}
        onTabChange={handleTabChange}
        selectedTab={selectedTab}
      />
      <InfoBar>
        <TotalCount>Total: {totalCount}</TotalCount>
      </InfoBar>
      <TableContainer>
        <BrandTable filteredData={currentPageData} handleEdit={handleEdit} />
      </TableContainer>
      <FooterRow>
        <RegisterButton text='브랜드등록' onClick={handleRegisterClick} />
        <Pagination
          totalPages={totalPages}
          currentPage={page}
          onPageChange={(newPage) => {
            const params = Object.fromEntries(searchParams.entries());
            params.page = String(newPage);
            setSearchParams(params);
          }}
        />
      </FooterRow>
    </Content>
  );
};

export default BrandList;

/* styled-components */

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
