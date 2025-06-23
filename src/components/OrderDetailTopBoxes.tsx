// src/components/OrderDetailTopBoxes.tsx
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import userDetailImg2 from '../assets/userDetailImg2.svg';
import storeDetailImg from '../assets/storeDetailImg.svg';
import {
  getRentalSchedulesByUserId,
  RentalScheduleByUserIdItem,
} from '../api/RentalSchedule/RentalScheduleApi';

interface Props {
  userId: number;
}

const OrderDetailTopBoxes: React.FC<Props> = ({ userId }) => {
  const [data, setData] = useState<RentalScheduleByUserIdItem | null>(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const schedules = await getRentalSchedulesByUserId(userId);
        if (schedules.length > 0) setData(schedules[0]);
      } catch (err) {
        console.error('OrderDetailTopBoxes: 요약 정보 조회 실패', err);
      }
    };
    fetchSummary();
  }, [userId]);

  const formatDateTime = (iso: string) => {
    const d = new Date(iso);
    const date = d.toISOString().split('T')[0];
    const time = d.toTimeString().split(' ')[0];
    return `${date} (${time})`;
  };

  return (
    <Container>
      <BoxWrapper>
        <Box>
          <IconPlaceholder>
            <IconImage src={userDetailImg2} alt='User' />
          </IconPlaceholder>
          <Content>
            <Row>
              <Label>{data?.userName ?? '-'}</Label>
              <Value>({data?.nickname ?? '-'})</Value>
            </Row>
            <Row>
              <Value>{data?.userEmail ?? '-'}</Value>
            </Row>
            <Row>
              <Label>이용자</Label>
              <Value>({data?.userMembership ?? '-'})</Value>
            </Row>
          </Content>
        </Box>

        <Divider />

        <Box>
          <IconPlaceholder>
            <IconImage src={storeDetailImg} alt='Store' />
          </IconPlaceholder>
          <Content>
            <Row>
              <Label>신청일</Label>
              <Value>{data ? formatDateTime(data.createAt) : '-'}</Value>
            </Row>
            <Row>
              <Label>주문번호</Label>
              <Value>{data?.orderNum ?? '-'}</Value>
            </Row>
            <Row>
              <Label>취소일</Label>
              <Value>
                {data?.cancelAt ? formatDateTime(data.cancelAt) : '-'}
              </Value>
            </Row>
          </Content>
        </Box>

        <Divider />

        <Box>
          <Content>
            <Row>
              <Label>포인트 사용</Label>
              <Value>
                {data
                  ? data.pointUsed > 0
                    ? `${data.pointUsed.toLocaleString()}원`
                    : '미사용'
                  : '-'}
              </Value>
            </Row>
            <Row>
              <Label>추가비용</Label>
              <Value>
                {data
                  ? data.extraCharge > 0
                    ? `${data.extraCharge.toLocaleString()}원`
                    : '없음'
                  : '-'}
              </Value>
            </Row>
          </Content>
        </Box>
      </BoxWrapper>
    </Container>
  );
};

export default OrderDetailTopBoxes;

// (생략되지 않은 styled-components는 기존과 동일)

/* ======================= Styled Components ======================= */

const Container = styled.div`
  width: 100%;
  min-width: 1000px;
`;

const BoxWrapper = styled.div`
  display: flex;
  border: 1px solid #dddddd;
  border-radius: 4px;
  overflow: hidden;
`;

const Box = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  padding: 12px 20px;
`;

const Divider = styled.div`
  width: 1px;
  background-color: #dddddd;
`;

const IconPlaceholder = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background-color: #fafafa;
  margin-right: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const IconImage = styled.img`
  width: 72px;
  height: 72px;
  object-fit: cover;
  border-radius: 50%;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.span`
  font-weight: 800;
  font-size: 12px;
  color: #000;
  white-space: nowrap;
`;

const Value = styled.span`
  font-weight: 400;
  font-size: 12px;
  color: #000;
`;
