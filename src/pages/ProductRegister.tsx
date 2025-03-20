// src/pages/ProductRegister.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import DetailSubHeader, { TabItem } from '../components/DetailSubHeader';

const ProductRegister: React.FC = () => {
  const [images, setImages] = useState<(string | null)[]>([
    null,
    null,
    null,
    null,
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('제품 등록 완료!');
  };

  const handleTabChange = (tab: TabItem) => {
    // "변경저장", "취소" 중 어떤 버튼이 눌렸는지
    console.log('선택된 버튼:', tab.label);
    if (tab.label === '변경저장') {
      // 저장 로직
      alert('저장 로직 실행');
    } else {
      // 취소 로직
      alert('취소 로직 실행');
    }
  };

  // "변경저장", "취소" 두 버튼만 사용
  const tabs: TabItem[] = [{ label: '변경저장' }, { label: '취소' }];

  // 파일 업로드 핸들러: 선택된 파일을 읽어 이미지 URL로 변환하여 상태 업데이트
  const handleImageUpload = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages((prev) => {
          const newImages = [...prev];
          newImages[index] = reader.result as string;
          return newImages;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // 이미지 라벨 배열 (원하는 순서대로)
  const imageLabels = [
    '썸네일 이미지',
    '착장 이미지 1',
    '착장 이미지 2',
    '착장 이미지 3',
  ];

  return (
    <Container>
      {/* 상단 영역: 제목 + 우측 버튼 */}
      <HeaderRow>
        <Title>제품관리</Title>
      </HeaderRow>
      <DetailSubHeader tabs={tabs} onTabChange={handleTabChange} />

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
            <VerticalLine2 />

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
            <VerticalLine2 />

            <InputRow>
              <Label>종류</Label>
              <Select defaultValue='원피스'>
                <option value='원피스'>원피스</option>
                <option value='블라우스'>블라우스</option>
                <option value='팬츠'>팬츠</option>
                <option value='스커트'>스커트</option>
              </Select>
            </InputRow>

            {/* === 사이즈 선택을 체크박스로 구성 === */}
            <InputRow>
              <Label>사이즈</Label>
              <SizeCheckGroup>
                <SizeCheckboxLabel>
                  <SizeCheckbox value='44' />
                  44
                </SizeCheckboxLabel>

                <SizeCheckboxLabel>
                  <SizeCheckbox value='55' />
                  55
                </SizeCheckboxLabel>

                <SizeCheckboxLabel>
                  <SizeCheckbox value='66' />
                  66
                </SizeCheckboxLabel>

                <SizeCheckboxLabel>
                  <SizeCheckbox value='77' />
                  77
                </SizeCheckboxLabel>

                <SizeCheckboxLabel>
                  <SizeCheckbox value='FREE' />
                  FREE
                </SizeCheckboxLabel>
              </SizeCheckGroup>
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
            <VerticalLine2 />
            <InputRow>
              <Label>리테일</Label>
              <Input />
            </InputRow>
            <InputRow>
              <Label>판매</Label>
              <Input />
            </InputRow>
            <InputRow>
              <Label>대여</Label>
              <Input />
            </InputRow>
          </SectionBox>
        </ThreeColumnRow>

        <MiddleDivider />

        {/* 2행: 사이즈 가이드 (왼쪽 표, 오른쪽 이미지/표기) */}
        <TwoColumnRow>
          {/* 왼쪽: 사이즈 표 */}
          <SectionBox style={{ flex: '0 0 400px' }}>
            <SectionHeader>
              <Bullet />
              <SectionTitle>사이즈 가이드</SectionTitle>
            </SectionHeader>

            <VerticalLine1 />

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
                    <InputSmall />
                  </td>
                  <td>
                    <InputSmall />
                  </td>
                  <td>
                    <InputSmall />
                  </td>
                  <td>
                    <InputSmall />
                  </td>
                  <td>
                    <InputSmall />
                  </td>
                </tr>
                <tr>
                  <td>55(M)</td>
                  <td>
                    <InputSmall />
                  </td>
                  <td>
                    <InputSmall />
                  </td>
                  <td>
                    <InputSmall />
                  </td>
                  <td>
                    <InputSmall />
                  </td>
                  <td>
                    <InputSmall />
                  </td>
                </tr>
                <tr>
                  <td>66(L)</td>
                  <td>
                    <InputSmall />
                  </td>
                  <td>
                    <InputSmall />
                  </td>
                  <td>
                    <InputSmall />
                  </td>
                  <td>
                    <InputSmall />
                  </td>
                  <td>
                    <InputSmall />
                  </td>
                </tr>
                <tr>
                  <td>77(XL)</td>
                  <td>
                    <InputSmall />
                  </td>
                  <td>
                    <InputSmall />
                  </td>
                  <td>
                    <InputSmall />
                  </td>
                  <td>
                    <InputSmall />
                  </td>
                  <td>
                    <InputSmall />
                  </td>
                </tr>
                <tr>
                  <td>Free(F)</td>
                  <td>
                    <InputSmall />
                  </td>
                  <td>
                    <InputSmall />
                  </td>
                  <td>
                    <InputSmall />
                  </td>
                  <td>
                    <InputSmall />
                  </td>
                  <td>
                    <InputSmall />
                  </td>
                </tr>
              </tbody>
            </SizeGuideTable>
          </SectionBox>

          {/* 오른쪽: 사이즈 표기 이미지 + 텍스트 (flex로 구성) */}
          <SectionBox style={{ flex: '0 0 auto' }}>
            <SectionHeader>
              <Bullet />
              <SectionTitle>사이즈 표기</SectionTitle>
            </SectionHeader>

            <VerticalLine3 />

            {/* 아래부터는 절대 위치 대신 flex 레이아웃 적용 */}
            <SizeGuideContainer>
              <GuideWrapper>
                {/* 원피스 이미지 자리 (예: 썸네일 or Dummy) */}
                <DressImageContainer>
                  <DummyDress>이미지</DummyDress>
                </DressImageContainer>

                {/* 사이즈 표기 텍스트 */}
                <SizeInfoContainer>
                  <SpecTitle>[ 사이즈 표기 ]</SpecTitle>
                  <SpecRow>
                    <LabelColumn>
                      <SpecLabel>A. 어깨넓이</SpecLabel>
                      <SpecLabel>B. 가슴둘레</SpecLabel>
                      <SpecLabel>C. 허리둘레</SpecLabel>
                      <SpecLabel>D. 팔길이</SpecLabel>
                      <SpecLabel>E. 총길이</SpecLabel>
                    </LabelColumn>
                    <UnitColumn>
                      <Unit>( cm 기준 )</Unit>
                      <Unit>( cm 기준 )</Unit>
                      <Unit>( cm 기준 )</Unit>
                      <Unit>( cm 기준 )</Unit>
                      <Unit>( cm 기준 )</Unit>
                    </UnitColumn>
                  </SpecRow>
                  <Note>*측정 위치에 따라 약간의 오차 있음.</Note>
                </SizeInfoContainer>
              </GuideWrapper>
            </SizeGuideContainer>
          </SectionBox>
        </TwoColumnRow>

        <MiddleDivider />
        {/* 제품 소재정보: 체크박스 형태 */}
        <SectionBox>
          <SectionHeader>
            <Bullet />
            <SectionTitle>제품 소재정보</SectionTitle>
          </SectionHeader>

          <VerticalLine1 />

          <Column style={{ minWidth: '500px' }}>
            <CheckGroupRow>
              <Label>두께감</Label>
              <SizeCheckGroup>
                <SizeCheckboxLabel style={{ minWidth: '100px' }}>
                  <SizeCheckbox name='thickness' value='매우 두꺼움' />
                  매우 두꺼움
                </SizeCheckboxLabel>
                <SizeCheckboxLabel style={{ minWidth: '100px' }}>
                  <SizeCheckbox name='thickness' value='두꺼움' />
                  두꺼움
                </SizeCheckboxLabel>
                <SizeCheckboxLabel style={{ minWidth: '100px' }}>
                  <SizeCheckbox name='thickness' value='적당' defaultChecked />
                  적당
                </SizeCheckboxLabel>
                <SizeCheckboxLabel style={{ minWidth: '100px' }}>
                  <SizeCheckbox name='thickness' value='얇음' />
                  얇음
                </SizeCheckboxLabel>
              </SizeCheckGroup>
            </CheckGroupRow>

            <CheckGroupRow>
              <Label>신축성</Label>
              <SizeCheckGroup>
                <SizeCheckboxLabel style={{ minWidth: '100px' }}>
                  <SizeCheckbox name='elasticity' value='좋음' />
                  좋음
                </SizeCheckboxLabel>
                <SizeCheckboxLabel style={{ minWidth: '100px' }}>
                  <SizeCheckbox name='elasticity' value='약간있음' />
                  약간있음
                </SizeCheckboxLabel>
                <SizeCheckboxLabel style={{ minWidth: '100px' }}>
                  <SizeCheckbox name='elasticity' value='없음' defaultChecked />
                  없음
                </SizeCheckboxLabel>
                <SizeCheckboxLabel style={{ minWidth: '100px' }}>
                  <SizeCheckbox name='elasticity' value='허리벤딩' />
                  허리벤딩
                </SizeCheckboxLabel>
              </SizeCheckGroup>
            </CheckGroupRow>

            <CheckGroupRow>
              <Label>안감</Label>
              <SizeCheckGroup>
                <SizeCheckboxLabel style={{ minWidth: '100px' }}>
                  <SizeCheckbox name='lining' value='정체안감' />
                  정체안감
                </SizeCheckboxLabel>
                <SizeCheckboxLabel style={{ minWidth: '100px' }}>
                  <SizeCheckbox name='lining' value='부분안감' />
                  부분안감
                </SizeCheckboxLabel>
                <SizeCheckboxLabel style={{ minWidth: '100px' }}>
                  <SizeCheckbox name='lining' value='기모안감' defaultChecked />
                  기모안감
                </SizeCheckboxLabel>
                <SizeCheckboxLabel style={{ minWidth: '100px' }}>
                  <SizeCheckbox name='lining' value='안감없음' />
                  안감없음
                </SizeCheckboxLabel>
              </SizeCheckGroup>
            </CheckGroupRow>

            <CheckGroupRow>
              <Label>촉감</Label>
              <SizeCheckGroup>
                <SizeCheckboxLabel style={{ minWidth: '100px' }}>
                  <SizeCheckbox name='touch' value='뻣뻣함' />
                  뻣뻣함
                </SizeCheckboxLabel>
                <SizeCheckboxLabel style={{ minWidth: '100px' }}>
                  <SizeCheckbox name='touch' value='까슬함' />
                  까슬함
                </SizeCheckboxLabel>
                <SizeCheckboxLabel style={{ minWidth: '100px' }}>
                  <SizeCheckbox name='touch' value='적당' defaultChecked />
                  적당
                </SizeCheckboxLabel>
                <SizeCheckboxLabel style={{ minWidth: '100px' }}>
                  <SizeCheckbox name='touch' value='부드러움' />
                  부드러움
                </SizeCheckboxLabel>
              </SizeCheckGroup>
            </CheckGroupRow>

            <CheckGroupRow>
              <Label>비침</Label>
              <SizeCheckGroup>
                <SizeCheckboxLabel style={{ minWidth: '100px' }}>
                  <SizeCheckbox name='transparency' value='비침있음' />
                  비침있음
                </SizeCheckboxLabel>
                <SizeCheckboxLabel style={{ minWidth: '100px' }}>
                  <SizeCheckbox name='transparency' value='약간있음' />
                  약간있음
                </SizeCheckboxLabel>
                <SizeCheckboxLabel style={{ minWidth: '100px' }}>
                  <SizeCheckbox
                    name='transparency'
                    value='적당'
                    defaultChecked
                  />
                  적당
                </SizeCheckboxLabel>
                <SizeCheckboxLabel style={{ minWidth: '100px' }}>
                  <SizeCheckbox name='transparency' value='비침없음' />
                  비침없음
                </SizeCheckboxLabel>
              </SizeCheckGroup>
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

          <VerticalLine1 />

          <FabricTable>
            <thead>
              <tr>
                <th>구분</th>
                <th>1번</th>
                <th>2번</th>
                <th>3번</th>
                <th>4번</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>겉감</td>
                <td>
                  <Input placeholder='' />
                </td>
                <td>
                  <Input placeholder='' />
                </td>
                <td>
                  <Input placeholder='' />
                </td>
                <td>
                  <Input placeholder='' />
                </td>
              </tr>
              <tr>
                <td>안감</td>
                <td>
                  <Input placeholder='' />
                </td>
                <td>
                  <Input placeholder='' />
                </td>
                <td>
                  <Input placeholder='' />
                </td>
                <td>
                  <Input placeholder='' />
                </td>
              </tr>
              <tr>
                <td>배색</td>
                <td>
                  <Input placeholder='' />
                </td>
                <td>
                  <Input placeholder='' />
                </td>
                <td>
                  <Input placeholder='' />
                </td>
                <td>
                  <Input placeholder='' />
                </td>
              </tr>
              <tr>
                <td>부속</td>
                <td>
                  <Input placeholder='' />
                </td>
                <td>
                  <Input placeholder='' />
                </td>
                <td>
                  <Input placeholder='' />
                </td>
                <td>
                  <Input placeholder='' />
                </td>
              </tr>
            </tbody>
          </FabricTable>
        </SectionBox>

        <MiddleDivider />
        {/* 4행: 제품 이미지 */}
        <SectionBox>
          <SectionHeader>
            <Bullet />
            <SectionTitle>제품 이미지</SectionTitle>
          </SectionHeader>
          <VerticalLine3 />

          <ImageRow>
            {imageLabels.map((label, index) => (
              <ImageColumn key={index}>
                <label htmlFor={`image-upload-${index}`}>
                  <ImageBox>
                    {images[index] ? (
                      <img
                        src={images[index]!}
                        alt='Uploaded'
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    ) : (
                      <>
                        <PlusIcon>+</PlusIcon>
                        <ImageAddText>이미지 추가</ImageAddText>
                      </>
                    )}
                  </ImageBox>
                </label>
                <HiddenFileInput
                  id={`image-upload-${index}`}
                  type='file'
                  accept='image/*'
                  onChange={(e) => handleImageUpload(index, e)}
                />
                <ImageLabel>{label}</ImageLabel>
              </ImageColumn>
            ))}
          </ImageRow>
        </SectionBox>
        <BottomDivider />
      </FormWrapper>
    </Container>
  );
};

export default ProductRegister;

/* ======================= Styled Components ======================= */
const Container = styled.div`
  width: 100%;

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
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 18px;
  /* identical to box height */

  color: #000000;
`;

const ProductNumber = styled.div`
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 13px;
  margin-bottom: 20px;
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
  gap: 50px;
`;

const TwoColumnRow = styled.div`
  display: flex;
  gap: 50px;
  margin-bottom: 10px;
`;

/* 섹션 박스(블릿 + 왼쪽 라인) */
const SectionBox = styled.div`
  position: relative;
  margin-bottom: 20px;
  padding-left: 20px;
  /* border-left: 1px solid #dddddd; */
`;

/* 섹션 헤더(블릿 + 타이틀) */
const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 10px;
`;

const VerticalLine1 = styled.div`
  position: absolute;
  left: 0px;
  top: 14px;
  bottom: 20px;
  width: 1px;
  background: #dddddd;
`;

const VerticalLine2 = styled.div`
  position: absolute;
  left: 0px;
  top: 14px;
  bottom: 30px;
  width: 1px;
  background: #dddddd;
`;

const VerticalLine3 = styled.div`
  position: absolute;
  left: 0px;
  top: 14px;
  bottom: 200px;
  width: 1px;
  background: #dddddd;
  /* 세로선 하단에 가로선을 추가하여 ㄴ자 형태로 만듦 */
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 20px; /* 가로선 길이는 필요에 따라 조정 */
    height: 1px;
    background: #dddddd;
  }
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
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 800;
  font-size: 14px;
  line-height: 15px;
  margin-left: 10px; /* 블릿과 타이틀 사이 여백 */
`;

const InputRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

/* 라벨 */
const Label = styled.label`
  position: relative;
  min-width: 40px;
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 900;
  font-size: 12px;
  line-height: 13px;

  margin-right: 10px;
  padding-left: 10px;
  &::before {
    content: '';
    position: absolute;
    left: -20px; /* 섹션박스의 border와 label 사이 간격 조정 */
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 1px;
    background: #dddddd;
  }
`;

const Select = styled.select`
  flex: 1;
  height: 40px;
  border: 1px solid #000;
  padding: 0 8px;
  font-size: 12px;

  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 800;
  font-size: 12px;
  line-height: 13px;

  max-width: 180px;
`;

const Input = styled.input`
  flex: 1;
  height: 40px;
  max-width: 120px;

  border: 1px solid #ddd;
  padding: 0 8px;
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 13px;
`;

/* 사이즈 테이블 (왼쪽 표) */
const SizeGuideTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;

  th,
  td {
    border: 1px solid #ddd;
    text-align: center;
    font-family: 'NanumSquare Neo OTF';
    font-style: normal;
    font-weight: 900;
    font-size: 12px;
    line-height: 13px;

    color: #000000;

    padding: 4px;
    position: relative;
  }

  /* 첫 번째 열에 디바이더 추가 */
  th:first-child,
  td:first-child {
    padding-left: 10px;
  }

  td:first-child::before {
    content: '';
    position: absolute;
    left: -20px; /* SectionBox의 border와 맞추기 위해 */
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 1px;
    background: #dddddd;
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
  margin-top: 15px;
`;

/* ======================================
   오른쪽 "사이즈 표기" 영역 (flex로 구성)
====================================== */
const SizeGuideContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px; /* SectionBox 내부에서 약간 띄움 */
`;

const GuideWrapper = styled.div`
  display: flex;
  flex-direction: row;

  border: 1px solid #dddddd;
`;

/* 실제 원피스 이미지 컨테이너 */
const DressImageContainer = styled.div`
  width: 120px;
  height: 180px;
  background: #ffffff;

  border-radius: 4px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

// 여기서는 더미 박스를 사용(실제 사용 시 <img>로 교체)
const DummyDress = styled.div`
  width: 100px;
  height: 150px;
  background: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #999;
`;

/* 사이즈 표기 텍스트 박스 */
const SizeInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #ffffff;

  border-radius: 4px;
  padding: 20px;
`;

const SpecTitle = styled.div`
  font-size: 12px;
  font-weight: 800;
  margin-bottom: 10px;
`;

const SpecRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const LabelColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SpecLabel = styled.div`
  font-size: 12px;
  font-weight: 700;
`;

const UnitColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Unit = styled.div`
  font-size: 10px;
  font-weight: 400;
  color: #999999;
`;

/* 소재정보(왼쪽/오른쪽) 등은 기존과 동일 */
const CheckGroupRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const Column = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const FabricTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
  max-width: 766px;

  th,
  td {
    border: 1px solid #ddd;
    text-align: center;

    font-family: 'NanumSquare Neo OTF';
    font-style: normal;
    font-weight: 900;
    font-size: 12px;
    line-height: 13px;

    color: #000000;

    padding: 4px;
  }

  /* 본문 첫번째 셀에 divider 추가 */
  td:first-child {
    position: relative;
  }

  td:first-child::before {
    content: '';
    position: absolute;
    left: -20px; /* SectionBox의 border와 맞추기 위해 */
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 1px;
    background: #dddddd;
  }

  th {
    background-color: #f9f9f9;
  }
`;

/* 4행: 제품 이미지 */
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
  margin-top: 20px; /* 이미지 박스와 라벨 사이 간격 */
  text-align: center;
`;

const ImageBox = styled.div`
  width: 140px;
  height: 200px;
  border: 1px solid #ddd;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const PlusIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px; /* 아이콘 컨테이너의 너비 */
  height: 24px; /* 아이콘 컨테이너의 높이 */
  font-size: 20px; /* + 문자 크기 */
  color: #ddd;
  border: 1px solid #ddd;
  margin-bottom: 4px;
`;

/* "이미지 추가" 텍스트 */
const ImageAddText = styled.div`
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 13px;

  color: #dddddd;

  margin-top: 5px;
`;

// 사이즈 체크박스를 감싸는 래퍼 (가로로 나열)
const SizeCheckGroup = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

// 체크박스 + 텍스트를 한 묶음으로 클릭 가능하게
const SizeCheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;

  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 13px;

  color: #000000;
`;

// 실제 체크박스 스타일
const SizeCheckbox = styled.input.attrs({ type: 'checkbox' })`
  appearance: none;
  border: 1px solid #ddd;
  margin-bottom: 5px;
  width: 20px;
  height: 20px;
  margin-right: 5px;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  cursor: pointer;
  position: relative;

  &:checked::after {
    content: '';
    position: absolute;
    top: 3px;
    left: 3px;
    width: 10px;
    height: 5px;
    border-left: 3px solid orange;
    border-bottom: 3px solid orange;
    transform: rotate(-45deg);
  }

  &:focus {
    outline: none;
  }
`;

const HiddenFileInput = styled.input`
  display: none;
`;
