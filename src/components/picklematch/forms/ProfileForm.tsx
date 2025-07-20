import React, { FC, useState, FormEvent, ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { ProfileFormProps, ProfileFormData } from '../types';
import './ProfileForm.css';

export const ProfileForm: FC<ProfileFormProps> = ({
  initialValues = { name: '', about: '' },
  onSubmit,
  className = '',
}) => {
  const { t } = useTranslation();
  const [values, setValues] = useState<ProfileFormData>(initialValues);
  const [errors, setErrors] = useState<Partial<ProfileFormData>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ProfileFormData, boolean>>>({});

  const validateField = (name: keyof ProfileFormData, value: string): string => {
    switch (name) {
      case 'name':
        if (!value.trim()) {
          return t('forms.profile.name.required', 'Name is required');
        }
        if (value.trim().length < 2) {
          return t('forms.profile.name.minLength', 'Name must be at least 2 characters');
        }
        if (value.trim().length > 50) {
          return t('forms.profile.name.maxLength', 'Name must be less than 50 characters');
        }
        return '';
      case 'about':
        if (value.trim().length > 500) {
          return t('forms.profile.about.maxLength', 'About must be less than 500 characters');
        }
        return '';
      default:
        return '';
    }
  };

  const validateForm = (formValues: ProfileFormData): Partial<ProfileFormData> => {
    const formErrors: Partial<ProfileFormData> = {};

    Object.keys(formValues).forEach((key) => {
      const fieldName = key as keyof ProfileFormData;
      const error = validateField(fieldName, formValues[fieldName]);
      if (error) {
        formErrors[fieldName] = error;
      }
    });

    return formErrors;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const fieldName = name as keyof ProfileFormData;

    setValues((prev) => ({ ...prev, [fieldName]: value }));

    // Clear error when user starts typing
    if (errors[fieldName]) {
      setErrors((prev) => ({ ...prev, [fieldName]: '' }));
    }
  };

  const handleBlur = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const fieldName = name as keyof ProfileFormData;

    setTouched((prev) => ({ ...prev, [fieldName]: true }));

    const error = validateField(fieldName, value);
    setErrors((prev) => ({ ...prev, [fieldName]: error }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formErrors = validateForm(values);
    setErrors(formErrors);

    // Mark all fields as touched
    setTouched({
      name: true,
      about: true,
    });

    if (Object.keys(formErrors).length === 0) {
      console.log('[DEBUG_LOG] ProfileForm submitted:', values);
      onSubmit(values);

      // Clear form after successful submission
      setValues({ name: '', about: '' });
      setTouched({});
      setErrors({});
    }
  };

  const getFieldClassName = (fieldName: keyof ProfileFormData) => {
    const baseClass = 'picklematch-profile-form-input';
    const hasError = touched[fieldName] && errors[fieldName];
    return hasError ? `${baseClass} picklematch-profile-form-input-error` : baseClass;
  };

  return (
    <form className={`picklematch-profile-form ${className}`} onSubmit={handleSubmit}>
      <div className="picklematch-profile-form-field">
        <label htmlFor="name" className="picklematch-profile-form-label">
          {t('forms.profile.name.label', 'Name')} *
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          className={getFieldClassName('name')}
          placeholder={t('forms.profile.name.placeholder', 'Enter your name')}
          autoFocus
        />
        {touched.name && errors.name && <span className="picklematch-profile-form-error">{errors.name}</span>}
      </div>

      <div className="picklematch-profile-form-field">
        <label htmlFor="about" className="picklematch-profile-form-label">
          {t('forms.profile.about.label', 'About')}
        </label>
        <textarea
          id="about"
          name="about"
          value={values.about}
          onChange={handleChange}
          onBlur={handleBlur}
          className={getFieldClassName('about')}
          placeholder={t('forms.profile.about.placeholder', 'Tell us about yourself')}
          rows={4}
        />
        {touched.about && errors.about && <span className="picklematch-profile-form-error">{errors.about}</span>}
      </div>

      <button type="submit" className="picklematch-profile-form-submit">
        {t('forms.profile.submit', 'Save Profile')}
      </button>
    </form>
  );
};
