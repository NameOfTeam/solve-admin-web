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

  @media (min-width: 640px) {
    padding: 2rem;
  }

  @media (min-width: 1280px) {
    padding: 2rem;
  }

  @media (min-width: 769px) {
    padding-left: 2rem;
  }

  @media (min-width: 1536px) {
    max-width: 1920px;
    padding: 2rem;
  }
`;

export const GradientBackground = styled.div`
  position: relative;
  min-height: calc(100vh - 4rem);
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  overflow: hidden;

  @media (min-width: 640px) {
    border-radius: 2rem;
    padding: 2rem;
  }

  @media (min-width: 768px) {
    padding: 3rem;
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
  pointer-events: none;

  .orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
  }

  .orb1 {
    width: 300px;
    height: 300px;
    top: -50px;
    right: -50px;
    background: linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%);

    @media (min-width: 768px) {
      width: 400px;
      height: 400px;
      top: -100px;
      right: -100px;
    }
  }

  .orb2 {
    width: 250px;
    height: 250px;
    bottom: -30px;
    left: -30px;
    background: linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%);

    @media (min-width: 768px) {
      width: 300px;
      height: 300px;
      bottom: -50px;
      left: -50px;
    }
  }

  .orb3 {
    width: 200px;
    height: 200px;
    top: 40%;
    right: 20%;
    background: linear-gradient(135deg, rgba(20, 184, 166, 0.2) 0%, rgba(56, 189, 248, 0.2) 100%);

    @media (min-width: 768px) {
      width: 250px;
      height: 250px;
      right: 25%;
    }
  }
`;

export const Header = styled.header`
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
  z-index: 1;

  @media (min-width: 768px) {
    margin-bottom: 4rem;
  }
`;

export const Highlight = styled.div`
  display: inline-block;
  position: relative;
  padding: 0 0.5rem;
  margin-bottom: 1rem;

  &::before {
    content: '';
    position: absolute;
    bottom: 0.5rem;
    left: 0;
    width: 100%;
    height: 0.75rem;
    background: linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%);
    z-index: -1;
    transform: skew(-15deg);
  }

  @media (min-width: 640px) {
    padding: 0 1rem;

    &::before {
      height: 1rem;
    }
  }
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  color: #1e293b;
  letter-spacing: -0.03em;
  margin-bottom: 0.5rem;
  line-height: 1.2;

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

  @media (min-width: 640px) {
    font-size: 3.5rem;
    margin-bottom: 1rem;
  }
`;

export const SubTitle = styled.p`
  font-size: 1.1rem;
  color: #64748b;
  font-weight: 500;

  @media (min-width: 640px) {
    font-size: 1.25rem;
  }
`;

export const MenuGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const IconWrapper = styled.div`
  transition: transform 0.3s ease;

  &.icon-section {
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 0.75rem;
    backdrop-filter: blur(10px);

    @media (min-width: 640px) {
      width: 3rem;
      height: 3rem;
      border-radius: 1rem;
    }
  }
`;

export const MenuItem = styled(motion.div)<{ background: string }>`
  position: relative;
  padding: 1.5rem;
  border-radius: 1rem;
  cursor: pointer;
  overflow: hidden;
  display: flex;
  align-items: center;
  gap: 1rem;
  color: white;
  background: ${(props) => props.background};
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;

  @media (min-width: 640px) {
    padding: 2rem;
    gap: 1.5rem;
    border-radius: 1.5rem;
  }

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

  @media (hover: hover) {
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
  }

  .arrow {
    position: absolute;
    right: 1.5rem;
    color: rgba(255, 255, 255, 0.7);
    transform: translateX(-10px);
    opacity: 0;
    transition: all 0.3s ease;

    @media (min-width: 640px) {
      right: 2rem;
    }
  }
`;

export const MenuContent = styled.div`
  flex: 1;
  min-width: 0; // for text truncation
`;

export const MenuTitle = styled.h2`
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (min-width: 640px) {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
  }
`;

export const MenuDescription = styled.p`
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  @media (min-width: 640px) {
    font-size: 0.95rem;
  }
`;
