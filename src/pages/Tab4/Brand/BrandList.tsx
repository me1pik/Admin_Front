import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import BrandTable, { BrandItem } from '../../../components/Table/BrandTable';
import SubHeader, { TabItem } from '../../../components/Header/SearchSubHeader';
import Pagination from '../../../components/Pagination';
import RegisterButton from '../../../components/RegisterButton';
// API 불러오기
import { getAdminBrandList, AdminBrand } from '../../../api/brand/brandApi';

const mapAdminBrandToBrandItem = (b: AdminBrand): BrandItem => {
  return {
    no: b.id,
    group: b.groupName,
    brand: b.brandName,
    quantity: b.productNum,
    discount: b.discount_rate,
    manager: b.contactPerson,
    contact: b.contactNumber,
    registerDate: '',
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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchTerm = (searchParams.get('search') ?? '').toLowerCase();
  const page = parseInt(searchParams.get('page') ?? '1', 10);
  const limit = 10;
  const [selectedTab, setSelectedTab] = useState<TabItem>(tabs[0]);

  useEffect(() => {
    const fetchAdminBrands = async () => {
      setIsLoading(true);
      try {
        const data = await getAdminBrandList();
        setBrandData(data.map(mapAdminBrandToBrandItem));
      } catch (err) {
        console.error('관리자용 브랜드 목록 조회 실패:', err);
        setError('브랜드 목록을 불러오는 중 오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchAdminBrands();
  }, []);

  const handleTabChange = (tab: TabItem) => {
    setSelectedTab(tab);
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

  const dataByTab = brandData.filter((item) =>
    selectedTab.label === '전체보기' ? true : item.status === selectedTab.label
  );
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
