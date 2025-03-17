import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import HomeIcon from "../assets/Home.svg";
import MemberIcon from "../assets/Member.svg";
import AdminIcon from "../assets/Admin.svg";
import PaymentIcon from "../assets/Payment.svg";
import SettingIcon from "../assets/Setting.svg";
import ListLogo from "../assets/ListLogo.svg";

const List: React.FC = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const handleMenuClick = (menu: string) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  return (
    <Container>
      {/* 상단 블랙 바 */}
      <BlackBar>
        <TopBar />
        <NavIcons>
          <NavIcon
            onClick={() => navigate("/dashboard")}
            isActive={activeMenu === "dashboard"}
          >
            <Icon src={HomeIcon} alt="Home" />
          </NavIcon>

          <NavIcon
            onClick={() => handleMenuClick("manager")}
            isActive={activeMenu === "manager"}
          >
            <Icon src={AdminIcon} alt="Admin" />
            {activeMenu === "manager" && (
              <SubMenu>
                <SubMenuItem onClick={() => navigate("/admin")}>
                  관리자 목록
                </SubMenuItem>
                <SubMenuItem onClick={() => navigate("/blockmanagerlist")}>
                  블럭 관리자 목록
                </SubMenuItem>
              </SubMenu>
            )}
          </NavIcon>

          <NavIcon
            onClick={() => handleMenuClick("member")}
            isActive={activeMenu === "member"}
          >
            <Icon src={MemberIcon} alt="Member" />
            {activeMenu === "member" && (
              <SubMenu>
                <SubMenuItem onClick={() => navigate("/user")}>
                  회원 목록
                </SubMenuItem>
                <SubMenuItem onClick={() => navigate("/inventorylist")}>
                  인벤토리 목록
                </SubMenuItem>
                <SubMenuItem onClick={() => navigate("/statisticslist")}>
                  통계 목록
                </SubMenuItem>
                <SubMenuItem onClick={() => navigate("/calculatelist")}>
                  정산 목록
                </SubMenuItem>
              </SubMenu>
            )}
          </NavIcon>

          <NavIcon
            onClick={() => handleMenuClick("payment")}
            isActive={activeMenu === "payment"}
          >
            <Icon src={PaymentIcon} alt="Payment" />
            {activeMenu === "payment" && (
              <SubMenu>
                <SubMenuItem onClick={() => navigate("/productlist")}>
                  제품 관리
                </SubMenuItem>
                <SubMenuItem onClick={() => navigate("/brandlist")}>
                  브랜드 관리
                </SubMenuItem>
                <SubMenuItem onClick={() => navigate("/Orderlist")}>
                  주문 목록
                </SubMenuItem>
              </SubMenu>
            )}
          </NavIcon>

          <NavIcon
            onClick={() => handleMenuClick("settings")}
            isActive={activeMenu === "settings"}
          >
            <Icon src={SettingIcon} alt="Settings" />
          </NavIcon>
        </NavIcons>
      </BlackBar>

      {/* 하단 화이트 바 */}
      <WhiteBar>
        <LogoContainer>
          <Logo src={ListLogo} alt="Logo" />
        </LogoContainer>
        <TopBar />
      </WhiteBar>
    </Container>
  );
};

export default List;

/* ====================== Styled Components ====================== */

const Container = styled.div`
  width: 70px;
  height: 100vh;
  max-height: 700px;
`;

const BlackBar = styled.div`
  flex: 1;
  background-color: #2c2c2c;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  height: 50vh;
  border: 1px solid #dddddd;
  border-left: none;
  border-radius: 0 8px 0 0;
`;

const TopBar = styled.div`
  width: 30px;
  height: 6px;
  background: rgba(85, 85, 85, 0.517647);
  margin-top: 20px;
  margin-bottom: 20px;
`;

const WhiteBar = styled.div`
  height: 270px;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  border: 1px solid #dddddd;
  border-radius: 0 0 8px 0;
`;

const NavIcons = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  justify-content: center;
`;

interface NavIconProps {
  isActive: boolean;
}

const NavIcon = styled.div<NavIconProps>`
  width: 50px;
  height: 50px;
  background-color: ${({ isActive }) => (isActive ? "#F6AE24" : "#2c2c2c")};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  border-radius: ${({ isActive }) => (isActive ? "10px" : "0px")};

  &:hover {
    background-color: #f6ac36;
    border-radius: 10px;
  }
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
`;

/* 더욱 멋진 애니메이션 효과 (슬라이드, 확대, 오버슛 효과 포함) */
const slideFade = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-20px) scale(0.8);
  }
  60% {
    opacity: 1;
    transform: translateX(10px) scale(1.05);
  }
  100% {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
`;

const SubMenu = styled.div`
  position: absolute;
  left: 60px;
  top: 0;
  width: 150px;
  display: flex;
  flex-direction: column;
  background: #333;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #444;
  z-index: 1;
  animation: ${slideFade} 0.5s cubic-bezier(0.25, 0.1, 0.25, 1);
`;

const SubMenuItem = styled.div`
  color: #ffffff;
  padding: 8px 12px;
  cursor: pointer;
  text-align: center;
  border-radius: 4px;

  &:hover {
    background-color: #f6ac36;
  }
`;

const LogoContainer = styled.div`
  width: 70px;
  height: 270px;
  display: flex;
  justify-content: center;
  padding: 20px 0;
`;

const Logo = styled.img`
  width: 26px;
  height: 200px;
`;
