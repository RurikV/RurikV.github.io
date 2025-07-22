import React, { useState } from 'react';
import { Modal } from '../picklematch/modal/Modal';
import { useLanguage } from '../../contexts/LanguageContext';
import {
  ModalDemoContainer,
  ModalDemoInputSection,
  ModalDemoLabel,
  ModalDemoInput,
  ModalDemoButton,
  ModalDemoContent,
} from './ModalDemo.styles';

export interface ModalDemoProps {
  className?: string;
}

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
