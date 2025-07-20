import React, { useState } from 'react';
import { styled } from 'styled-components';
import { Modal } from '../picklematch/modal/Modal';
import { useLanguage } from '../../contexts/LanguageContext';

export interface ModalDemoProps {
  className?: string;
}

// Styled components
const ModalDemoContainer = styled.div<{ className?: string }>`
  padding: 20px;
  max-width: 500px;
  margin: 0 auto;
`;

const ModalDemoInputSection = styled.div`
  margin-bottom: 20px;
`;

const ModalDemoLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: ${(props) => props.theme.colorTextPrimary};
`;

const ModalDemoInput = styled.input`
  width: 100%;
  padding: 12px;
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.2s ease;
  border: 2px solid;

  border-color: ${(props) => props.theme.colorBorder};
  background-color: ${(props) => props.theme.colorBgPrimary};
  color: ${(props) => props.theme.colorTextPrimary};

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
    border-color: ${(props) => props.theme.colorPrimary};
  }
`;

const ModalDemoButton = styled.button`
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  background-color: ${(props) => props.theme.colorPrimary};

  &:hover {
    background-color: ${(props) => props.theme.colorPrimaryHover};
  }

  &:active {
    background-color: ${(props) => props.theme.colorPrimaryActive};
  }
`;

const ModalDemoContent = styled.div`
  text-align: center;

  h2 {
    margin-top: 0;
    margin-bottom: 16px;
    color: ${(props) => props.theme.colorTextPrimary};
  }

  p {
    font-size: 16px;
    line-height: 1.5;
    margin: 0;
    color: ${(props) => props.theme.colorTextSecondary};
  }
`;

export const ModalDemo: React.FC<ModalDemoProps> = ({ className }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const { t } = useLanguage();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  return (
    <ModalDemoContainer className={className}>
      <ModalDemoInputSection>
        <ModalDemoLabel htmlFor="modal-text-input">{t('modal_demo_input_label')}</ModalDemoLabel>
        <ModalDemoInput
          id="modal-text-input"
          type="text"
          value={inputText}
          onChange={handleInputChange}
          placeholder={t('modal_demo_input_placeholder')}
        />
      </ModalDemoInputSection>

      <ModalDemoButton onClick={handleOpenModal} type="button">
        {t('modal_demo_button')}
      </ModalDemoButton>

      <Modal visible={isModalOpen} onClose={handleCloseModal}>
        <ModalDemoContent>
          <h2>{t('modal_content_title')}</h2>
          <p>{inputText || t('modal_no_text')}</p>
        </ModalDemoContent>
      </Modal>
    </ModalDemoContainer>
  );
};
