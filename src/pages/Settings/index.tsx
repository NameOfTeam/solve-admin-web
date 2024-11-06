import React from 'react';
import { motion } from 'framer-motion';
import { FaBell, FaUserShield, FaServer, FaKey, FaSave, FaUndo } from 'react-icons/fa';
import * as S from './style';

interface SettingOption {
  id: string;
  label: string;
  value: boolean;
}

interface SettingSection {
  title: string;
  icon: React.ReactNode;
  description: string;
  options: SettingOption[];
}

const Settings: React.FC = () => {
  const [settings, setSettings] = React.useState<Record<string, boolean>>({
    emailNotifications: true,
    slackIntegration: false,
    darkMode: false,
    autoBackup: true,
    twoFactor: true,
    apiAccess: false,
    maintenanceMode: false,
    debugMode: false,
    secureTransfer: true,
    logRetention: true,
  });

  const [isDirty, setIsDirty] = React.useState(false);

  const settingSections: SettingSection[] = [
    {
      title: '알림 설정',
      icon: <FaBell />,
      description: '시스템 알림 및 통합 설정을 관리합니다.',
      options: [
        { id: 'emailNotifications', label: '이메일 알림', value: settings.emailNotifications },
        { id: 'slackIntegration', label: 'Slack 알림', value: settings.slackIntegration },
      ],
    },
    {
      title: '보안 설정',
      icon: <FaUserShield />,
      description: '계정 및 시스템 보안 설정을 관리합니다.',
      options: [
        { id: 'twoFactor', label: '2단계 인증', value: settings.twoFactor },
        { id: 'secureTransfer', label: '보안 전송', value: settings.secureTransfer },
      ],
    },
    {
      title: '시스템 설정',
      icon: <FaServer />,
      description: '시스템 동작 및 성능 관련 설정을 관리합니다.',
      options: [
        { id: 'autoBackup', label: '자동 백업', value: settings.autoBackup },
        { id: 'maintenanceMode', label: '유지보수 모드', value: settings.maintenanceMode },
        { id: 'debugMode', label: '디버그 모드', value: settings.debugMode },
      ],
    },
    {
      title: 'API 설정',
      icon: <FaKey />,
      description: 'API 접근 및 권한 설정을 관리합니다.',
      options: [
        { id: 'apiAccess', label: 'API 접근 허용', value: settings.apiAccess },
        { id: 'logRetention', label: '로그 보관', value: settings.logRetention },
      ],
    },
  ];

  const handleToggle = (id: string) => {
    setSettings((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
    setIsDirty(true);
  };

  const handleSave = () => {
    // API 호출 로직
    setIsDirty(false);
  };

  const handleReset = () => {
    // 초기 설정으로 복원
    setSettings({
      emailNotifications: true,
      slackIntegration: false,
      darkMode: false,
      autoBackup: true,
      twoFactor: true,
      apiAccess: false,
      maintenanceMode: false,
      debugMode: false,
      secureTransfer: true,
      logRetention: true,
    });
    setIsDirty(true);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20,
      },
    },
  };

  return (
    <S.Container variants={containerVariants} initial="hidden" animate="visible">
      <S.Header>
        <S.HeaderContent>
          <S.Title>설정</S.Title>
          <S.Description>시스템 설정을 관리합니다</S.Description>
        </S.HeaderContent>
        <S.HeaderActions>
          <S.ActionButton onClick={handleReset} variant="secondary" disabled={!isDirty}>
            <FaUndo /> 초기화
          </S.ActionButton>
          <S.ActionButton onClick={handleSave} variant="primary" disabled={!isDirty}>
            <FaSave /> 저장
          </S.ActionButton>
        </S.HeaderActions>
      </S.Header>

      <S.Grid>
        {settingSections.map((section) => (
          <motion.div key={section.title} variants={itemVariants}>
            <S.Section>
              <S.SectionHeader>
                <S.SectionIcon>{section.icon}</S.SectionIcon>
                <div>
                  <S.SectionTitle>{section.title}</S.SectionTitle>
                  <S.SectionDescription>{section.description}</S.SectionDescription>
                </div>
              </S.SectionHeader>

              <S.OptionList>
                {section.options.map((option) => (
                  <S.OptionItem key={option.id}>
                    <S.OptionLabel>{option.label}</S.OptionLabel>
                    <S.Toggle
                      isActive={settings[option.id]}
                      onClick={() => handleToggle(option.id)}
                    >
                      <S.ToggleHandle
                        animate={{ x: settings[option.id] ? 22 : 2 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    </S.Toggle>
                  </S.OptionItem>
                ))}
              </S.OptionList>
            </S.Section>
          </motion.div>
        ))}
      </S.Grid>
    </S.Container>
  );
};

export default Settings;
