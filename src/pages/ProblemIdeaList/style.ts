import styled from '@emotion/styled';

export const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 3rem 4rem;
  background-color: #f8fafc;
  min-height: 100vh;

  @media (max-width: 1536px) {
    max-width: 1280px;
    padding: 2.5rem 3rem;
  }

  @media (max-width: 1280px) {
    max-width: 1024px;
    padding: 2rem 2.5rem;
  }

  @media (max-width: 1024px) {
    max-width: 768px;
    padding: 2rem;
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
  }

  @media (max-width: 640px) {
    padding: 1rem;
  }
`;

export const PageTitle = styled.h1`
  font-size: 3rem;
  color: #1a1a1a;
  margin-bottom: 3rem;
  font-weight: 800;
  text-align: center;
  letter-spacing: -0.02em;
  line-height: 1.3;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;

  span {
    background: linear-gradient(135deg, #6366f1 0%, #3b82f6 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    padding: 0 0.2em;
  }

  svg {
    color: #6366f1;
    font-size: 2.5rem;
  }

  @media (max-width: 1024px) {
    font-size: 2.5rem;
    svg {
      font-size: 2rem;
    }
  }

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 2rem;
    svg {
      font-size: 1.75rem;
    }
  }

  @media (max-width: 640px) {
    font-size: 1.75rem;
    svg {
      font-size: 1.5rem;
    }
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
`;

export const Button = styled.button`
  background: linear-gradient(135deg, #6366f1 0%, #3b82f6 100%);
  color: white;
  padding: 1rem 2.5rem;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  box-shadow: 0 4px 6px -1px rgba(99, 102, 241, 0.2);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 10px -1px rgba(99, 102, 241, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 640px) {
    padding: 0.875rem 2rem;
    font-size: 1rem;
  }
`;

export const IdeasGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;

  @media (max-width: 1280px) {
    gap: 1.5rem;
  }

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  @media (max-width: 640px) {
    gap: 1rem;
  }
`;

export const IdeaCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  border: 1px solid #e2e8f0;
  height: fit-content;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 1280px) {
    padding: 2rem;
  }

  @media (max-width: 640px) {
    padding: 1.5rem;
  }
`;

export const IdeaTitle = styled.h2`
  font-size: 1.75rem;
  color: #1e293b;
  margin-bottom: 1.2rem;
  font-weight: 700;
  cursor: pointer;
  transition: color 0.2s ease;
  letter-spacing: -0.01em;
  line-height: 1.4;

  &:hover {
    color: #3b82f6;
  }

  @media (max-width: 640px) {
    font-size: 1.5rem;
  }
`;

export const IdeaContent = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #334155;
  margin-bottom: 2rem;
  white-space: pre-wrap;
  font-weight: 400;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;

  @media (max-width: 640px) {
    font-size: 1rem;
    line-height: 1.7;
    margin-bottom: 1.5rem;
  }
`;

export const InteractionBar = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 1.2rem 0;
  border-top: 1px solid #e2e8f0;
  border-bottom: 1px solid #e2e8f0;
  margin-bottom: 2rem;

  @media (max-width: 640px) {
    gap: 1rem;
    padding: 1rem 0;
    margin-bottom: 1.5rem;
  }
`;

export const InteractionItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  color: #64748b;
  font-size: 0.95rem;
  font-weight: 500;
  padding: 0.6rem 1.2rem;
  border-radius: 10px;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    background: #f1f5f9;
    color: #3b82f6;
  }

  svg {
    font-size: 1.2rem;
  }

  @media (max-width: 640px) {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;

    svg {
      font-size: 1.1rem;
    }
  }
`;

export const CommentSection = styled.div<{ depth: number }>`
  margin-left: ${({ depth }) => depth * 2.5}rem;
  border-left: ${({ depth }) => (depth > 0 ? '2px solid #e2e8f0' : 'none')};
  padding-left: ${({ depth }) => (depth > 0 ? '2rem' : '0')};
  margin-top: ${({ depth }) => (depth > 0 ? '1rem' : '2rem')};

  @media (max-width: 768px) {
    margin-left: ${({ depth }) => depth * 1.5}rem;
    padding-left: ${({ depth }) => (depth > 0 ? '1.5rem' : '0')};
  }

  @media (max-width: 640px) {
    margin-left: ${({ depth }) => depth * 1}rem;
    padding-left: ${({ depth }) => (depth > 0 ? '1rem' : '0')};
  }
`;

export const Comment = styled.div<{ depth: number }>`
  padding: 1.5rem;
  margin: 0.75rem 0;
  background: ${({ depth }) => (depth > 0 ? '#f8fafc' : 'white')};
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  transition: all 0.2s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

  &:hover {
    border-color: #cbd5e0;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 640px) {
    padding: 1rem;
  }
`;

export const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

export const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  object-fit: cover;
  border: 2px solid #e2e8f0;
  background: #f8fafc;

  @media (max-width: 640px) {
    width: 36px;
    height: 36px;
  }
`;

export const Username = styled.span`
  font-weight: 600;
  color: #1e293b;
  font-size: 1rem;

  @media (max-width: 640px) {
    font-size: 0.95rem;
  }
`;

export const TimeStamp = styled.span`
  color: #64748b;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;

  @media (max-width: 640px) {
    font-size: 0.8rem;
  }
`;

export const CommentContent = styled.p`
  color: #334155;
  line-height: 1.7;
  font-size: 1rem;
  white-space: pre-wrap;
  margin: 0.75rem 0;

  @media (max-width: 640px) {
    font-size: 0.95rem;
  }
`;

export const CommentForm = styled.form`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 0.75rem;
  }
