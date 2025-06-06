// src/pages/Sales/SalesDetail.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import SettingsDetailSubHeader, {
  DetailSubHeaderProps,
} from '../../../components/Header/SettingsDetailSubHeader';
import ShippingTabBar from '../../../components/TabBar';
import ReusableModal2 from '../../../components/OneButtonModal';
import SalesDetailTopBoxes from '../../../components/SalesDetailTopBoxes';

interface SalesDetailProps {
  isCreate?: boolean;
}

interface OrderItem {
  no: number;
  date: string;
  account: string;
  avatarUrl: string;
  brand: string;
  styleCode: string;
  size: string;
  color: string;
  amount: number;
  status: string;
}

const SalesDetail: React.FC<SalesDetailProps> = ({ isCreate = false }) => {
  const navigate = useNavigate();
  const { no } = useParams<{ no: string }>();
  const numericNo = isCreate ? undefined : Number(no);

  const [activeTab, setActiveTab] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 더미 주문 데이터
  const [orders] = useState<OrderItem[]>([
    {
      no: 16,
      date: '2024-12-12',
      account: 'styleweex',
      avatarUrl: '/avatars/styleweex.png',
      brand: 'CC Collect',
      styleCode: 'C244WBSE231',
      size: '55 (M)',
      color: 'BLACK',
      amount: 240000,
      status: '결제완료',
    },
    {
      no: 15,
      date: '2024-12-12',
      account: 'jmert__eunrae',
      avatarUrl: '/avatars/default.png',
      brand: 'MOJO.S.PHINE',
      styleCode: 'J24MSE009',
      size: '55 (M)',
      color: 'PINK',
      amount: 180000,
      status: '결제완료',
    },
    {
      no: 14,
      date: '2024-12-12',
      account: 'jimmy.stagram',
      avatarUrl: '/avatars/default.png',
      brand: 'MOJO.S.PHINE',
      styleCode: 'J24MSE009',
      size: '55 (M)',
      color: 'BLACK',
      amount: 148000,
      status: '결제완료',
    },
    {
      no: 13,
      date: '2024-12-12',
      account: 'mikyooon___k',
      avatarUrl: '/avatars/default.png',
      brand: 'SATIN',
      styleCode: 'C244WT003',
      size: '55 (M)',
      color: 'BLACK',
      amount: 200000,
      status: '결제완료',
    },
    {
      no: 12,
      date: '2024-12-12',
      account: 'olivs0852193',
      avatarUrl: '/avatars/default.png',
      brand: 'ZOOC',
      styleCode: 'Z244MSE015',
      size: '55 (M)',
      color: 'PINK',
      amount: 150000,
      status: '결제완료',
    },
    {
      no: 11,
      date: '2024-12-12',
      account: 'blossom620',
      avatarUrl: '/avatars/default.png',
      brand: 'ZOOC',
      styleCode: 'Z244MSE015',
      size: '55 (M)',
      color: 'BLACK',
      amount: 148000,
      status: '결제완료',
    },
    {
      no: 10,
      date: '2024-12-12',
      account: 'blossom520',
      avatarUrl: '/avatars/default.png',
      brand: 'MOJO.S.PHINE',
      styleCode: 'J24MSE009',
      size: '55 (M)',
      color: 'LIGHT BEIGE',
      amount: 210000,
      status: '결제완료',
    },
  ]);

  const handleBack = () => navigate(-1);
  const handleSave = () => setIsModalOpen(true);
  const handleDelete = () => setIsModalOpen(true);
  const handleConfirm = () => {
    setIsModalOpen(false);
    navigate(-1);
  };

  const detailProps: DetailSubHeaderProps = {
    backLabel: '뒤로',
    onBackClick: handleBack,
    editLabel: isCreate ? '등록' : '저장',
    onEditClick: handleSave,
    endLabel: isCreate ? '취소' : '삭제',
    onEndClick: handleDelete,
  };

  return (
    <Container>
      <HeaderRow>
        <Title>{isCreate ? '판매 등록' : `판매 상세 (${numericNo})`}</Title>
      </HeaderRow>

      <SettingsDetailSubHeader {...detailProps} />

      <ProductNumberWrapper>
        <ProductNumberLabel>번호</ProductNumberLabel>
        <ProductNumberValue>{numericNo}</ProductNumberValue>
      </ProductNumberWrapper>

      <SalesDetailTopBoxes />

      <DividerDashed />

      <ShippingTabBar
        tabs={['상세내역']}
        activeIndex={activeTab}
        onTabClick={setActiveTab}
      />

      {activeTab === 0 && (
        <DetailSection>
          <Table>
            <colgroup>
              <col style={{ width: '50px' }} />
              <col style={{ width: '100px' }} />
              <col style={{ width: '150px' }} />
              <col style={{ width: '100px' }} />
              <col style={{ width: '150px' }} />
              <col style={{ width: '100px' }} />
              <col style={{ width: '100px' }} />
              <col style={{ width: '100px' }} />
              <col style={{ width: '100px' }} />
            </colgroup>
            <Thead>
              <TableRow>
                <Th>No.</Th>
                <Th>주문일</Th>
                <Th>주문자 (계정)</Th>
                <Th>브랜드</Th>
                <Th>스타일 (품번)</Th>
                <Th>사이즈</Th>
                <Th>제품색상</Th>
                <Th>결제금액</Th>
                <Th>결제상태</Th>
              </TableRow>
            </Thead>
            <Tbody>
              {orders.map((o) => (
                <TableRow key={o.no}>
                  <TdCenter>{o.no}</TdCenter>
                  <TdCenter>{o.date}</TdCenter>
                  <TdLeft>
                    <InstaContainer>
                      <Avatar />
                      <AccountText>{o.account}</AccountText>
                    </InstaContainer>
                  </TdLeft>
                  <TdCenter>{o.brand}</TdCenter>
                  <TdCenter>{o.styleCode}</TdCenter>
                  <TdCenter>{o.size}</TdCenter>
                  <TdCenter>{o.color}</TdCenter>
                  <TdCenter>{o.amount.toLocaleString()}원</TdCenter>
                  <TdCenter>{o.status}</TdCenter>
                </TableRow>
              ))}
            </Tbody>
          </Table>
        </DetailSection>
      )}

      <ReusableModal2
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
        title='확인'
      >
        저장하시겠습니까?
      </ReusableModal2>
    </Container>
  );
};

