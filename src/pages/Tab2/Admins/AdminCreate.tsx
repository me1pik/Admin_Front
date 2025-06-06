// src/pages/Tab2/Admins/AdminCreate.tsx

import React, { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SettingsDetailSubHeader, {
  DetailSubHeaderProps,
} from '../../../components/Header/SettingsDetailSubHeader';
import { createAdmin, AdminCreateRequest } from '../../../api/admin';

const AdminCreate: React.FC = () => {
  const navigate = useNavigate();

  // 폼 입력값 상태 관리
  const [formData, setFormData] = useState<AdminCreateRequest>({
    id: '',
    name: '',
    password: '',
    email: '',
    role: 'admin',
    status: 'active',
  });

  // isSubmitting: 제출 중 여부 (첫 번째 요소는 사용하지 않으므로 언더바로 처리)
  const [, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // 입력 필드 변경 핸들러
  const handleChange =
    (key: keyof AdminCreateRequest) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setFormData((prev) => ({
        ...prev,
        [key]: e.target.value,
      }));
    };

  // 저장 버튼 클릭 시 모달 없이 바로 API 호출
  const handleSave = async () => {
    setErrorMessage(null);

    // 간단한 유효성 검사
    if (
      !formData.id.trim() ||
      !formData.name.trim() ||
      !formData.password.trim() ||
      !formData.email.trim()
    ) {
      setErrorMessage('모든 필드를 빠짐없이 입력해주세요.');
      return;
    }

    try {
      setIsSubmitting(true);
      await createAdmin(formData); // POST /admin 호출
      // 생성 완료 후 목록 페이지로 이동
      navigate('/adminlist');
    } catch (err: any) {
      console.error('관리자 생성 오류', err);
      setErrorMessage(
        err?.response?.data?.message || '관리자 생성 중 오류가 발생했습니다.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // 취소 버튼 클릭 시 목록으로 돌아가기
  const handleCancel = () => {
    navigate('/adminlist');
  };

  // SettingsDetailSubHeader에 내려줄 props
  const detailProps: DetailSubHeaderProps = {
    backLabel: '목록이동',
    onBackClick: handleCancel,
    editLabel: '등록하기',
    onEditClick: handleSave,
    endLabel: '취소',
    onEndClick: handleCancel,
  };

  return (
    <Container>
      {/* === 헤더 영역 === */}
      <HeaderRow>
        <Title>관리자 등록</Title>
      </HeaderRow>

      {/* === 상단 서브헤더: 뒤로가기 / 등록하기 / 취소 버튼 === */}
      <SettingsDetailSubHeader {...detailProps} />

      {/* 구분선 */}
      <MiddleDivider />

      {/* === 폼 입력 영역 === */}
      <Form onSubmit={(e) => e.preventDefault()}>
        {errorMessage && <ErrorText>{errorMessage}</ErrorText>}

        <FormRow>
          <Label htmlFor='id'>아이디</Label>
          <Input
            type='text'
            id='id'
            value={formData.id}
            onChange={handleChange('id')}
            placeholder='예: admin1'
          />
        </FormRow>

        <FormRow>
          <Label htmlFor='name'>이름</Label>
          <Input
            type='text'
            id='name'
            value={formData.name}
            onChange={handleChange('name')}
            placeholder='예: 김철수'
          />
        </FormRow>

        <FormRow>
          <Label htmlFor='password'>비밀번호</Label>
          <Input
            type='password'
            id='password'
            value={formData.password}
            onChange={handleChange('password')}
            placeholder='비밀번호를 입력하세요'
          />
        </FormRow>

        <FormRow>
          <Label htmlFor='email'>이메일</Label>
          <Input
            type='email'
            id='email'
            value={formData.email}
            onChange={handleChange('email')}
            placeholder='예: admin1@example.com'
          />
        </FormRow>

        <FormRow>
          <Label htmlFor='role'>역할(Role)</Label>
          <Select
            id='role'
            value={formData.role}
            onChange={handleChange('role')}
          >
            <option value='admin'>admin</option>
            <option value='superadmin'>superadmin</option>
            {/* 필요에 따라 옵션 추가 */}
          </Select>
        </FormRow>

        <FormRow>
          <Label htmlFor='status'>상태(Status)</Label>
          <Select
            id='status'
            value={formData.status}
            onChange={handleChange('status')}
          >
            <option value='active'>active</option>
            <option value='blocked'>blocked</option>
            {/* 필요에 따라 옵션 추가 */}
          </Select>
        </FormRow>

        {/* 숨겨진 submit 버튼 (엔터 입력 시에도 동작하도록) */}
        <button type='submit' style={{ display: 'none' }}></button>
      </Form>

      {/* === 하단 여백 === */}
      <FooterSpacing />
    </Container>
  );
};

export default AdminCreate;

/* ====================== Styled Components ====================== */

const Container = styled.div`
  width: 100%;
  padding: 20px;
  background: #fff;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`;

const Title = styled.h1`
  font-weight: 700;
  font-size: 16px;
`;

const MiddleDivider = styled.hr`
  border-top: 1px dashed #dddddd;
  margin: 10px 0 30px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 18px;
`;

const Label = styled.label`
  width: 100px;
  flex-shrink: 0;
  font-size: 14px;
  font-weight: 600;
`;

const Input = styled.input`
  flex-grow: 1;
  padding: 8px 10px;
  max-width: 300px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;

  &:focus {
    outline: none;
    border-color: #4a90e2;
  }
`;

const Select = styled.select`
  flex-grow: 1;
  padding: 8px 10px;
  max-width: 200px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #fff;

  &:focus {
    outline: none;
    border-color: #4a90e2;
  }
`;

const ErrorText = styled.div`
  color: #e74c3c;
  font-size: 13px;
  margin-bottom: 18px;
  text-align: center;
`;

const FooterSpacing = styled.div`
  height: 50px;
`;
