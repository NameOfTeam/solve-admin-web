import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaBell,
  FaBug,
  FaCode,
  FaCog,
  FaDatabase,
  FaEnvelope,
  FaHistory,
  FaKey,
  FaLock,
  FaSave,
  FaServer,
  FaShieldAlt,
  FaSlack,
  FaUndo,
  FaUserShield,
} from 'react-icons/fa';
import * as S from './style';

interface SettingOption {
  id: string;
  label: string;
  description: string;
  value: boolean;
  icon: React.ReactNode;
}

interface SettingSection {
  title: string;
  icon: React.ReactNode;
  description: string;
  options: SettingOption[];
}

const Settings = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    slackIntegration: false,
    twoFactor: true,
    secureTransfer: true,
    autoBackup: true,
    maintenanceMode: false,
    debugMode: false,
    apiAccess: false,
    logRetention: true,
  });

  const [isDirty, setIsDirty] = useState(false);

  const settingSections: SettingSection[] = [
    {
      title: '알림 설정',
      icon: <FaBell />,
      description: '알림 및 메시지 전달 설정을 관리합니다',
      options: [
        {
          id: 'emailNotifications',
          label: '이메일 알림',
          description: '중요 이벤트 발생 시 이메일로 알림을 받습니다',
          icon: <FaEnvelope />,
          value: settings.emailNotifications,
        },
        {
          id: 'slackIntegration',
          label: 'Slack 알림',
          description: 'Slack 워크스페이스로 알림을 전송합니다',
          icon: <FaSlack />,
          value: settings.slackIntegration,
        },
      ],
    },
    {
      title: '보안 설정',
      icon: <FaUserShield />,
      description: '계정 및 데이터 보안 설정을 관리합니다',
      options: [
        {
          id: 'twoFactor',
          label: '2단계 인증',
          description: '로그인 시 추가 인증을 요구합니다',
          icon: <FaLock />,
          value: settings.twoFactor,
        },
        {
          id: 'secureTransfer',
          label: '보안 전송',
          description: '모든 데이터 전송을 암호화합니다',
          icon: <FaShieldAlt />,
          value: settings.secureTransfer,
        },
      ],
    },
    {
      title: '시스템 설정',
      icon: <FaServer />,
      description: '시스템 운영 및 유지보수 설정을 관리합니다',
      options: [
        {
          id: 'autoBackup',
          label: '자동 백업',
          description: '매일 시스템 데이터를 자동으로 백업합니다',
          icon: <FaDatabase />,
          value: settings.autoBackup,
        },
        {
          id: 'maintenanceMode',
          label: '유지보수 모드',
          description: '시스템 점검을 위한 유지보수 모드를 활성화합니다',
          icon: <FaCog />,
          value: settings.maintenanceMode,
        },
        {
          id: 'debugMode',
          label: '디버그 모드',
          description: '상세한 로그 및 오류 정보를 표시합니다',
          icon: <FaBug />,
          value: settings.debugMode,
        },
      ],
    },
    {
      title: 'API 설정',
      icon: <FaKey />,
      description: 'API 접근 및 로그 관리 설정을 관리합니다',
      options: [
        {
          id: 'apiAccess',
          label: 'API 접근',
          description: '외부 시스템의 API 접근을 허용합니다',
          icon: <FaCode />,
          value: settings.apiAccess,
        },
        {
          id: 'logRetention',
          label: '로그 보관',
          description: '시스템 로그를 30일간 보관합니다',
          icon: <FaHistory />,
          value: settings.logRetention,
        },
      ],
    },
  ];
  const handleToggle = (id: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [id]: !prev[id] }));
    setIsDirty(true);
  };

  const handleSave = () => {
    // API 호출 로직
    setIsDirty(false);
  };

  const handleReset = () => {
    setSettings({
      emailNotifications: true,
      slackIntegration: false,
      twoFactor: true,
      secureTransfer: true,
      autoBackup: true,
      maintenanceMode: false,
      debugMode: false,
      apiAccess: false,
      logRetention: true,
    });
    setIsDirty(true);
  };

  return (
    <S.Container>
      <S.Header>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <S.Title>
            시스템 <span>설정</span>
          </S.Title>
          <S.Description>시스템 운영에 필요한 다양한 설정을 관리할 수 있습니다</S.Description>
        </motion.div>

        <S.Actions>
          <S.ActionButton
            type="button"
            variant="secondary"
            onClick={handleReset}
            disabled={!isDirty}
          >
            <FaUndo /> 초기화
          </S.ActionButton>
          <S.ActionButton type="button" variant="primary" onClick={handleSave} disabled={!isDirty}>
            <FaSave /> 변경사항 저장
          </S.ActionButton>
        </S.Actions>
      </S.Header>

      <S.Content>
        {settingSections.map((section, index) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
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
                    <S.OptionInfo>
                      <S.OptionIcon>{option.icon}</S.OptionIcon>
                      <div>
                        <S.OptionLabel>{option.label}</S.OptionLabel>
                        <S.OptionDescription>{option.description}</S.OptionDescription>
                      </div>
                    </S.OptionInfo>
                    <S.Toggle
                      isActive={settings[option.id as keyof typeof settings]}
                      onClick={() => handleToggle(option.id as keyof typeof settings)}
                    >
                      <S.ToggleHandle layout transition={spring} />
                    </S.Toggle>
                  </S.OptionItem>
                ))}
              </S.OptionList>
            </S.Section>
          </motion.div>
        ))}
      </S.Content>
    </S.Container>
  );
};

const spring = {
  type: 'spring',
  stiffness: 700,
  damping: 30,
};

export default Settings;
