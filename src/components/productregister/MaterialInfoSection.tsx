import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ProductDetailResponse } from '../../api/adminProduct';

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
  // 만약 ProductDetailResponse 타입에 touch 속성이 없다면 (product as any).touch로 캐스팅하여 사용하거나 해당 속성을 제거해주세요.
  const [selectedOptions, setSelectedOptions] = useState({
    thickness: product.thickness || '적당',
    elasticity: product.elasticity || '없음',
    lining: product.lining || '기모안감',
    // TS 에러가 발생하는 경우, 아래와 같이 처리할 수 있습니다.
    touch: (product as any).touch || '적당',
    transparency: product.transparency || '적당',
  });

  // 제품 prop이 변경되면 내부 상태를 업데이트
  useEffect(() => {
    setSelectedOptions({
      thickness: product.thickness || '적당',
      elasticity: product.elasticity || '없음',
      lining: product.lining || '기모안감',
      touch: (product as any).touch || '적당',
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
        <Bullet />
        <SectionTitle>제품 소재정보</SectionTitle>
      </SectionHeader>
      <VerticalLine />
      <Column>
        {/* 두께감 그룹 */}
        <CheckGroupRow>
          <Label>두께감</Label>
          <SizeCheckGroup>
            <SizeCheckboxLabel style={{ minWidth: '100px' }}>
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
            <SizeCheckboxLabel style={{ minWidth: '100px' }}>
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
            <SizeCheckboxLabel style={{ minWidth: '100px' }}>
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
            <SizeCheckboxLabel style={{ minWidth: '100px' }}>
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
            <SizeCheckboxLabel style={{ minWidth: '100px' }}>
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
            <SizeCheckboxLabel style={{ minWidth: '100px' }}>
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
            <SizeCheckboxLabel style={{ minWidth: '100px' }}>
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
            <SizeCheckboxLabel style={{ minWidth: '100px' }}>
              <SizeCheckbox
                type='checkbox'
                name='elasticity'
                value='허리벤딩'
                checked={selectedOptions.elasticity === '허리벤딩'}
                onChange={handleCheckboxChange}
                disabled={!editable}
              />
              허리벤딩
            </SizeCheckboxLabel>
          </SizeCheckGroup>
        </CheckGroupRow>

        {/* 안감 그룹 */}
        <CheckGroupRow>
          <Label>안감</Label>
          <SizeCheckGroup>
            <SizeCheckboxLabel style={{ minWidth: '100px' }}>
              <SizeCheckbox
                type='checkbox'
                name='lining'
                value='정체안감'
                checked={selectedOptions.lining === '정체안감'}
                onChange={handleCheckboxChange}
                disabled={!editable}
              />
              정체안감
            </SizeCheckboxLabel>
            <SizeCheckboxLabel style={{ minWidth: '100px' }}>
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
            <SizeCheckboxLabel style={{ minWidth: '100px' }}>
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
            <SizeCheckboxLabel style={{ minWidth: '100px' }}>
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
            <SizeCheckboxLabel style={{ minWidth: '100px' }}>
              <SizeCheckbox
                type='checkbox'
                name='touch'
                value='뻣뻣함'
                checked={selectedOptions.touch === '뻣뻣함'}
                onChange={handleCheckboxChange}
                disabled={!editable}
              />
              뻣뻣함
            </SizeCheckboxLabel>
            <SizeCheckboxLabel style={{ minWidth: '100px' }}>
              <SizeCheckbox
                type='checkbox'
                name='touch'
                value='까슬함'
                checked={selectedOptions.touch === '까슬함'}
                onChange={handleCheckboxChange}
                disabled={!editable}
              />
              까슬함
            </SizeCheckboxLabel>
            <SizeCheckboxLabel style={{ minWidth: '100px' }}>
              <SizeCheckbox
                type='checkbox'
                name='touch'
                value='적당'
                checked={selectedOptions.touch === '적당'}
                onChange={handleCheckboxChange}
                disabled={!editable}
              />
              적당
            </SizeCheckboxLabel>
            <SizeCheckboxLabel style={{ minWidth: '100px' }}>
              <SizeCheckbox
                type='checkbox'
                name='touch'
                value='부드러움'
                checked={selectedOptions.touch === '부드러움'}
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
            <SizeCheckboxLabel style={{ minWidth: '100px' }}>
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
            <SizeCheckboxLabel style={{ minWidth: '100px' }}>
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
            <SizeCheckboxLabel style={{ minWidth: '100px' }}>
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
            <SizeCheckboxLabel style={{ minWidth: '100px' }}>
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
      </Column>
    </SectionBox>
  );
};

export default MaterialInfoSection;

/* styled-components 스타일 */
const SectionBox = styled.div`
  position: relative;
  margin-bottom: 20px;
  padding-left: 20px;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 10px;
`;

const Bullet = styled.div`
  position: absolute;
  left: -27px;
  top: 0;
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
  font-weight: 800;
  font-size: 14px;
  line-height: 15px;
  margin-left: 10px;
`;

const VerticalLine = styled.div`
  position: absolute;
  left: 0;
  top: 14px;
  bottom: 20px;
  width: 1px;
  background: #dddddd;
`;

const Column = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const CheckGroupRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const Label = styled.label`
  position: relative;
  min-width: 40px;
  font-family: 'NanumSquare Neo OTF';
  font-weight: 900;
  font-size: 12px;
  line-height: 13px;
  margin-right: 10px;
  padding-left: 10px;
  &::before {
    content: '';
    position: absolute;
    left: -20px;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 1px;
    background: #dddddd;
  }
`;

const SizeCheckGroup = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const SizeCheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-family: 'NanumSquare Neo OTF';
  font-weight: 700;
  font-size: 12px;
  line-height: 13px;
  color: #000;
`;

const SizeCheckbox = styled.input.attrs({ type: 'checkbox' })`
  appearance: none;
  border: 1px solid #ddd;
  margin-bottom: 5px;
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
