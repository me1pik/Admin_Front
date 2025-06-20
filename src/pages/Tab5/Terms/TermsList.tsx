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

/**
 * 탭: 전체보기 외에는 category 필터로 사용
 * HeaderTitle이 '이용약관'이므로 type은 '이용약관'으로 고정 조회
 */
const tabs: TabItem[] = [
  { label: '전체보기', path: '' },
  { label: '서비스 정책', path: '서비스 정책' },
  { label: '판매정책', path: '판매정책' },
  { label: '훼손정책', path: '훼손정책' },
];

/** TermsDetail 이동 시 전달할 selectOptions */
const termsSelectOptions: TabItem[] = [
  { label: '서비스 정책', path: '서비스 정책' },
  { label: '판매정책', path: '판매정책' },
  { label: '훼손정책', path: '훼손정책' },
];

/**
 * API로부터 받아온 TermPolicyItem을 TermsTable용 TermsItem으로 매핑
 */
function mapToTermsItem(item: TermPolicyItem): TermsItem {
  // TermsItem: { no: number; type: string; content: string; author: string; createdAt: string; }
  // 여기서 type 필드는 UI에서 보여줄 category로 사용
  // content는 제목(title) 혹은 content 일부를 보여줄지 결정: 여기서는 title 사용
  // createdAt: ISO -> YYYY.MM.DD
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

  // API에서 받아온 전체 이용약관 리스트
  const [allTerms, setAllTerms] = useState<TermPolicyItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // 1) 마운트 시, 또는 selectedTab 변경 시 API 호출
  //    type은 '이용약관'으로 고정. category는 탭이 '전체보기'가 아닐 때에만 전달.
  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const params: { type: '이용약관'; category?: string } = {
          type: '이용약관',
        };
        if (selectedTab.label !== '전체보기') {
          params.category = selectedTab.label;
        }
        const items = await fetchTermPolicies(params);
        if (isMounted) {
          setAllTerms(items);
          // 페이지를 1로 초기화
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
    // selectedTab, setSearchParams 의존
  }, [selectedTab, setSearchParams]);

  // 2) client-side 검색어 필터링: allTerms -> filteredTermsItem
  const filteredTerms = useMemo(() => {
    return allTerms.filter((item) => {
      // mapToTermsItem으로 변환 후 문자열 포함 여부 확인
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

  // 3) 페이징: filteredTerms -> 현재 페이지 데이터
  const totalPages = Math.max(1, Math.ceil(filteredTerms.length / limit));
  const pageData = useMemo(() => {
    const start = (page - 1) * limit;
    return filteredTerms.slice(start, start + limit);
  }, [filteredTerms, page]);

  // 탭 변경 핸들러
  const onTabChange = useCallback(
    (tab: TabItem) => {
      setSelectedTab(tab);
      // 검색어와 페이지 초기화: 검색어는 유지하거나 초기화할지 선택; 여기서는 페이지만 초기화
      setSearchParams((prev) => {
        const entries = Object.fromEntries(prev.entries());
        entries.page = '1';
        return entries;
      });
    },
    [setSearchParams]
  );

  // 행 클릭 시 상세 페이지로 이동
  const onRowClick = useCallback(
    (_: string, no: number) => {
      navigate(`/termsDetail/${no}`, {
        state: { selectOptions: termsSelectOptions },
      });
    },
    [navigate]
  );

  // 등록하기 버튼 클릭
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
          // 페이지 변경 시 query param 'page' 업데이트
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
