// src/components/productregister/MaterialInfoSection.tsx
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ProductDetailResponse } from '../../api/adminProduct';
// BulletIcon을 불러옵니다. (Webpack/CRA 기준)
import BulletIcon from '../../assets/BulletIcon.svg';

interface MaterialInfoSectionProps {
  product: ProductDetailResponse;
  onChange?: (data: Partial<ProductDetailResponse>) => void;
  editable?: boolean;
}

const MaterialInfoSection: React.FC<MaterialInfoSectionProps> = ({
  product,
  onChange,
  editable = false,
}) => {
  // 만약 ProductDetailResponse 타입에 fit 속성이 없다면 (product as any).fit로 캐스팅하여 사용하거나 해당 속성을 제거해주세요.
  const [selectedOptions, setSelectedOptions] = useState({
    thickness: product.thickness || '적당',
    elasticity: product.elasticity || '없음',
    lining: product.lining || '기모안감',
    // TS 에러가 발생하는 경우, 아래와 같이 처리할 수 있습니다.
    fit: (product as any).fit || '적당',
    transparency: product.transparency || '적당',
  });

  // 제품 prop이 변경되면 내부 상태를 업데이트
  useEffect(() => {
    setSelectedOptions({
      thickness: product.thickness || '적당',
      elasticity: product.elasticity || '없음',
      lining: product.lining || '기모안감',
      fit: (product as any).fit || '적당',
      transparency: product.transparency || '적당',
    });
  }, [product]);

  // 체크박스 클릭 시 단일 선택을 위해 상태 갱신 및 상위 컴포넌트에 전달
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editable) return; // 수정 불가능하면 무시
    const { name, value } = e.target;
    if (selectedOptions[name as keyof typeof selectedOptions] === value) return;
    const newOptions = { ...selectedOptions, [name]: value };
    setSelectedOptions(newOptions);
    if (onChange) {
      onChange({ [name]: value });
    }
  };

  return (
    <SectionBox>
      <SectionHeader>
        {/* BulletIconImage가 일반 inline 요소가 되어 flex 내에서 타이틀과 나란히 정렬됩니다. */}
        <BulletIconImage src={BulletIcon} alt='bullet icon' />
        <SectionTitle>제품 소재정보</SectionTitle>
      </SectionHeader>

      {/* Title 아래부터 테두리를 적용할 TableContainer */}
      <TableContainer>
        {/* 두께감 그룹 */}
        <CheckGroupRow>
          <Label>두께감</Label>
          <SizeCheckGroup>
            <SizeCheckboxLabel>
              <SizeCheckbox
                type='checkbox'
                name='thickness'
                value='매우 두꺼움'
                checked={selectedOptions.thickness === '매우 두꺼움'}
                onChange={handleCheckboxChange}
                disabled={!editable}
              />
              매우 두꺼움
            </SizeCheckboxLabel>
            <SizeCheckboxLabel>
              <SizeCheckbox
                type='checkbox'
                name='thickness'
                value='두꺼움'
                checked={selectedOptions.thickness === '두꺼움'}
                onChange={handleCheckboxChange}
                disabled={!editable}
              />
              두꺼움
            </SizeCheckboxLabel>
            <SizeCheckboxLabel>
              <SizeCheckbox
                type='checkbox'
                name='thickness'
                value='적당'
                checked={selectedOptions.thickness === '적당'}
                onChange={handleCheckboxChange}
                disabled={!editable}
              />
              적당
            </SizeCheckboxLabel>
            <SizeCheckboxLabel>
              <SizeCheckbox
                type='checkbox'
                name='thickness'
                value='얇음'
                checked={selectedOptions.thickness === '얇음'}
                onChange={handleCheckboxChange}
                disabled={!editable}
              />
              얇음
            </SizeCheckboxLabel>
          </SizeCheckGroup>
        </CheckGroupRow>

        {/* 신축성 그룹 */}
        <CheckGroupRow>
          <Label>신축성</Label>
          <SizeCheckGroup>
            <SizeCheckboxLabel>
              <SizeCheckbox
                type='checkbox'
                name='elasticity'
                value='좋음'
                checked={selectedOptions.elasticity === '좋음'}
                onChange={handleCheckboxChange}
                disabled={!editable}
              />
              좋음
            </SizeCheckboxLabel>
            <SizeCheckboxLabel>
              <SizeCheckbox
                type='checkbox'
                name='elasticity'
                value='약간있음'
                checked={selectedOptions.elasticity === '약간있음'}
                onChange={handleCheckboxChange}
                disabled={!editable}
              />
              약간있음
            </SizeCheckboxLabel>
            <SizeCheckboxLabel>
              <SizeCheckbox
                type='checkbox'
                name='elasticity'
                value='없음'
                checked={selectedOptions.elasticity === '없음'}
                onChange={handleCheckboxChange}
                disabled={!editable}
              />
              없음
            </SizeCheckboxLabel>
            <SizeCheckboxLabel>
              <SizeCheckbox
                type='checkbox'
                name='elasticity'
                value='허리밴딩'
                checked={selectedOptions.elasticity === '허리밴딩'}
                onChange={handleCheckboxChange}
                disabled={!editable}
              />
              허리밴딩
            </SizeCheckboxLabel>
          </SizeCheckGroup>
        </CheckGroupRow>

        {/* 안감 그룹 */}
        <CheckGroupRow>
          <Label>안감</Label>
          <SizeCheckGroup>
            <SizeCheckboxLabel>
              <SizeCheckbox
                type='checkbox'
                name='lining'
                value='전체안감'
                checked={selectedOptions.lining === '전체안감'}
                onChange={handleCheckboxChange}
                disabled={!editable}
              />
              전체안감
            </SizeCheckboxLabel>
            <SizeCheckboxLabel>
              <SizeCheckbox
                type='checkbox'
                name='lining'
                value='부분안감'
                checked={selectedOptions.lining === '부분안감'}
                onChange={handleCheckboxChange}
                disabled={!editable}
              />
              부분안감
            </SizeCheckboxLabel>
            <SizeCheckboxLabel>
              <SizeCheckbox
                type='checkbox'
                name='lining'
                value='기모안감'
                checked={selectedOptions.lining === '기모안감'}
                onChange={handleCheckboxChange}
                disabled={!editable}
              />
              기모안감
            </SizeCheckboxLabel>
            <SizeCheckboxLabel>
              <SizeCheckbox
                type='checkbox'
                name='lining'
                value='안감없음'
                checked={selectedOptions.lining === '안감없음'}
                onChange={handleCheckboxChange}
                disabled={!editable}
              />
              안감없음
            </SizeCheckboxLabel>
          </SizeCheckGroup>
        </CheckGroupRow>

        {/* 촉감 그룹 */}
        <CheckGroupRow>
          <Label>촉감</Label>
          <SizeCheckGroup>
            <SizeCheckboxLabel>
              <SizeCheckbox
                type='checkbox'
                name='fit'
                value='뻣뻣함'
                checked={selectedOptions.fit === '뻣뻣함'}
                onChange={handleCheckboxChange}
                disabled={!editable}
              />
              뻣뻣함
            </SizeCheckboxLabel>
            <SizeCheckboxLabel>
              <SizeCheckbox
                type='checkbox'
                name='fit'
                value='까슬함'
                checked={selectedOptions.fit === '까슬함'}
                onChange={handleCheckboxChange}
                disabled={!editable}
              />
              까슬함
            </SizeCheckboxLabel>
            <SizeCheckboxLabel>
              <SizeCheckbox
                type='checkbox'
                name='fit'
                value='적당'
                checked={selectedOptions.fit === '적당'}
                onChange={handleCheckboxChange}
                disabled={!editable}
              />
              적당
            </SizeCheckboxLabel>
            <SizeCheckboxLabel>
              <SizeCheckbox
                type='checkbox'
                name='fit'
                value='부드러움'
                checked={selectedOptions.fit === '부드러움'}
                onChange={handleCheckboxChange}
                disabled={!editable}
              />
              부드러움
            </SizeCheckboxLabel>
          </SizeCheckGroup>
        </CheckGroupRow>

        {/* 비침 그룹 */}
        <CheckGroupRow>
          <Label>비침</Label>
          <SizeCheckGroup>
            <SizeCheckboxLabel>
              <SizeCheckbox
                type='checkbox'
                name='transparency'
                value='비침있음'
                checked={selectedOptions.transparency === '비침있음'}
                onChange={handleCheckboxChange}
                disabled={!editable}
              />
              비침있음
            </SizeCheckboxLabel>
            <SizeCheckboxLabel>
              <SizeCheckbox
                type='checkbox'
                name='transparency'
                value='약간있음'
                checked={selectedOptions.transparency === '약간있음'}
                onChange={handleCheckboxChange}
                disabled={!editable}
              />
              약간있음
            </SizeCheckboxLabel>
            <SizeCheckboxLabel>
              <SizeCheckbox
                type='checkbox'
                name='transparency'
                value='적당'
                checked={selectedOptions.transparency === '적당'}
                onChange={handleCheckboxChange}
                disabled={!editable}
              />
              적당
            </SizeCheckboxLabel>
            <SizeCheckboxLabel>
              <SizeCheckbox
                type='checkbox'
                name='transparency'
                value='비침없음'
                checked={selectedOptions.transparency === '비침없음'}
                onChange={handleCheckboxChange}
                disabled={!editable}
              />
              비침없음
            </SizeCheckboxLabel>
          </SizeCheckGroup>
        </CheckGroupRow>
      </TableContainer>
    </SectionBox>
  );
};

