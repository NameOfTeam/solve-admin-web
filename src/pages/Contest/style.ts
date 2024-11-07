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

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #64748b;
  font-size: 1rem;
  font-weight: 500;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    color: #3b82f6;
    background: #f1f5f9;
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  cursor: pointer;
`;

export const EditButton = styled(Button)`
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  border: none;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(37, 99, 235, 0.2);
  }
`;

export const DeleteButton = styled(Button)`
  background: white;
  color: #dc2626;
  border: 1px solid #fee2e2;

  &:hover {
    background: #fef2f2;
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(220, 38, 38, 0.1);
  }
`;

export const ContestContainer = styled.div`
  background: white;
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
`;

export const ContestHeader = styled.div`
  margin-bottom: 3rem;
`;

export const TitleSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

export const ContestTitle = styled.h1`
  font-size: 2.25rem;
  color: #1e293b;
  font-weight: 800;
  letter-spacing: -0.02em;
  margin-right: auto;
`;

export const StatusBadge = styled.span<{
  status: 'upcoming' | 'ongoing' | 'ended';
}>`
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-size: 0.9rem;
  font-weight: 600;

  ${({ status }) => {
    switch (status) {
      case 'upcoming':
        return `
          background: #dbeafe;
          color: #1e40af;
        `;
      case 'ongoing':
        return `
          background: #dcfce7;
          color: #166534;
        `;
      case 'ended':
        return `
          background: #f1f5f9;
          color: #475569;
        `;
    }
  }}
`;

export const VisibilityBadge = styled.span<{
  visibility: 'PUBLIC' | 'PRIVATE';
}>`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-size: 0.9rem;
  font-weight: 600;

  ${({ visibility }) =>
    visibility === 'PUBLIC'
      ? `
    background: #dbeafe;
    color: #1e40af;
  `
      : `
    background: #fee2e2;
    color: #991b1b;
  `}
  svg {
    font-size: 1em;
  }
`;

export const MetaInfo = styled.div`
  display: flex;
  gap: 2rem;
  color: #64748b;
`;

export const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1rem;

  svg {
    color: #94a3b8;
    font-size: 1.2em;
  }
`;

export const Section = styled.section`
  margin-bottom: 2.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: #1e293b;
  font-weight: 700;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    color: #3b82f6;
  }
`;

export const Description = styled.p`
  color: #475569;
  font-size: 1.1rem;
  line-height: 1.8;
  white-space: pre-wrap;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin: 2rem 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  background: #f8fafc;
  border-radius: 12px;
  overflow: hidden;
`;

export const ListItem = styled.li`
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e2e8f0;
  color: #475569;
  font-size: 1rem;

  &:last-child {
    border-bottom: none;
  }
`;

export const ParticipantGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
`;

export const ParticipantCard = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 12px;
  color: #475569;
  font-size: 0.95rem;
`;

export const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  object-fit: cover;
  background: #e2e8f0;
`;

export const LoadingSpinner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem;
  color: #64748b;

  svg {
    font-size: 2rem;
    color: #3b82f6;
    margin-bottom: 1rem;
    animation: spin 1s linear infinite;
  }

  span {
    font-size: 1.1rem;
    font-weight: 500;
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export const ErrorMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #dc2626;
  background: #fef2f2;
  border-radius: 12px;
  border: 1px solid #fecaca;
  margin: 2rem 0;

  strong {
    display: block;
    margin-bottom: 0.5rem;
  }
`;
