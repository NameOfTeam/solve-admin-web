import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DatePicker from 'react-datepicker';
import {
  FaCalendarAlt,
  FaTimes,
  FaCheck,
  FaChevronLeft,
  FaChevronRight,
  FaClock,
  FaRegCalendarAlt,
} from 'react-icons/fa';
import * as S from './style';
import 'react-datepicker/dist/react-datepicker.css';

interface DateRangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (startDate: Date, endDate: Date) => void;
  initialStartDate?: Date;
  initialEndDate?: Date;
}

const DateRangeModal: React.FC<DateRangeModalProps> = ({
  isOpen,
  onClose,
  onApply,
  initialStartDate = new Date(Date.now() - 180 * 24 * 60 * 60 * 1000),
  initialEndDate = new Date(),
}) => {
  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(initialEndDate);
  const [activeTab, setActiveTab] = useState<'preset' | 'custom'>('preset');
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null);

  const presetRanges = [
    { label: '최근 7일', days: 7, icon: <FaClock /> },
    { label: '최근 30일', days: 30, icon: <FaRegCalendarAlt /> },
    { label: '최근 3개월', days: 90, icon: <FaRegCalendarAlt /> },
    { label: '최근 6개월', days: 180, icon: <FaRegCalendarAlt /> },
    { label: '최근 1년', days: 365, icon: <FaCalendarAlt /> },
  ];

  useEffect(() => {
    const now = new Date();
    const diffDays = Math.round((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const matchingPreset = presetRanges.find((range) => Math.abs(range.days - diffDays) < 1);
    setSelectedPreset(matchingPreset ? presetRanges.indexOf(matchingPreset) : null);
  }, [startDate]);

  const handlePresetClick = (days: number, index: number) => {
    const end = new Date();
    const start = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
    setStartDate(start);
    setEndDate(end);
    setSelectedPreset(index);
  };

  const handleApply = () => {
    onApply(startDate, endDate);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <S.Overlay initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <S.Modal
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <S.ModalHeader>
              <S.Title>
                <FaCalendarAlt /> 기간 선택
              </S.Title>
              <S.CloseButton onClick={onClose}>
                <FaTimes />
              </S.CloseButton>
            </S.ModalHeader>

            <S.TabContainer>
              <S.Tab active={activeTab === 'preset'} onClick={() => setActiveTab('preset')}>
                빠른 선택
              </S.Tab>
              <S.Tab active={activeTab === 'custom'} onClick={() => setActiveTab('custom')}>
                직접 선택
              </S.Tab>
            </S.TabContainer>

            <S.Content>
              <AnimatePresence mode="wait">
                {activeTab === 'preset' ? (
                  <motion.div
                    key="preset"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <S.PresetGrid>
                      {presetRanges.map((range, index) => (
                        <S.PresetButton
                          key={range.days}
                          onClick={() => handlePresetClick(range.days, index)}
                          isSelected={selectedPreset === index}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {range.icon} {range.label}
                        </S.PresetButton>
                      ))}
                    </S.PresetGrid>
                  </motion.div>
                ) : (
                  <motion.div
                    key="custom"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <S.DatePickerContainer>
                      <S.DatePickerWrapper>
                        <S.Label>시작일</S.Label>
                        <DatePicker
                          selected={startDate}
                          onChange={(date) => {
                            setStartDate(date!);
                            setSelectedPreset(null);
                          }}
                          selectsStart
                          startDate={startDate}
                          endDate={endDate}
                          maxDate={endDate}
                          dateFormat="yyyy년 MM월 dd일"
                          customInput={<S.CustomInput />}
                          previousMonthButtonLabel={<FaChevronLeft />}
                          nextMonthButtonLabel={<FaChevronRight />}
                        />
                      </S.DatePickerWrapper>
                      <S.DatePickerWrapper>
                        <S.Label>종료일</S.Label>
                        <DatePicker
                          selected={endDate}
                          onChange={(date) => {
                            setEndDate(date!);
                            setSelectedPreset(null);
                          }}
                          selectsEnd
                          startDate={startDate}
                          endDate={endDate}
                          minDate={startDate}
                          maxDate={new Date()}
                          dateFormat="yyyy년 MM월 dd일"
                          customInput={<S.CustomInput />}
                          previousMonthButtonLabel={<FaChevronLeft />}
                          nextMonthButtonLabel={<FaChevronRight />}
                        />
                      </S.DatePickerWrapper>
                    </S.DatePickerContainer>
                  </motion.div>
                )}
              </AnimatePresence>
            </S.Content>

            <S.Actions>
              <S.CancelButton
                onClick={onClose}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                취소
              </S.CancelButton>
              <S.ApplyButton
                onClick={handleApply}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaCheck /> 적용
              </S.ApplyButton>
            </S.Actions>
          </S.Modal>
        </S.Overlay>
      )}
    </AnimatePresence>
  );
};

export default DateRangeModal;
