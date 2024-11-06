import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
  backdrop-filter: blur(4px);
`;

export const Modal = styled(motion.div)`
  background: white;
  border-radius: 16px;
  width: 100%;
  max-width: 500px;
  overflow: hidden;
  box-shadow:
    0 10px 25px -5px rgba(0, 0, 0, 0.1),
    0 0 0 1px rgba(255, 255, 255, 0.1);
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
  background: #f8fafc;
`;

export const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    color: #6366f1;
  }
`;

export const CloseButton = styled.button`
  border: none;
  background: none;
  color: #64748b;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    background: #f1f5f9;
    color: #1e293b;
  }
`;

export const TabContainer = styled.div`
  display: flex;
  padding: 1rem 1.5rem;
  gap: 1rem;
  border-bottom: 1px solid #e2e8f0;
  background: #f8fafc;
`;

export const Tab = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
  background: ${(props) => (props.active ? 'white' : 'transparent')};
  color: ${(props) => (props.active ? '#1e293b' : '#64748b')};
  box-shadow: ${(props) => (props.active ? '0 2px 4px rgba(0, 0, 0, 0.05)' : 'none')};

  &:hover {
    background: ${(props) => (props.active ? 'white' : '#f1f5f9')};
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 2px;
    background: ${(props) =>
      props.active ? 'linear-gradient(135deg, #6366f1 0%, #3b82f6 100%)' : 'transparent'};
    transform: scaleX(${(props) => (props.active ? 1 : 0)});
    transition: transform 0.2s ease;
  }
`;

export const Content = styled.div`
  padding: 1.5rem;
  min-height: 300px;
`;

export const PresetGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

export const PresetButton = styled(motion.button)<{ isSelected: boolean }>`
  padding: 1rem;
  border: 2px solid ${(props) => (props.isSelected ? '#6366f1' : '#e2e8f0')};
  border-radius: 12px;
  background: ${(props) =>
    props.isSelected
      ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)'
      : 'white'};
  color: ${(props) => (props.isSelected ? '#6366f1' : '#1e293b')};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  box-shadow: ${(props) =>
    props.isSelected ? '0 0 0 3px rgba(99, 102, 241, 0.1)' : '0 1px 2px rgba(0, 0, 0, 0.05)'};

  svg {
    color: ${(props) => (props.isSelected ? '#6366f1' : '#64748b')};
  }

  &:hover {
    border-color: #6366f1;
    background: ${(props) =>
      props.isSelected
        ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(59, 130, 246, 0.15) 100%)'
        : '#f8fafc'};

    svg {
      color: #6366f1;
    }
  }
`;

export const DatePickerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const DatePickerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Label = styled.label`
  font-size: 0.95rem;
  font-weight: 500;
  color: #64748b;
`;

export const CustomInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  color: #1e293b;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }

  &:hover {
    border-color: #cbd5e1;
  }
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 1.5rem;
  border-top: 1px solid #e2e8f0;
  background: #f8fafc;
`;

export const CancelButton = styled(motion.button)`
  padding: 0.75rem 1.5rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  background: white;
  color: #64748b;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f8fafc;
    border-color: #cbd5e1;
  }
`;

export const ApplyButton = styled(motion.button)`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  background: linear-gradient(135deg, #6366f1 0%, #3b82f6 100%);
  color: white;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(99, 102, 241, 0.1);

  &:hover {
    box-shadow: 0 4px 6px rgba(99, 102, 241, 0.2);
  }
`;

// DatePicker 커스텀 스타일
export const GlobalStyle = styled.div`
  .react-datepicker {
    font-family: inherit;
    border: none;
    box-shadow:
      0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
    border-radius: 12px;
    overflow: hidden;
  }

  .react-datepicker__header {
    background: #f8fafc;
    border-bottom: 1px solid #e2e8f0;
    padding: 1rem;
  }

  .react-datepicker__current-month {
    color: #1e293b;
    font-weight: 600;
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }

  .react-datepicker__day-names {
    margin-top: 0.5rem;
  }

  .react-datepicker__day-name {
    color: #64748b;
    font-weight: 500;
    width: 2rem;
    line-height: 2rem;
  }

  .react-datepicker__day {
    color: #1e293b;
    width: 2rem;
    line-height: 2rem;
    border-radius: 8px;
    transition: all 0.2s ease;

    &:hover {
      background: #f1f5f9;
    }
  }

  .react-datepicker__day--selected {
    background: #3b82f6;
    color: white;

    &:hover {
      background: #2563eb;
    }
  }

  .react-datepicker__day--keyboard-selected {
    background: #bfdbfe;
    color: #1e40af;

    &:hover {
      background: #93c5fd;
    }
  }

  .react-datepicker__day--disabled {
    color: #cbd5e1;
    cursor: not-allowed;

    &:hover {
      background: transparent;
    }
  }

  .react-datepicker__navigation {
    top: 1rem;

    &--previous {
      left: 1rem;
    }

    &--next {
      right: 1rem;
    }
  }

  .react-datepicker__navigation-icon {
    &::before {
      border-color: #64748b;
    }
  }

  .react-datepicker__month-container {
    padding: 0.5rem;
  }

  .react-datepicker__day--in-range {
    background: #dbeafe;
    color: #1e40af;
  }

  .react-datepicker__day--in-selecting-range {
    background: #bfdbfe;
  }

  .react-datepicker__day--range-start,
  .react-datepicker__day--range-end {
    background: #3b82f6;
    color: white;
  }

  .react-datepicker__day--today {
    position: relative;
    font-weight: 600;

    &::after {
      content: '';
      position: absolute;
      bottom: 4px;
      left: 50%;
      transform: translateX(-50%);
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: #3b82f6;
    }
  }

  .react-datepicker__triangle {
    display: none;
  }

  .react-datepicker__navigation-icon {
    font-size: 0;
  }

  .react-datepicker__year-read-view--down-arrow,
  .react-datepicker__month-read-view--down-arrow {
    border-color: #64748b;
  }

  .react-datepicker__year-dropdown,
  .react-datepicker__month-dropdown {
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }

  .react-datepicker__year-option,
  .react-datepicker__month-option {
    padding: 0.5rem;

    &:hover {
      background: #f1f5f9;
    }

    &--selected {
      background: #dbeafe;
      color: #1e40af;
    }
  }
`;