export default MaterialInfoSection;

/* styled-components 스타일 */
const SectionBox = styled.div`
  position: relative;
  margin-bottom: 20px;
  max-width: 600px;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

// Bullet을 SVG 아이콘으로 교체하기 위한 styled.img (절대위치 제거)
const BulletIconImage = styled.img`
  width: 14px;
  height: 14px;
  margin-right: 8px; /* 타이틀과의 간격 */
`;

const SectionTitle = styled.div`
  font-weight: 800;
  font-size: 14px;
  line-height: 15px;
`;

/**
 * TableContainer: 제목 아래부터 테두리를 감싸는 컨테이너
 * - 기존 border는 그대로 유지하며,
 * - ::before를 활용해 라벨 칸 오른쪽에 연속된 세로 경계선을 추가합니다.
 */
const TableContainer = styled.div`
  position: relative;
  border: 1px solid #dddddd;
  border-radius: 4px;
  overflow: hidden;

  /* 라벨 칸 너비(80px)에 맞춰 세로 경계선을 테이블 전체 높이에 걸쳐 그림 */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 80px; /* Label width (box-sizing: border-box 기준) */
    width: 1px;
    background: #dddddd;
  }
`;

/**
 * CheckGroupRow: 각 행(row)마다 아래쪽에 구분선(border-bottom)을 적용
 * 마지막 행에는 구분선이 없도록 &:last-child 처리
 * align-items: stretch를 사용해서 Label이 부모 높이를 채우도록 유지
 */
const CheckGroupRow = styled.div`
  display: flex;
  align-items: stretch;
  padding: 10px 0;
  border-bottom: 1px solid #dddddd;

  &:last-child {
    border-bottom: none;
  }
