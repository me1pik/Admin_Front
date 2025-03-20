// src/components/productregister/MaterialInfoSection.tsx
import React from 'react';
import styled from 'styled-components';

const MaterialInfoSection: React.FC = () => {
  return (
    <SectionBox>
      <SectionHeader>
        <Bullet />
        <SectionTitle>제품 소재정보</SectionTitle>
      </SectionHeader>
      <VerticalLine />
      <Column>
        <CheckGroupRow>
          <Label>두께감</Label>
          <SizeCheckGroup>
            <SizeCheckboxLabel style={{ minWidth: '100px' }}>
              <SizeCheckbox
                type='checkbox'
                name='thickness'
                value='매우 두꺼움'
              />
              매우 두꺼움
            </SizeCheckboxLabel>
            <SizeCheckboxLabel style={{ minWidth: '100px' }}>
              <SizeCheckbox type='checkbox' name='thickness' value='두꺼움' />
              두꺼움
            </SizeCheckboxLabel>
            <SizeCheckboxLabel style={{ minWidth: '100px' }}>
              <SizeCheckbox
                type='checkbox'
                name='thickness'
                value='적당'
                defaultChecked
              />
              적당
            </SizeCheckboxLabel>
            <SizeCheckboxLabel style={{ minWidth: '100px' }}>
              <SizeCheckbox type='checkbox' name='thickness' value='얇음' />
              얇음
            </SizeCheckboxLabel>
          </SizeCheckGroup>
        </CheckGroupRow>

        <CheckGroupRow>
          <Label>신축성</Label>
          <SizeCheckGroup>
            <SizeCheckboxLabel style={{ minWidth: '100px' }}>
              <SizeCheckbox type='checkbox' name='elasticity' value='좋음' />
              좋음
            </SizeCheckboxLabel>
            <SizeCheckboxLabel style={{ minWidth: '100px' }}>
              <SizeCheckbox
                type='checkbox'
                name='elasticity'
                value='약간있음'
              />
              약간있음
            </SizeCheckboxLabel>
            <SizeCheckboxLabel style={{ minWidth: '100px' }}>
              <SizeCheckbox
                type='checkbox'
                name='elasticity'
                value='없음'
                defaultChecked
              />
              없음
            </SizeCheckboxLabel>
            <SizeCheckboxLabel style={{ minWidth: '100px' }}>
              <SizeCheckbox
                type='checkbox'
                name='elasticity'
                value='허리벤딩'
              />
              허리벤딩
            </SizeCheckboxLabel>
          </SizeCheckGroup>
        </CheckGroupRow>

        <CheckGroupRow>
          <Label>안감</Label>
          <SizeCheckGroup>
            <SizeCheckboxLabel style={{ minWidth: '100px' }}>
              <SizeCheckbox type='checkbox' name='lining' value='정체안감' />
              정체안감
            </SizeCheckboxLabel>
            <SizeCheckboxLabel style={{ minWidth: '100px' }}>
              <SizeCheckbox type='checkbox' name='lining' value='부분안감' />
              부분안감
            </SizeCheckboxLabel>
            <SizeCheckboxLabel style={{ minWidth: '100px' }}>
              <SizeCheckbox
                type='checkbox'
                name='lining'
                value='기모안감'
                defaultChecked
              />
              기모안감
            </SizeCheckboxLabel>
            <SizeCheckboxLabel style={{ minWidth: '100px' }}>
              <SizeCheckbox type='checkbox' name='lining' value='안감없음' />
              안감없음
            </SizeCheckboxLabel>
          </SizeCheckGroup>
        </CheckGroupRow>

        <CheckGroupRow>
          <Label>촉감</Label>
          <SizeCheckGroup>
            <SizeCheckboxLabel style={{ minWidth: '100px' }}>
              <SizeCheckbox type='checkbox' name='touch' value='뻣뻣함' />
              뻣뻣함
            </SizeCheckboxLabel>
            <SizeCheckboxLabel style={{ minWidth: '100px' }}>
              <SizeCheckbox type='checkbox' name='touch' value='까슬함' />
              까슬함
            </SizeCheckboxLabel>
            <SizeCheckboxLabel style={{ minWidth: '100px' }}>
              <SizeCheckbox
                type='checkbox'
                name='touch'
                value='적당'
                defaultChecked
              />
              적당
            </SizeCheckboxLabel>
            <SizeCheckboxLabel style={{ minWidth: '100px' }}>
              <SizeCheckbox type='checkbox' name='touch' value='부드러움' />
              부드러움
            </SizeCheckboxLabel>
          </SizeCheckGroup>
        </CheckGroupRow>

        <CheckGroupRow>
          <Label>비침</Label>
          <SizeCheckGroup>
            <SizeCheckboxLabel style={{ minWidth: '100px' }}>
              <SizeCheckbox
                type='checkbox'
                name='transparency'
                value='비침있음'
              />
              비침있음
            </SizeCheckboxLabel>
            <SizeCheckboxLabel style={{ minWidth: '100px' }}>
              <SizeCheckbox
                type='checkbox'
                name='transparency'
                value='약간있음'
              />
              약간있음
            </SizeCheckboxLabel>
            <SizeCheckboxLabel style={{ minWidth: '100px' }}>
              <SizeCheckbox
                type='checkbox'
                name='transparency'
                value='적당'
                defaultChecked
              />
              적당
            </SizeCheckboxLabel>
            <SizeCheckboxLabel style={{ minWidth: '100px' }}>
              <SizeCheckbox
                type='checkbox'
                name='transparency'
                value='비침없음'
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
  color: #000000;
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