export default SalesDetail;

/* ===== styled-components ===== */

const Container = styled.div`
  width: 100%;
  min-width: 1000px;
  padding: 20px;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 700;
`;

const ProductNumberWrapper = styled.div`
  display: flex;
  align-items: baseline;
  gap: 5px;
  margin: 16px 0;
`;

const ProductNumberLabel = styled.div`
  font-weight: 700;
  font-size: 12px;
`;

const ProductNumberValue = styled.div`
  font-weight: 900;
  font-size: 12px;
`;

const DividerDashed = styled.hr`
  border: none;
  border-top: 1px dashed #dddddd;
  margin: 30px 0;
`;

const DetailSection = styled.div`
  overflow-x: auto;
`;

/* 테이블 */
const Table = styled.table`
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  background-color: #ffffff;
  border: 1px solid #dddddd;
`;

const Thead = styled.thead`
  background-color: #eeeeee;
`;

const Tbody = styled.tbody``;

const TableRow = styled.tr`
  height: 44px;
  &:nth-child(even) {
    background-color: #fafafa;
  }
`;

const Th = styled.th`
  text-align: center;
  vertical-align: middle;

  font-weight: 800;
  font-size: 12px;
  color: #000000;
  border: 1px solid #dddddd;
  white-space: nowrap;
`;

const TdCenter = styled.td`
  text-align: center;
  vertical-align: middle;

  font-weight: 400;
  font-size: 12px;
  color: #000000;
  border: 1px solid #dddddd;
  white-space: nowrap;
`;

const TdLeft = styled(TdCenter)`
  text-align: left;
  padding-left: 12px;
`;

const InstaContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Avatar = styled.div`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background-color: #cccccc;
  flex-shrink: 0;
`;

const AccountText = styled.span`
  font-weight: 400;
  font-size: 12px;
  color: #007bff;
  cursor: pointer;
  &:hover {
    color: #0056b3;
  }
`;