`;

export const CommentInput = styled.textarea`
  flex: 1;
  padding: 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  resize: vertical;
  min-height: 80px;
  font-size: 1rem;
  color: #1e293b;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &::placeholder {
    color: #94a3b8;
  }

  @media (max-width: 640px) {
    font-size: 0.95rem;
    min-height: 60px;
  }
`;

export const CommentButton = styled.button`
  background: #3b82f6;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  height: fit-content;
  align-self: flex-start;
  transition: all 0.2s ease;
  font-weight: 600;
  font-size: 0.95rem;
  box-shadow: 0 2px 4px rgba(59, 130, 246, 0.1);
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: #2563eb;
    transform: translateY(-1px);
    box-shadow: 0 4px 6px rgba(59, 130, 246, 0.2);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background: #94a3b8;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  @media (max-width: 640px) {
    width: 100%;
    justify-content: center;
    padding: 0.875rem;
  }
`;

export const ActionButton = styled.button`
  background: #f1f5f9;
  border: none;
  color: #64748b;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.9rem;
  font-weight: 500;

  &:hover {
    background: #e2e8f0;
    color: #3b82f6;
  }

  svg {
    font-size: 1em;
  }

  @media (max-width: 640px) {
    padding: 0.4rem;
    font-size: 0.85rem;
  }
`;

export const ToggleButton = styled.button`
  background: white;
  border: 1px solid #e2e8f0;
  color: #64748b;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  padding: 0.6rem 1rem;
  font-size: 0.9rem;
  font-weight: 500;
  border-radius: 10px;
  transition: all 0.2s ease;

  &:hover {
    color: #3b82f6;
    border-color: #3b82f6;
    background: #f8fafc;
  }

  svg {
    font-size: 0.8em;
  }

  @media (max-width: 640px) {
    padding: 0.5rem 0.875rem;
    font-size: 0.85rem;
  }
`;

export const LoadingSpinner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem;
  color: #64748b;
  font-size: 1.1rem;
  gap: 0.75rem;

  svg {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @media (max-width: 640px) {
    padding: 3rem;
    font-size: 1rem;
  }
`;

export const ErrorMessage = styled.div`
  color: #dc2626;
  padding: 2rem;
  text-align: center;
  background: #fef2f2;
  border-radius: 16px;
  margin: 2rem auto;
  border: 1px solid #fecaca;
  font-size: 1rem;
  max-width: 600px;

  strong {
    display: block;
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
  }

  @media (max-width: 640px) {
    padding: 1.5rem;
    margin: 1.5rem auto;
    font-size: 0.95rem;

    strong {
      font-size: 1rem;
    }
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 640px) {
    gap: 0.25rem;
  }
`;

export const CommentCount = styled.span`
  font-size: 0.9rem;
  color: #64748b;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    font-size: 1.1em;
  }

  @media (max-width: 640px) {
    font-size: 0.85rem;
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #64748b;

  svg {
    font-size: 3rem;
    color: #94a3b8;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.5rem;
    color: #1e293b;
    margin-bottom: 0.5rem;
    font-weight: 600;
  }

  p {
    font-size: 1.1rem;
    color: #64748b;
    margin-bottom: 2rem;
  }

  @media (max-width: 640px) {
    padding: 3rem 1.5rem;

    svg {
      font-size: 2.5rem;
    }

    h3 {
      font-size: 1.25rem;
    }

    p {
      font-size: 1rem;
    }
  }
`;

export const Divider = styled.div`
  height: 1px;
  background-color: #e2e8f0;
  margin: 1.5rem 0;

  @media (max-width: 640px) {
    margin: 1rem 0;
  }
`;
