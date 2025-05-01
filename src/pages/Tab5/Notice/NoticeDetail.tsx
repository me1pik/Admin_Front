import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import SettingsDetailSubHeader, {
  DetailSubHeaderProps,
} from '../../../components/Header/SettingsDetailSubHeader';
import SettingsDetailTopBoxes from '../../../components/SettingsDetailTopBoxes';
import ShippingTabBar from '../../../components/TabBar';
import SettingsDetailTable, {
  SettingsDetailRow,
} from '../../../components/Table/Setting/SettingsDetailTable';
import ReusableModal2 from '../../../components/OneButtonModal';
import { TabItem } from '../../../components/Header/SearchSubHeader';
import {
  getNotice,
  createNotice,
  updateNotice,
  deleteNotice,
  ApiNotice,
} from '../../../api/Notice/NoticeApi';

interface NoticeDetailProps {
  isCreate?: boolean;
  selectOptions?: TabItem[];
}

const defaultNoticeOptions: TabItem[] = [
  { label: '공지', path: '' },
  { label: '안내', path: '' },
];

const NoticeDetail: React.FC<NoticeDetailProps> = ({
  isCreate = false,
  selectOptions: propOptions,
}) => {
  const navigate = useNavigate();
  const location = useLocation() as { state?: { selectOptions: TabItem[] } };
  const { no } = useParams<{ no: string }>();
  const numericNo = isCreate ? undefined : Number(no);

  const options = isCreate
    ? (propOptions ?? defaultNoticeOptions)
    : (location.state?.selectOptions ?? defaultNoticeOptions);

  // form state
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(options[0].label);
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('관리자');

  // modal state
  const [activeTab, setActiveTab] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');

  // load existing notice on edit
  useEffect(() => {
    if (!isCreate && numericNo) {
      getNotice(numericNo).then((data: ApiNotice) => {
        setTitle(data.title);
        setCategory(data.type);
        setContent(data.content);
        setAuthor(data.author);
      });
    }
  }, [isCreate, numericNo]);

  const handleBack = () => navigate(-1);
  const handleSave = () => {
    setModalTitle(isCreate ? '등록 완료' : '변경 완료');
    setModalMessage(
      isCreate
        ? '새 공지사항을 등록하시겠습니까?'
        : '변경 내용을 저장하시겠습니까?'
    );
    setIsModalOpen(true);
  };
  const handleDelete = () => {
    setModalTitle('삭제 완료');
    setModalMessage('공지사항을 삭제하시겠습니까?');
    setIsModalOpen(true);
  };

  const handleConfirm = async () => {
    setIsModalOpen(false);
    try {
      if (modalTitle === '등록 완료') {
        await createNotice({ title, type: category, content, author });
      } else if (modalTitle === '변경 완료' && numericNo) {
        await updateNotice(numericNo, {
          title,
          type: category,
          content,
          author,
        });
      } else if (modalTitle === '삭제 완료' && numericNo) {
        await deleteNotice(numericNo);
      }
    } catch (err) {
      console.error(err);
    } finally {
      navigate(-1);
    }
  };

  const detailProps: DetailSubHeaderProps = {
    backLabel: '목록이동',
    onBackClick: handleBack,
    editLabel: isCreate ? '등록하기' : '변경저장',
    onEditClick: handleSave,
    endLabel: isCreate ? '취소' : '삭제',
    onEndClick: isCreate ? handleBack : handleDelete,
  };

  const initialRow: SettingsDetailRow = { title, category, content };

  return (
    <Container>
      <HeaderRow>
        <Title>
          {isCreate ? '공지사항 등록' : `공지사항 상세 (${numericNo})`}
        </Title>
      </HeaderRow>

      <SettingsDetailSubHeader {...detailProps} />

      <ProductNumberWrapper>
        <ProductNumberLabel>번호</ProductNumberLabel>
        <ProductNumberValue>{numericNo ?? '-'}</ProductNumberValue>
      </ProductNumberWrapper>

      <SettingsDetailTopBoxes />
      <MiddleDivider />

      <ShippingTabBar
        tabs={['상세내용']}
        activeIndex={activeTab}
        onTabClick={setActiveTab}
      />

      {activeTab === 0 && (
        <SettingsDetailTable
          data={[initialRow]}
          selectOptions={options}
          onChange={(row: SettingsDetailRow) => {
            setTitle(row.title);
            setCategory(row.category);
            setContent(row.content);
          }}
        />
      )}

      <ReusableModal2
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
        title={modalTitle}
      >
        {modalMessage}
      </ReusableModal2>
    </Container>
  );
};

export default NoticeDetail;

const Container = styled.div`
  width: 100%;
  padding: 20px;
  font-family: 'NanumSquare Neo OTF', sans-serif;
`;
const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;
const Title = styled.h1`
  font-weight: 700;
  font-size: 16px;
`;
const ProductNumberWrapper = styled.div`
  display: flex;
  align-items: baseline;
  gap: 5px;
  margin: 10px 0 34px;
`;
const ProductNumberLabel = styled.div`
  font-weight: 700;
  font-size: 12px;
`;
const ProductNumberValue = styled.div`
  font-weight: 900;
  font-size: 12px;
`;
const MiddleDivider = styled.hr`
  border-top: 1px dashed #dddddd;
  margin: 30px 0;
`;
