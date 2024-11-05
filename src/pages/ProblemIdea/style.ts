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

export const BackButton = styled.button`
  background: linear-gradient(to right, #f8fafc, white);
  border: 1px solid #e2e8f0;
  color: #64748b;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1rem;
  margin-bottom: 2.5rem;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  transition: all 0.3s ease;
  font-weight: 500;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

  svg {
    transition: transform 0.2s ease;
  }

  &:hover {
    color: #3b82f6;
    border-color: #3b82f6;
    transform: translateY(-2px);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);

    svg {
      transform: translateX(-4px);
    }
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 640px) {
    font-size: 0.9rem;
    padding: 0.875rem 1.25rem;
    margin-bottom: 2rem;
  }
`;

export const IdeaContainer = styled.div`
  background: white;
  border-radius: 24px;
  padding: 3rem;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    padding: 2rem;
    border-radius: 20px;
  }

  @media (max-width: 640px) {
    padding: 1.5rem;
    border-radius: 16px;
  }
`;

export const IdeaTitle = styled.h1`
  font-size: 2.5rem;
  color: #1e293b;
  margin-bottom: 2rem;
  font-weight: 800;
  line-height: 1.3;
  letter-spacing: -0.02em;

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }

  @media (max-width: 640px) {
    font-size: 1.75rem;
  }
`;

export const IdeaMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #f1f5f9;

  @media (max-width: 640px) {
    gap: 1rem;
    margin-bottom: 2rem;
    padding-bottom: 1.5rem;
  }
`;

export const Avatar = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 16px;
  object-fit: cover;
  border: 2px solid #e2e8f0;
  background: #f8fafc;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    border-color: #3b82f6;
  }

  @media (max-width: 640px) {
    width: 48px;
    height: 48px;
    border-radius: 12px;
  }
`;

export const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

export const AuthorName = styled.span`
  font-weight: 700;
  color: #1e293b;
  font-size: 1.2rem;

  @media (max-width: 640px) {
    font-size: 1.1rem;
  }
`;

export const CreatedAt = styled.span`
  color: #64748b;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    font-size: 0.9em;
  }

  @media (max-width: 640px) {
    font-size: 0.9rem;
  }
`;

export const IdeaContent = styled.div`
  font-size: 1.125rem;
  line-height: 1.8;
  color: #334155;
  white-space: pre-wrap;
  font-weight: 400;

  @media (max-width: 640px) {
    font-size: 1.05rem;
    line-height: 1.7;
  }
`;

export const CommentsContainer = styled.div`
  margin-top: 4rem;
  border-top: 1px solid #e2e8f0;
  padding-top: 3rem;

  @media (max-width: 768px) {
    margin-top: 3rem;
    padding-top: 2rem;
  }
`;

export const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 2rem;
  font-size: 1.5rem;
  color: #1e293b;
  font-weight: 700;

  svg {
    color: #3b82f6;
  }

  span {
    color: #64748b;
    font-size: 1.1rem;
    font-weight: 500;
  }

  @media (max-width: 640px) {
    font-size: 1.25rem;
    margin-bottom: 1.5rem;

    span {
      font-size: 1rem;
    }
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 0;
  color: #64748b;

  svg {
    font-size: 3rem;
    color: #94a3b8;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.1rem;
  }

  @media (max-width: 640px) {
    padding: 2rem 0;

    svg {
      font-size: 2.5rem;
    }

    p {
      font-size: 1rem;
    }
  }
`;

export const CommentForm = styled.form`
  display: flex;
  gap: 1rem;
  margin-bottom: 2.5rem;

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 0.75rem;
    margin-bottom: 2rem;
  }
`;

export const CommentInput = styled.textarea`
  flex: 1;
  padding: 1.25rem;
  border: 2px solid #e2e8f0;
  border-radius: 16px;
  resize: vertical;
  min-height: 100px;
  font-size: 1.05rem;
  color: #1e293b;
  background: white;
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
    min-height: 80px;
    padding: 1rem;
    font-size: 1rem;
  }
