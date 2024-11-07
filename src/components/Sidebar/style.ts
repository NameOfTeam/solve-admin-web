import styled from '@emotion/styled';
import { motion } from 'framer-motion';

interface ActiveProps {
  active: boolean;
}

interface SidebarProps {
  isMobile?: boolean;
}

export const MobileMenuButton = styled(motion.button)`
  position: fixed;
  top: 1rem;
  left: 1rem;
  width: 48px;
  height: 48px;
  border-radius: 10px;
  background: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: #2563eb;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  z-index: 40;
  cursor: pointer;

  @media (min-width: 769px) {
    display: none;
  }
`;

export const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(2px);
  z-index: 45;
`;

export const SidebarContainer = styled(motion.aside)<SidebarProps>`
  width: 280px;
  height: 100vh;
  background: white;
  border-right: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 50;
  box-shadow: ${({ isMobile }) => (isMobile ? '4px 0 10px rgba(0, 0, 0, 0.1)' : 'none')};

  @media (max-width: 768px) {
    width: 85%;
    max-width: 320px;
  }
`;

export const CloseButton = styled(motion.button)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: #f1f5f9;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  cursor: pointer;
  z-index: 51;
`;

export const LogoContainer = styled.div`
  padding: 2rem;
  text-align: center;
  border-bottom: 1px solid #e2e8f0;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f8fafc;
  }
`;

export const Logo = styled.h1`
  font-size: 1.75rem;
  font-weight: 800;
  background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.25rem;
`;

export const LogoSubtitle = styled.p`
  font-size: 0.875rem;
  color: #64748b;
  font-weight: 500;
`;

export const MenuContainer = styled.div`
  flex: 1;
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #e2e8f0;
    border-radius: 3px;
  }
`;

export const MenuItem = styled(motion.div)<ActiveProps>`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.875rem 1.25rem;
  border-radius: 12px;
  cursor: pointer;
  background: ${({ active }) => (active ? '#2563eb' : 'transparent')};
  transition: all 0.2s ease;

  &:hover {
    background: ${({ active }) => (active ? '#2563eb' : '#f1f5f9')};
  }

  @media (hover: none) {
    &:active {
      background: ${({ active }) => (active ? '#2563eb' : '#f1f5f9')};
      transform: scale(0.98);
    }
  }
`;

export const MenuIcon = styled.div<ActiveProps>`
  color: ${({ active }) => (active ? 'white' : '#64748b')};
  display: flex;
  align-items: center;
  font-size: 1.25rem;
  transition: all 0.2s ease;
`;

export const MenuTitle = styled.span<ActiveProps>`
  color: ${({ active }) => (active ? 'white' : '#1e293b')};
  font-weight: ${({ active }) => (active ? '600' : '500')};
  font-size: 0.95rem;
  transition: all 0.2s ease;
`;

export const FooterContainer = styled.div`
  padding: 1.5rem;
  border-top: 1px solid #e2e8f0;
  text-align: center;
`;

export const FooterText = styled.p`
  color: #64748b;
  font-size: 0.875rem;
  font-weight: 500;
`;
