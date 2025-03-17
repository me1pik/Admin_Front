import React, { useState, useRef, useEffect } from "react";
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
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMenuClick = (menu: string) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  // 메뉴 영역 외부 클릭 시 메뉴 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setActiveMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Container ref={containerRef}>
      {/* 상단 블랙 바 */}
      <BlackBar>
        <TopBar />
        <NavIcons>
          <NavIcon
            onClick={() => navigate("/dashboard")}
            isActive={activeMenu === "dashboard"}
          >
            <Icon
              src={HomeIcon}
              alt="Home"
              isActive={activeMenu === "dashboard"}
            />
          </NavIcon>

          {/* 관리자 아이콘 : 관리자 목록, 분석정보 목록 */}
          <NavIcon
            onClick={() => handleMenuClick("admin")}
            isActive={activeMenu === "admin"}
          >
            <Icon
              src={AdminIcon}
              alt="Admin"
              isActive={activeMenu === "admin"}
            />
            {activeMenu === "admin" && (
              <SubMenu>
                <SubMenuItem onClick={() => navigate("/adminlist")}>
                  관리자 목록
                </SubMenuItem>
                <SubMenuItem onClick={() => navigate("/analysisinfo")}>
                  분석정보 목록
                </SubMenuItem>
              </SubMenu>
            )}
          </NavIcon>

          {/* 회원 아이콘 : 회원목록, 인벤토리 목록, 통계목록, 정산목록 */}
          <NavIcon
            onClick={() => handleMenuClick("member")}
            isActive={activeMenu === "member"}
          >
            <Icon
              src={MemberIcon}
              alt="Member"
              isActive={activeMenu === "member"}
            />
            {activeMenu === "member" && (
              <SubMenu>
                <SubMenuItem onClick={() => navigate("/userlist")}>
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

          {/* 결제 아이콘 : 제품 목록, 브랜드목록, 마켓 주문내역, 일반 주문내역 */}
          <NavIcon
            onClick={() => handleMenuClick("payment")}
            isActive={activeMenu === "payment"}
          >
            <Icon
              src={PaymentIcon}
              alt="Payment"
              isActive={activeMenu === "payment"}
            />
            {activeMenu === "payment" && (
              <SubMenu>
                <SubMenuItem onClick={() => navigate("/productlist")}>
                  제품 목록
                </SubMenuItem>
                <SubMenuItem onClick={() => navigate("/brandlist")}>
                  브랜드목록
                </SubMenuItem>
                <SubMenuItem onClick={() => navigate("/marketorderlist")}>
                  마켓 주문내역
                </SubMenuItem>
                <SubMenuItem onClick={() => navigate("/orderlist")}>
                  일반 주문내역
                </SubMenuItem>
                <SubMenuItem onClick={() => navigate("/monitoring")}>
                  모니터링
                </SubMenuItem>
              </SubMenu>
            )}
          </NavIcon>

          {/* 설정 아이콘 : 공지사항, 이용약관, 개인정보보호, FAQ */}
          <NavIcon
            onClick={() => handleMenuClick("settings")}
            isActive={activeMenu === "settings"}
          >
            <Icon
              src={SettingIcon}
              alt="Settings"
              isActive={activeMenu === "settings"}
            />
            {activeMenu === "settings" && (
              <SubMenu>
                <SubMenuItem onClick={() => navigate("/notice")}>
                  공지사항
                </SubMenuItem>
                <SubMenuItem onClick={() => navigate("/terms")}>
                  이용약관
                </SubMenuItem>
                <SubMenuItem onClick={() => navigate("/privacy")}>
                  개인정보보호
                </SubMenuItem>
                <SubMenuItem onClick={() => navigate("/faq")}>FAQ</SubMenuItem>
              </SubMenu>
            )}
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

interface IconProps {
  isActive: boolean;
}

const Icon = styled.img<IconProps>`
  width: 24px;
  height: 24px;
  filter: ${({ isActive }) => (isActive ? "brightness(0) invert(1)" : "none")};
`;

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
