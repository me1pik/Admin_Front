// src/pages/ProductRegister.tsx
import React from 'react';
import styled from 'styled-components';

const ProductRegister: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('제품 등록 완료!');
  };

  return (
    <Container>
      {/* 상단 영역: 제목 + 우측 버튼 */}
      <HeaderRow>
        <Title>제품관리</Title>
        <ButtonGroup>
          <BlackButton>저장하기</BlackButton>
          <GrayButton>취소</GrayButton>
        </ButtonGroup>
      </HeaderRow>

      {/* 번호 */}
      <ProductNumber>번호 13486</ProductNumber>
      <TopDivider />

      {/* 폼 시작 */}
      <FormWrapper onSubmit={handleSubmit}>
        {/* 1행: 3개 컬럼 (제품 기본정보 / 종류 및 사이즈 설정 / 제품 가격) */}
        <ThreeColumnRow>
          {/* 컬럼 1: 제품 기본정보 */}
          <SectionBox>
            <SectionHeader>
              <Bullet />
              <SectionTitle>제품 기본정보</SectionTitle>
            </SectionHeader>

            <InputRow>
              <Label>브랜드</Label>
              <Select defaultValue='MICHAA'>
                <option value='MICHAA'>MICHAA</option>
                <option value='CC Collect'>CC Collect</option>
                <option value='SATIN'>SATIN</option>
                <option value='ZZOC'>ZZOC</option>
              </Select>
            </InputRow>

            <InputRow>
              <Label>품번</Label>
              <Input placeholder='예) MIOCWOP011' />
            </InputRow>

            <InputRow>
              <Label>시즌</Label>
              <Select defaultValue='2025년 봄 시즌'>
                <option value='2025년 봄 시즌'>2025년 봄 시즌</option>
                <option value='2024년 가을 시즌'>2024년 가을 시즌</option>
              </Select>
            </InputRow>
          </SectionBox>

          {/* 컬럼 2: 종류 및 사이즈 설정 */}
          <SectionBox>
            <SectionHeader>
              <Bullet />
              <SectionTitle>종류 및 사이즈 설정</SectionTitle>
            </SectionHeader>

            <InputRow>
              <Label>종류</Label>
              <Select defaultValue='원피스'>
                <option value='원피스'>원피스</option>
                <option value='블라우스'>블라우스</option>
                <option value='팬츠'>팬츠</option>
                <option value='스커트'>스커트</option>
              </Select>
            </InputRow>
            <InputRow>
              <Label>사이즈</Label>
              <Select>
                <option value='44(S)'>44(S)</option>
                <option value='55(M)'>55(M)</option>
                <option value='66(L)'>66(L)</option>
                <option value='77(XL)'>77(XL)</option>
                <option value='FREE'>FREE</option>
              </Select>
            </InputRow>
            <InputRow>
              <Label>색상</Label>
              <Select defaultValue='CREAM'>
                <option value='BLACK'>BLACK</option>
                <option value='PINK'>PINK</option>
                <option value='CREAM'>CREAM</option>
                <option value='GRAY'>GRAY</option>
              </Select>
            </InputRow>
          </SectionBox>

          {/* 컬럼 3: 제품 가격 */}
          <SectionBox>
            <SectionHeader>
              <Bullet />
              <SectionTitle>제품 가격</SectionTitle>
            </SectionHeader>

            <InputRow>
              <Label>리테일</Label>
              <Input placeholder='1,390,000' />
            </InputRow>
            <InputRow>
              <Label>판매</Label>
              <Input placeholder='1,250,000' />
            </InputRow>
            <InputRow>
              <Label>대여</Label>
              <Input placeholder='50,000' />
            </InputRow>
          </SectionBox>
        </ThreeColumnRow>

        <MiddleDivider />

        {/* 2행: 사이즈 가이드 (왼쪽 표, 오른쪽 이미지) */}
        <TwoColumnRow>
          {/* 왼쪽: 사이즈 표 */}
          <SectionBox style={{ flex: '0 0 600px' }}>
            <SectionHeader>
              <Bullet />
              <SectionTitle>사이즈 가이드</SectionTitle>
            </SectionHeader>

            <SizeGuideTable>
              <thead>
                <tr>
                  <th />
                  <th>A(어깨)</th>
                  <th>B(가슴)</th>
                  <th>C(허리)</th>
                  <th>D(팔길이)</th>
                  <th>E(총길이)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>44(S)</td>
                  <td>
                    <InputSmall placeholder='37.5' />
                  </td>
                  <td>
                    <InputSmall placeholder='85.1' />
                  </td>
                  <td>
                    <InputSmall placeholder='67.3' />
                  </td>
                  <td>
                    <InputSmall placeholder='55.2' />
                  </td>
                  <td>
                    <InputSmall placeholder='113.3' />
                  </td>
                </tr>
                <tr>
                  <td>55(M)</td>
                  <td>
                    <InputSmall placeholder='37.5' />
                  </td>
                  <td>
                    <InputSmall placeholder='85.1' />
                  </td>
                  <td>
                    <InputSmall placeholder='67.3' />
                  </td>
                  <td>
                    <InputSmall placeholder='55.2' />
                  </td>
                  <td>
                    <InputSmall placeholder='113.3' />
                  </td>
                </tr>
                <tr>
                  <td>66(L)</td>
                  <td>
                    <InputSmall placeholder='37.5' />
                  </td>
                  <td>
                    <InputSmall placeholder='85.1' />
                  </td>
                  <td>
                    <InputSmall placeholder='67.3' />
                  </td>
                  <td>
                    <InputSmall placeholder='55.2' />
                  </td>
                  <td>
                    <InputSmall placeholder='113.3' />
                  </td>
                </tr>
                <tr>
                  <td>77(XL)</td>
                  <td>
                    <InputSmall placeholder='37.5' />
                  </td>
                  <td>
                    <InputSmall placeholder='85.1' />
                  </td>
                  <td>
                    <InputSmall placeholder='67.3' />
                  </td>
                  <td>
                    <InputSmall placeholder='55.2' />
                  </td>
                  <td>
                    <InputSmall placeholder='113.3' />
                  </td>
                </tr>
                <tr>
                  <td>Free(F)</td>
                  <td>
                    <InputSmall placeholder='37.5' />
                  </td>
                  <td>
                    <InputSmall placeholder='85.1' />
                  </td>
                  <td>
                    <InputSmall placeholder='67.3' />
                  </td>
                  <td>
                    <InputSmall placeholder='55.2' />
                  </td>
                  <td>
                    <InputSmall placeholder='113.3' />
                  </td>
                </tr>
              </tbody>
            </SizeGuideTable>
            <Note>*측정 위치에 따라 약간의 오차 있음.</Note>
          </SectionBox>

          {/* 오른쪽: 사이즈 표기 이미지 영역 */}
          <SectionBox style={{ flex: '0 0 auto', display: 'flex' }}>
            <SectionHeader>
              <Bullet />
              <SectionTitle>사이즈 표기</SectionTitle>
            </SectionHeader>

            <SizeImage>
              <SizeImageBox>이미지</SizeImageBox>
              <p>
                A. 어깨넓이
                <br />
                B. 가슴둘레
                <br />
                C. 허리둘레
                <br />
                D. 팔길이
                <br />
                E. 총길이
              </p>
            </SizeImage>
          </SectionBox>
        </TwoColumnRow>

        <MiddleDivider />

        {/* 제품 소재정보: 체크박스 형태 */}
        <SectionBox>
          <SectionHeader>
            <Bullet />
            <SectionTitle>제품 소재정보</SectionTitle>
          </SectionHeader>
          <Column style={{ maxWidth: '500px' }}>
            <CheckGroupRow>
              <Label>두께감</Label>
              <CheckGroup>
                <CheckboxLabel>
                  <Checkbox name='thickness' value='매우 두꺼움' />
                  매우 두꺼움
                </CheckboxLabel>
                <CheckboxLabel>
                  <Checkbox name='thickness' value='두꺼움' />
                  두꺼움
                </CheckboxLabel>
                <CheckboxLabel>
                  <Checkbox name='thickness' value='적당' defaultChecked />
                  적당
                </CheckboxLabel>
                <CheckboxLabel>
                  <Checkbox name='thickness' value='얇음' />
                  얇음
                </CheckboxLabel>
              </CheckGroup>
            </CheckGroupRow>

            <CheckGroupRow>
              <Label>신축성</Label>
              <CheckGroup>
                <CheckboxLabel>
                  <Checkbox name='elasticity' value='좋음' />
                  좋음
                </CheckboxLabel>
                <CheckboxLabel>
                  <Checkbox name='elasticity' value='약간있음' />
                  약간있음
                </CheckboxLabel>
                <CheckboxLabel>
                  <Checkbox name='elasticity' value='없음' defaultChecked />
                  없음
                </CheckboxLabel>
                <CheckboxLabel>
                  <Checkbox name='elasticity' value='허리벤딩' />
                  허리벤딩
                </CheckboxLabel>
              </CheckGroup>
            </CheckGroupRow>

            <CheckGroupRow>
              <Label>안감</Label>
              <CheckGroup>
                <CheckboxLabel>
                  <Checkbox name='lining' value='정체안감' />
                  정체안감
                </CheckboxLabel>
                <CheckboxLabel>
                  <Checkbox name='lining' value='부분안감' />
                  부분안감
                </CheckboxLabel>
                <CheckboxLabel>
                  <Checkbox name='lining' value='기모안감' defaultChecked />
                  기모안감
                </CheckboxLabel>
                <CheckboxLabel>
                  <Checkbox name='lining' value='안감없음' />
                  안감없음
                </CheckboxLabel>
              </CheckGroup>
            </CheckGroupRow>

            <CheckGroupRow>
              <Label>촉감</Label>
              <CheckGroup>
                <CheckboxLabel>
                  <Checkbox name='touch' value='뻣뻣함' />
                  뻣뻣함
                </CheckboxLabel>
                <CheckboxLabel>
                  <Checkbox name='touch' value='까슬함' />
                  까슬함
                </CheckboxLabel>
                <CheckboxLabel>
                  <Checkbox name='touch' value='적당' defaultChecked />
                  적당
                </CheckboxLabel>
                <CheckboxLabel>
                  <Checkbox name='touch' value='부드러움' />
                  부드러움
                </CheckboxLabel>
              </CheckGroup>
            </CheckGroupRow>

            <CheckGroupRow>
              <Label>비침</Label>
              <CheckGroup>
                <CheckboxLabel>
                  <Checkbox name='transparency' value='비침있음' />
                  비침있음
                </CheckboxLabel>
                <CheckboxLabel>
                  <Checkbox name='transparency' value='약간있음' />
                  약간있음
                </CheckboxLabel>
                <CheckboxLabel>
                  <Checkbox name='transparency' value='적당' defaultChecked />
                  적당
                </CheckboxLabel>
                <CheckboxLabel>
                  <Checkbox name='transparency' value='비침없음' />
                  비침없음
                </CheckboxLabel>
              </CheckGroup>
            </CheckGroupRow>
          </Column>
        </SectionBox>

        <MiddleDivider />
        {/* 3행: 제품 원단정보 */}
        <SectionBox>
          <SectionHeader>
            <Bullet />
            <SectionTitle>제품 원단정보</SectionTitle>
          </SectionHeader>
          <MaterialRow>
            {/* 왼쪽: 겉감/안감/배색/부속 */}
            <Column style={{ maxWidth: '300px' }}>
              <InputRow>
                <Label>겉감</Label>
                1. <Input placeholder='' />
                2. <Input placeholder='' />
                3. <Input placeholder='' />
                4. <Input placeholder='' />
              </InputRow>
              <InputRow>
                <Label>안감</Label>
                1. <Input placeholder='' />
                2. <Input placeholder='' />
                3. <Input placeholder='' />
                4. <Input placeholder='' />
              </InputRow>
              <InputRow>
                <Label>배색</Label>
                1. <Input placeholder='' />
                2. <Input placeholder='' />
                3. <Input placeholder='' />
                4. <Input placeholder='' />
              </InputRow>
              <InputRow>
                <Label>부속</Label>
                1. <Input placeholder='' />
                2. <Input placeholder='' />
                3. <Input placeholder='' />
                4. <Input placeholder='' />
              </InputRow>
            </Column>
          </MaterialRow>
        </SectionBox>

        <MiddleDivider />
        {/* 4행: 제품 이미지 */}
        <SectionBox>
          <SectionHeader>
            <Bullet />
            <SectionTitle>제품 이미지</SectionTitle>
          </SectionHeader>

          <ImageRow>
            <ImageColumn>
              <ImageLabel>썸네일 이미지</ImageLabel>
              <ImageBox>이미지 추가</ImageBox>
            </ImageColumn>
            <ImageColumn>
              <ImageLabel>착장 이미지 1</ImageLabel>
              <ImageBox>이미지 추가</ImageBox>
            </ImageColumn>
            <ImageColumn>
              <ImageLabel>착장 이미지 2</ImageLabel>
              <ImageBox>이미지 추가</ImageBox>
            </ImageColumn>
            <ImageColumn>
              <ImageLabel>착장 이미지 3</ImageLabel>
              <ImageBox>이미지 추가</ImageBox>
            </ImageColumn>
          </ImageRow>
        </SectionBox>

        {/* 등록하기 버튼 */}
        <BottomDivider />
        <ButtonWrap>
          <SubmitButton type='submit'>등록하기</SubmitButton>
        </ButtonWrap>
      </FormWrapper>
    </Container>
  );
};

