import React, { useState } from 'react';
import { Modal } from '../picklematch/modal/Modal';
import { useLanguage } from '../../contexts/LanguageContext';
import './ModalDemo.css';

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
    <div className={`modal-demo ${className || ''}`}>
      <div className="modal-demo__input-section">
        <label htmlFor="modal-text-input" className="modal-demo__label">
          {t('modal_demo_input_label')}
        </label>
        <input
          id="modal-text-input"
          type="text"
          value={inputText}
          onChange={handleInputChange}
          placeholder={t('modal_demo_input_placeholder')}
          className="modal-demo__input"
        />
      </div>

      <button onClick={handleOpenModal} className="modal-demo__button" type="button">
        {t('modal_demo_button')}
      </button>

      <Modal visible={isModalOpen} onClose={handleCloseModal}>
        <div className="modal-demo__content">
          <h2>{t('modal_content_title')}</h2>
          <p>{inputText || t('modal_no_text')}</p>
        </div>
      </Modal>
    </div>
  );
};
