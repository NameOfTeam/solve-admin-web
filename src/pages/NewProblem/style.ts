import styled from '@emotion/styled';
import Markdown from 'react-markdown';

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: #f8fafc;
`;

export const Resizer = styled.div`
  width: 4px;
  height: 100%;
  cursor: col-resize;
  background-color: #e2e8f0;
  transition: all 0.2s ease;

  &:hover {
    background-color: #3b82f6;
  }

  &:active {
    background-color: #2563eb;
  }
`;

// Source Panel Styles
export const SourcePanel = styled.div<{ width: number }>`
  width: ${({ width }) => width}%;
  height: 100%;
  padding: 2rem;
  background-color: white;
  overflow-y: auto;
  border-right: 1px solid #e2e8f0;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f5f9;
  }

  &::-webkit-scrollbar-thumb {
    background: #cbd5e0;
    border-radius: 4px;
  }
`;

export const Title = styled.h1`
  font-size: 2rem;
  color: #1e293b;
  font-weight: 800;
  margin-bottom: 2rem;

  span {
    background: linear-gradient(135deg, #6366f1 0%, #3b82f6 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 2rem;
`;

export const Label = styled.label`
  display: block;
  font-size: 1rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.75rem;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.875rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  color: #1e293b;
  background: white;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &[type='number'] {
    width: 150px;
  }
`;

export const Error = styled.span`
  display: block;
  color: #dc2626;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

export const LimitContainer = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
`;

export const Button = styled.button`
  background: linear-gradient(135deg, #6366f1 0%, #3b82f6 100%);
  color: white;
  padding: 0.875rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
  width: 100%;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(99, 102, 241, 0.2);
  }

  &:disabled {
    background: linear-gradient(135deg, #94a3b8 0%, #64748b 100%);
    cursor: not-allowed;
  }
`;

// Preview Panel Styles
export const PreviewPanel = styled.div<{ width: number }>`
  width: ${({ width }) => width}%;
  height: 100%;
  background-color: #1e293b;
  overflow-y: auto;
  color: white;
  padding: 2rem;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #0f172a;
  }

  &::-webkit-scrollbar-thumb {
    background: #475569;
    border-radius: 4px;
  }
`;

export const PreviewTitle = styled.h1`
  font-size: 2rem;
  color: white;
  font-weight: 700;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #334155;
`;

export const Section = styled.div`
  margin-bottom: 2.5rem;
`;

export const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: #94a3b8;
  margin-bottom: 1rem;
  font-weight: 600;
`;

export const SectionContent = styled(Markdown)`
  color: #e2e8f0;
  font-size: 1.1rem;
  line-height: 1.8;

  p {
    margin-bottom: 1rem;
  }

  code {
    background: #2d3748;
    padding: 0.2em 0.4em;
    border-radius: 4px;
    font-size: 0.9em;
  }

  pre {
    background: #2d3748;
    padding: 1rem;
    border-radius: 8px;
    overflow-x: auto;
    margin: 1rem 0;
  }

  blockquote {
    border-left: 4px solid #3b82f6;
    padding-left: 1rem;
    margin: 1rem 0;
    color: #94a3b8;
  }
`;

export const MetaInfo = styled.div`
  display: flex;
  gap: 2rem;
  padding: 1rem;
  background: #334155;
  border-radius: 8px;
  margin-top: 2rem;
`;

export const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #94a3b8;
  font-size: 0.9rem;

  strong {
    color: white;
  }
`;

export const EditorWrapper = styled.div`
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.2s ease;

  &:focus-within {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  .monaco-editor {
    padding: 0.5rem 0;
  }

  .monaco-editor .margin {
    background-color: white !important;
  }

  .monaco-editor .monaco-scrollable-element {
    ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }

    ::-webkit-scrollbar-track {
      background: #f1f5f9;
    }

    ::-webkit-scrollbar-thumb {
      background: #cbd5e0;
      border-radius: 4px;
    }
  }
`;