export default ProductRegister;

/* ======================= Styled Components ======================= */
const Container = styled.div`
  width: 100%;
  max-width: 1366px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
  font-family: 'NanumSquare Neo OTF', sans-serif;
`;

/* 상단 헤더 */
const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 700;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

const BlackButton = styled.button`
  background-color: #000;
  color: #fff;
  padding: 6px 12px;
  border: none;
  cursor: pointer;
`;

const GrayButton = styled.button`
  background-color: #ccc;
  color: #000;
  padding: 6px 12px;
  border: none;
  cursor: pointer;
`;

const ProductNumber = styled.div`
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 10px;
`;

/* 구분선 */
const TopDivider = styled.hr`
  border: 0;
  border-top: 1px solid #dddddd;
  margin-bottom: 20px;
`;

const MiddleDivider = styled.hr`
  border: 0;
  border-top: 1px dashed #dddddd;
  margin: 30px 0;
`;

const BottomDivider = styled.hr`
  border: 0;
  border-top: 1px solid #dddddd;
  margin: 40px 0 20px;
`;

/* 폼 래퍼 */
const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
`;

/* 레이아웃 */
const ThreeColumnRow = styled.div`
  display: flex;
  gap: 20px;
`;

const TwoColumnRow = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 10px;
`;

/* 섹션 박스(블릿 + 왼쪽 라인) */
const SectionBox = styled.div`
  position: relative;
  margin-bottom: 20px;
  padding-left: 20px;
  border-left: 1px solid #dddddd;
`;

