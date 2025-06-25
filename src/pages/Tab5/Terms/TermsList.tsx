// src/pages/Settings/Terms/TermsList.tsx

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import TermsTable, {
  TermsItem,
} from '../../../components/Table/Setting/TermsTable';
import SubHeader, { TabItem } from '../../../components/Header/SearchSubHeader';
import Pagination from '../../../components/Pagination';
import RegisterButton from '../../../components/RegisterButton';

import { fetchTermPolicies, TermPolicyItem } from '../../../api/term/termApi';

const tabs: TabItem[] = [
  { label: '전체보기', path: '' },
  { label: '서비스 정책', path: '서비스 정책' },
  { label: '판매정책', path: '판매정책' },
  { label: '훼손정책', path: '훼손정책' },
];

const termsSelectOptions: TabItem[] = [
  { label: '서비스 정책', path: '서비스 정책' },
  { label: '판매정책', path: '판매정책' },
  { label: '훼손정책', path: '훼손정책' },
];

function mapToTermsItem(item: TermPolicyItem): TermsItem {
  const date = new Date(item.createdAt);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return {
    no: item.id,
    type: item.category,
    content: item.title,
    author: item.author,
    createdAt: `${year}.${month}.${day}`,
  };
}

const TermsList: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = (searchParams.get('search') ?? '').toLowerCase();

  const page = parseInt(searchParams.get('page') ?? '1', 10);
  const limit = 10;

  const [selectedTab, setSelectedTab] = useState<TabItem>(tabs[0]);

  const [allTerms, setAllTerms] = useState<TermPolicyItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // type 고정: '이용약관'
        const params: { type: '이용약관'; category?: string } = {
          type: '이용약관',
        };
        if (selectedTab.label && selectedTab.label !== '전체보기') {
          params.category = selectedTab.label;
        }
        console.log('[TermsList] fetchTermPolicies 호출, params=', params);
        const items = await fetchTermPolicies(params);
        if (isMounted) {
          setAllTerms(items);
          // 페이지 초기화
          setSearchParams((prev) => {
            const entries = Object.fromEntries(prev.entries());
            entries.page = '1';
            return entries;
          });
        }
      } catch (err) {
        console.error('이용약관 목록 조회 실패:', err);
        if (isMounted) {
          setError('이용약관 목록을 불러오는 중 오류가 발생했습니다.');
          setAllTerms([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };
    fetchData();
    return () => {
      isMounted = false;
    };
  }, [selectedTab, setSearchParams]);

  const filteredTerms = useMemo(() => {
    return allTerms.filter((item) => {
      const mapped = mapToTermsItem(item);
      return (
        String(mapped.no).includes(searchTerm) ||
        mapped.type.toLowerCase().includes(searchTerm) ||
        mapped.content.toLowerCase().includes(searchTerm) ||
        mapped.author.toLowerCase().includes(searchTerm) ||
        mapped.createdAt.includes(searchTerm)
      );
    });
  }, [allTerms, searchTerm]);

  const totalPages = Math.max(1, Math.ceil(filteredTerms.length / limit));
  const pageData = useMemo(() => {
    const start = (page - 1) * limit;
    return filteredTerms.slice(start, start + limit);
  }, [filteredTerms, page]);

  const onTabChange = useCallback(
    (tab: TabItem) => {
      setSelectedTab(tab);
      setSearchParams((prev) => {
        const entries = Object.fromEntries(prev.entries());
        entries.page = '1';
        return entries;
      });
    },
    [setSearchParams]
  );

  const onRowClick = useCallback(
    (_: string, no: number) => {
      navigate(`/termsDetail/${no}`, {
        state: { selectOptions: termsSelectOptions },
      });
    },
    [navigate]
  );

  const onCreateClick = () => {
    navigate('/createTerms');
  };

  return (
    <Content>
      <HeaderTitle>이용약관</HeaderTitle>

      <SubHeader tabs={tabs} onTabChange={onTabChange} />

      <InfoBar>
        {isLoading ? (
          <TotalCountText>로딩 중...</TotalCountText>
        ) : error ? (
          <TotalCountText style={{ color: 'red' }}>{error}</TotalCountText>
        ) : (
          <TotalCountText>Total: {filteredTerms.length}</TotalCountText>
        )}
      </InfoBar>

      <TableContainer>
        {isLoading ? (
          <div>로딩 중...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <TermsTable
            filteredData={pageData.map(mapToTermsItem)}
            handleEdit={onRowClick}
          />
        )}
      </TableContainer>

      <FooterRow>
        <Pagination
          totalPages={totalPages}
          currentPage={page}
          onPageChange={(newPage) => {
            setSearchParams((prev) => {
              const entries = Object.fromEntries(prev.entries());
              entries.page = String(newPage);
              return entries;
            });
          }}
          leftComponent={
            <RegisterButton text='등록하기' onClick={onCreateClick} />
          }
        />
      </FooterRow>
    </Content>
  );
};

export default TermsList;

/* Styled Components */
const Content = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  flex-grow: 1;
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
  width: 100%;
  margin-top: 40px;
`;
