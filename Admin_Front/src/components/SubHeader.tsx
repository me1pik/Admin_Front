// src/components/SubHeader.tsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FiSearch } from 'react-icons/fi';
import { useNavigate, useLocation } from 'react-router-dom';
import NewIcon from '../assets/New.svg';

interface SubHeaderProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  searchType: string; // 추가
  setSearchType: (value: string) => void; // 추가
}

const SubHeader: React.FC<SubHeaderProps> = ({
  searchTerm,
  setSearchTerm,
  searchType,
  setSearchType,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<string>('');

  useEffect(() => {
    const getActiveTab = () => {
      if (location.pathname === '/user/all') {
        return '전체보기';
      } else if (location.pathname === '/user/blocked') {
        return '블럭회원';
      } else if (location.pathname === '/user') {
        return '일반회원';
      } else {
        return '일반회원';
      }
    };

    setActiveTab(getActiveTab());
  }, [location]);

  const handleTabClick = (tabName: string, path: string) => {
    setActiveTab(tabName);
    navigate(path);
  };

  // searchType, setSearchType를 실제로 사용할 수 있다면 여기서 사용하세요.
  // 예: 탭 클릭 시 searchType을 바꾼다거나, 특정 상황에서만 검색 방식을 바꾸는 식으로.

  return (
    <HeaderContainer>
      <TabContainer>
        <TabButton
          active={activeTab === '전체보기'}
          onClick={() => handleTabClick('전체보기', '/user/all')}
          isFirst
        >
          전체보기
          {activeTab === '전체보기' && <NewBadge src={NewIcon} alt='New' />}
        </TabButton>
        <TabButton
          active={activeTab === '일반회원'}
          onClick={() => handleTabClick('일반회원', '/user')}
        >
          일반회원
          {activeTab === '일반회원' && <NewBadge src={NewIcon} alt='New' />}
        </TabButton>
        <TabButton
          active={activeTab === '블럭회원'}
          onClick={() => handleTabClick('블럭회원', '/user/blocked')}
          isLast
        >
          블럭회원
          {activeTab === '블럭회원' && <NewBadge src={NewIcon} alt='New' />}
        </TabButton>
      </TabContainer>
      <SearchContainer>
        <SearchInput
          type='text'
          placeholder='검색'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <SearchIcon />
      </SearchContainer>
    </HeaderContainer>
  );
};

export default SubHeader;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  background: #f9f9f9;
  border: 1px solid #dddddd;

  margin-bottom: 20px;
`;

const TabContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: auto; /* 탭 영역이 왼쪽에 위치 */
  background: #eeeeee;
  border: 1px solid #dddddd;
  border-radius: 8px 0px 0px 8px;
  overflow: visible;
`;

interface TabButtonProps {
  active: boolean;
  isFirst?: boolean;
  isLast?: boolean;
}

const TabButton = styled.button<TabButtonProps>`
  position: relative;
  background-color: ${({ active }) => (active ? '#f0f0f0' : '#ffffff')};
  color: ${({ active }) => (active ? '#007bff' : '#000000')};
  border: none;
  border-right: 1px solid #cccccc;
  padding: 14px 27px;
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 700;
  font-size: 12px;
  line-height: 13px;
  text-align: center;
  cursor: pointer;

  ${({ isFirst, isLast }) =>
    isFirst
      ? 'border-top-left-radius: 8px; border-bottom-left-radius: 8px;'
      : isLast
        ? 'border-top-right-radius: 8px; border-bottom-right-radius: 8px;'
        : ''}

  &:last-child {
    border-right: none;
  }
`;

const NewBadge = styled.img`
  position: absolute;
  top: -10px;
  right: -10px;
  width: 24px;
  height: 24px;
  z-index: 1;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const SearchInput = styled.input`
  padding: 12px;
  font-size: 14px;
  border: 1px solid #dddddd;
  border-radius: 4px;
  width: 230px;
  padding-right: 30px;
`;

const SearchIcon = styled(FiSearch)`
  position: absolute;
  right: 10px;
  color: #6c757d;
  font-size: 16px;
`;