/* 섹션 헤더(블릿 + 타이틀) */
const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 10px;
`;

/* 블릿 (원형 + 안쪽 오렌지) */
const Bullet = styled.div`
  position: absolute;
  left: -27px; /* border-left 너비의 절반 정도 */
  top: 0px;
  width: 14px;
  height: 14px;
  border: 1px solid #dddddd;
  border-radius: 50%;
  background: #fff;

  &::after {
    content: '';
    position: absolute;
    top: 4px;
    left: 4px;
    width: 6px;
    height: 6px;
    background: #f6ae24;
    border-radius: 50%;
  }
`;

const SectionTitle = styled.div`
  font-size: 14px;
  font-weight: 700;
  margin-left: 10px; /* 블릿과 타이틀 사이 여백 */
`;

const InputRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

/* 라벨: 섹션 디바이더(라인)와 연결되는 선형 구조 – divider의 길이를 20px만큼 줄임 */
const Label = styled.label`
  position: relative;
  min-width: 50px;
  font-size: 12px;
  font-weight: 700;
  margin-right: 10px;
  padding-left: 10px;
  &::before {
    content: '';
    position: absolute;
    left: -20px; /* 섹션박스의 border와 label 사이 간격 조정 */
    top: 50%;
    transform: translateY(-50%);
    width: 20px; /* 기존 길이에서 20px만큼 줄임 */
    height: 1px;
    background: #dddddd;
  }
