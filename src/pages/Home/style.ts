import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  z-index: 1;

  @media (max-width: 1536px) {
    max-width: 1280px;
  }

  @media (max-width: 1280px) {
    max-width: 1024px;
  }
`;

export const GradientBackground = styled.div`
  position: relative;
  min-height: calc(100vh - 4rem);
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-radius: 2rem;
  padding: 3rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 2rem;
    border-radius: 1.5rem;
  }
`;

export const BackgroundOrbs = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  z-index: 0;

  .orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
  }

  .orb1 {
    width: 400px;
    height: 400px;
    top: -100px;
    right: -100px;
    background: linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%);
  }

  .orb2 {
    width: 300px;
    height: 300px;
    bottom: -50px;
    left: -50px;
    background: linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%);
  }

  .orb3 {
    width: 250px;
    height: 250px;
    top: 40%;
    right: 25%;
    background: linear-gradient(135deg, rgba(20, 184, 166, 0.2) 0%, rgba(56, 189, 248, 0.2) 100%);
  }
`;

export const Header = styled.header`
  text-align: center;
  margin-bottom: 4rem;
  position: relative;
  z-index: 1;
`;

export const Highlight = styled.div`
  display: inline-block;
  position: relative;
  padding: 0 1rem;
  margin-bottom: 1rem;

  &::before {
    content: '';
    position: absolute;
    bottom: 0.5rem;
    left: 0;
    width: 100%;
    height: 1rem;
    background: linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%);
    z-index: -1;
    transform: skew(-15deg);
  }
`;

export const SubTitle = styled.p`
  font-size: 1.25rem;
  color: #64748b;
  font-weight: 500;
`;

export const MenuGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const IconWrapper = styled.div`
  transition: transform 0.3s ease;

  &.icon-section {
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 1rem;
    backdrop-filter: blur(10px);
  }
`;

export const MenuItem = styled(motion.div)<{ background: string }>`
  position: relative;
  padding: 2rem;
  border-radius: 1.5rem;
  cursor: pointer;
  overflow: hidden;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  color: white;
  background: ${(props) =>
    (props.background as string) || 'linear-gradient(135deg, #6366f1 0%, #4338ca 100%)'};
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow:
      0 20px 25px -5px rgba(0, 0, 0, 0.1),
      0 10px 10px -5px rgba(0, 0, 0, 0.04);

    &::before {
      opacity: 1;
    }

    .icon-section {
      transform: scale(1.1);
    }

    .arrow {
      transform: translateX(0);
      opacity: 1;
    }
  }

  .arrow {
    position: absolute;
    right: 2rem;
    color: rgba(255, 255, 255, 0.7);
    transform: translateX(-10px);
    opacity: 0;
    transition: all 0.3s ease;
  }
`;

export const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  color: #1e293b;
  letter-spacing: -0.03em;
  margin-bottom: 1rem;

  span:first-of-type {
    background: linear-gradient(
      300deg,
      #6366f1 0%,
      #3b82f6 25%,
      #8b5cf6 50%,
      #ec4899 75%,
      #6366f1 100%
    );
    background-size: 200% auto;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  span:last-child {
    background: linear-gradient(135deg, #6366f1 0%, #3b82f6 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  @media (max-width: 640px) {
    font-size: 2.5rem;
  }
`;

export const MenuIcon = styled.div`
  font-size: 1.5rem;
`;

export const MenuContent = styled.div`
  flex: 1;
`;

export const MenuTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const MenuDescription = styled.p`
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.5;
`;
