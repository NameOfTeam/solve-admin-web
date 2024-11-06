import styled from '@emotion/styled';

interface ActiveProps {
  active: boolean;
}

export const SidebarContainer = styled.aside`
  width: 280px;
  height: 100vh;
  background: white;
  border-right: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 0;
`;

export const LogoContainer = styled.div`
  padding: 2rem;
  text-align: center;
  border-bottom: 1px solid #e2e8f0;
  cursor: pointer;
`;

export const Logo = styled.h1`
  font-size: 1.75rem;
  font-weight: 800;
  color: #2563eb;
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
`;

export const MenuItem = styled.div<ActiveProps>`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.875rem 1.25rem;
  border-radius: 8px;
  cursor: pointer;
  background: ${({ active }) => (active ? '#2563eb' : 'transparent')};
  transition: all 0.2s ease;

  &:hover {
    background: ${({ active }) => (active ? '#2563eb' : '#f1f5f9')};
  }
`;

export const MenuIcon = styled.div<ActiveProps>`
  color: ${({ active }) => (active ? 'white' : '#64748b')};
  display: flex;
  align-items: center;
  font-size: 1.25rem;
`;

export const MenuTitle = styled.span<ActiveProps>`
  color: ${({ active }) => (active ? 'white' : '#1e293b')};
  font-weight: ${({ active }) => (active ? '600' : '500')};
  font-size: 0.95rem;
`;

export const FooterContainer = styled.div`
  padding: 1.5rem;
  border-top: 1px solid #e2e8f0;
  text-align: center;
`;

export const FooterText = styled.p`
  color: #64748b;
  font-size: 0.875rem;
`;