`;

const Select = styled.select`
  flex: 1;
  height: 32px;
  border: 1px solid #ddd;
  padding: 0 8px;
  font-size: 12px;
`;

const Input = styled.input`
  flex: 1;
  height: 32px;
  border: 1px solid #ddd;
  padding: 0 8px;
  font-size: 12px;
`;

/* 사이즈 테이블 */
const SizeGuideTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;

  th,
  td {
    border: 1px solid #ddd;
    text-align: center;
    font-size: 12px;
    padding: 4px;
  }

  th {
    background-color: #f9f9f9;
  }
`;

const InputSmall = styled.input`
  width: 50px;
  height: 28px;
  border: 1px solid #ddd;
  font-size: 12px;
  text-align: center;
`;

const Note = styled.div`
  font-size: 12px;
  color: #aaa;
  margin-top: 5px;
`;

/* 사이즈 표기 이미지 */
const SizeImage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  text-align: center;
  margin-top: 10px;
`;

const SizeImageBox = styled.div`
  width: 100px;
  height: 150px;
  border: 1px solid #ddd;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`;

/* 소재정보(왼쪽/오른쪽) */
const MaterialRow = styled.div`
  display: flex;
  gap: 20px;
`;

/* 체크박스 그룹 */
const CheckGroupRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const CheckGroup = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 12px;
  margin-right: 8px;
`;

/* 체크박스: 기본 appearance 제거 후, 체크 시 노란색 적용 */
const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  appearance: none;
  width: 16px;
  height: 16px;
  border: 1px solid #ddd;
  margin-right: 4px;
  cursor: pointer;
  display: inline-block;
  vertical-align: middle;
  &:checked {
    background-color: #f6ae24;
    border-color: #f6ae24;
  }
`;

const ImageRow = styled.div`
  display: flex;
  gap: 20px;
`;

const ImageColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImageLabel = styled.div`
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 5px;
`;

const ImageBox = styled.div`
  width: 120px;
  height: 150px;
  border: 1px solid #ddd;
  background-color: #d9d9d9;
  font-size: 12px;
  color: #999;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const SubmitButton = styled.button`
  width: 120px;
  height: 40px;
  background-color: #f6ae24;
  border: none;
  font-weight: 700;
  color: #fff;
  cursor: pointer;
  &:hover {
    background-color: #ffb84a;
  }
`;

const Column = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;