`;

/**
 * Label: 왼쪽 컬럼(라벨) 영역
 * - 기존 border-right를 제거했습니다.
 * - 높이를 부모에 맞춰 채우기 위해 align-self: stretch; 유지
 */
const Label = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: stretch;
  width: 80px; /* box-sizing: border-box 기준, padding 포함됨 */
  font-weight: 900;
  font-size: 12px;
  line-height: 13px;
  padding: 0 10px;
  text-align: center;
  /* border-right 삭제 */
  box-sizing: border-box;
`;

/**
 * SizeCheckGroup: 오른쪽 컬럼(체크박스 그룹) 영역
 * - 왼쪽 Label 만큼의 너비를 제외한 나머지 영역을 채우도록 flex:1
 * - 체크박스들을 가로로 정렬하고, 간격(gap) 지정
 * - 좌우 패딩을 줘서 테두리에 붙지 않도록 함
 */
const SizeCheckGroup = styled.div`
  flex: 1;
  display: flex;
  gap: 20px;
  align-items: center;
  padding: 0 10px;
`;

/**
 * SizeCheckboxLabel: 각 개별 체크박스 + 텍스트 묶음
 */
const SizeCheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-weight: 700;
  font-size: 12px;
  line-height: 13px;
  width: 100px;
  color: #000;
`;

/**
 * SizeCheckbox: 커스텀 체크박스 스타일
 * - 기본 테두리, 체크 시 주황색 체크 표시(::after 사용)
 */
const SizeCheckbox = styled.input.attrs({ type: 'checkbox' })`
  appearance: none;
  border: 1px solid #ddd;
  width: 20px;
  height: 20px;
  margin-right: 5px;
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