`;

export const CommentButton = styled.button`
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  height: fit-content;
  align-self: flex-start;
  transition: all 0.3s ease;
  font-weight: 600;
  font-size: 1rem;
  box-shadow: 0 2px 4px rgba(59, 130, 246, 0.1);
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    font-size: 1.1em;
    animation: ${(props) => (props.disabled ? 'spin 1s linear infinite' : 'none')};
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(59, 130, 246, 0.2);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    background: linear-gradient(135deg, #94a3b8 0%, #64748b 100%);
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
  transition: all 0.3s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

  &:hover {
    border-color: #cbd5e0;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 640px) {
    padding: 1rem;
  }
`;

export const CommentControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
`;

export const CommentAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;

  @media (max-width: 640px) {
    width: 100%;
    justify-content: flex-end;
  }
`;

export const ActionButton = styled.button`
  background: #f1f5f9;
  border: none;
  color: #64748b;
  cursor: pointer;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background: #e2e8f0;
    color: #3b82f6;
    transform: translateY(-1px);
  }

  svg {
    font-size: 0.9em;
  }

  @media (max-width: 640px) {
    padding: 0.4rem 0.6rem;
    font-size: 0.85rem;
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
    font-size: 1.5rem;
    color: #3b82f6;
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

    svg {
      font-size: 1.25rem;
    }
  }
`;

export const ErrorMessage = styled.div`
  color: #dc2626;
  padding: 2.5rem;
  text-align: center;
  background: #fef2f2;
  border-radius: 16px;
  margin: 2rem auto;
  border: 1px solid #fecaca;
  font-size: 1rem;
  max-width: 600px;

  strong {
    display: block;
    margin-bottom: 0.75rem;
    font-size: 1.2rem;
    color: #b91c1c;
  }

  @media (max-width: 640px) {
    padding: 2rem;
    margin: 1.5rem auto;
    font-size: 0.95rem;

    strong {
      font-size: 1.1rem;
      margin-bottom: 0.5rem;
    }
  }
`;

export const Divider = styled.div`
  height: 1px;
  background: linear-gradient(to right, transparent, #e2e8f0 15%, #e2e8f0 85%, transparent);
  margin: 2rem 0;

  @media (max-width: 640px) {
    margin: 1.5rem 0;
  }
`;

export const IdeaActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e2e8f0;

  @media (max-width: 640px) {
    margin-top: 1.5rem;
    padding-top: 1.5rem;
    flex-direction: column;
    gap: 0.75rem;
    width: 100%;
  }
`;

export const IdeaActionButton = styled.button`
  background: white;
  border: 1px solid #e2e8f0;
  color: #64748b;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    color: #3b82f6;
    border-color: #3b82f6;
    background: #f8fafc;
    transform: translateY(-1px);
  }

  svg {
    font-size: 1.1em;
  }

  @media (max-width: 640px) {
    width: 100%;
    justify-content: center;
    padding: 0.875rem;
  }
`;

export const DeleteButton = styled(IdeaActionButton)`
  color: #ef4444;
  border-color: #fecaca;

  &:hover {
    color: #dc2626;
    border-color: #ef4444;
    background: #fef2f2;
  }
`;

export const EditButton = styled(IdeaActionButton)`
  color: #3b82f6;
  border-color: #bfdbfe;

  &:hover {
    color: #2563eb;
    border-color: #3b82f6;
    background: #eff6ff;
  }
`;

export const LikeButton = styled(IdeaActionButton)<{ isLiked: boolean }>`
  color: ${({ isLiked }) => (isLiked ? '#ef4444' : '#64748b')};
  border-color: ${({ isLiked }) => (isLiked ? '#fecaca' : '#e2e8f0')};
  background: ${({ isLiked }) => (isLiked ? '#fef2f2' : 'white')};

  &:hover {
    color: ${({ isLiked }) => (isLiked ? '#dc2626' : '#3b82f6')};
    border-color: ${({ isLiked }) => (isLiked ? '#ef4444' : '#3b82f6')};
    background: ${({ isLiked }) => (isLiked ? '#fef2f2' : '#f8fafc')};
  }
`;

export const CommentList = styled.div`
  margin-top: 2rem;

  @media (max-width: 640px) {
    margin-top: 1.5rem;
  }
`;

export const DateInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #64748b;
  font-size: 0.9rem;
  margin-top: 0.5rem;

  span {
    color: #94a3b8;
  }

  @media (max-width: 640px) {
    font-size: 0.85rem;
  }
`;

export const AuthorActions = styled.div`
  margin-left: auto;
  display: flex;
  gap: 0.5rem;

  @media (max-width: 640px) {
    margin-left: 0;
    width: 100%;
    justify-content: flex-end;
  }
`;

export const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
`;
