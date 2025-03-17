import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import styled, { keyframes } from "styled-components";
import InputField from "../components/InputField";
import ReusableModal from "../components/ReusableModal";
import { schemaLogin } from "../hooks/ValidationYup";

type LoginFormInputs = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("알림");
  const [modalMessage, setModalMessage] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(schemaLogin),
    mode: "onChange",
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (data: LoginFormInputs) => {
    if (data.email === "admin@naver.com" && data.password === "qwer1234") {
      setModalTitle("로그인 성공");
      setModalMessage("로그인에 성공했습니다.");
      setIsModalOpen(true);
    } else {
      setModalTitle("로그인 실패");
      setModalMessage("아이디와 비밀번호를 확인해주세요.");
      setIsModalOpen(true);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    if (modalTitle === "로그인 성공") {
      navigate("/adminlist");
    }
  };

  return (
    <Container>
      <LoginContainer>
        <Header>
          <Title>관리자 로그인</Title>
        </Header>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <InputField
                label="계정(이메일)"
                id="email"
                type="text"
                placeholder="example@domain.com"
                error={errors.email}
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <InputField
                label="비밀번호"
                id="password"
                type="password"
                placeholder="비밀번호를 입력하세요"
                error={errors.password}
                {...field}
              />
            )}
          />
          <ButtonRow>
            <LoginButton type="submit">로그인</LoginButton>
          </ButtonRow>
        </Form>
      </LoginContainer>
      <ReusableModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        title={modalTitle}
        width="300px"
        height="200px"
      >
        {modalMessage}
      </ReusableModal>
    </Container>
  );
};

export default Login;

/* ===== Styled Components ===== */

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

/* Container를 뷰포트 전체로 설정하여 중앙 정렬 */
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #f2f2f2;
`;

const LoginContainer = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 300px;
  animation: ${fadeIn} 0.5s ease-out;
`;

const Header = styled.div`
  margin-bottom: 30px;
  text-align: center;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 24px;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const ButtonRow = styled.div`
  margin-top: 20px;
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 15px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  background-color: #f6ae24;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.2s ease;

  &:hover {
    background-color: #e59c20;
    transform: translateY(-2px);
  }
  &:active {
    background-color: #cc8c1c;
    transform: translateY(0);
  }
`;
