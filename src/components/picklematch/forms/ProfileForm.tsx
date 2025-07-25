import React, { FC, useState, FormEvent, ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { ProfileFormProps, ProfileFormData } from '../types';
import './ProfileForm.css';

// ZOD schema for ProfileFormData validation
const createProfileFormSchema = (t: (key: string, fallback: string) => string) =>
  z.object({
    name: z
      .string()
      .min(1, t('forms.profile.name.required', 'Name is required'))
      .min(2, t('forms.profile.name.minLength', 'Name must be at least 2 characters'))
      .max(50, t('forms.profile.name.maxLength', 'Name must be less than 50 characters'))
      .transform((val) => val.trim()),
    about: z
      .string()
      .max(500, t('forms.profile.about.maxLength', 'About must be less than 500 characters'))
      .optional()
      .default(''),
    isAdmin: z.boolean().default(false),
  });

export const ProfileForm: FC<ProfileFormProps> = ({
  initialValues = { name: '', about: '', isAdmin: false },
  onSubmit,
  className = '',
}) => {
  const { t } = useTranslation();
  const [values, setValues] = useState<ProfileFormData>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof ProfileFormData, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ProfileFormData, boolean>>>({});

  const profileFormSchema = createProfileFormSchema(t);

  const validateField = (name: keyof ProfileFormData, value: string | boolean): string => {
    try {
      const fieldSchema = profileFormSchema.shape[name];
      fieldSchema.parse(value);
      return '';
    } catch (error) {
      if (error instanceof z.ZodError) {
        return error.errors[0]?.message || '';
      }
      return '';
    }
  };

  const validateForm = (formValues: ProfileFormData): Partial<Record<keyof ProfileFormData, string>> => {
    try {
      profileFormSchema.parse(formValues);
      return {};
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formErrors: Partial<Record<keyof ProfileFormData, string>> = {};
        error.errors.forEach((err) => {
          if (err.path.length > 0) {
            const fieldName = err.path[0] as keyof ProfileFormData;
            formErrors[fieldName] = err.message;
          }
        });
        return formErrors;
      }
      return {};
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, type } = e.target;
    const fieldName = name as keyof ProfileFormData;
    const value = type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;

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
      setValues({ name: '', about: '', isAdmin: false });
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

      <div className="picklematch-profile-form-field">
        <label className="picklematch-profile-form-checkbox-label">
          <input
            name="isAdmin"
            type="checkbox"
            checked={values.isAdmin}
            onChange={handleChange}
            className="picklematch-profile-form-checkbox"
          />
          {t('forms.profile.isAdmin.label', 'Admin User')}
        </label>
      </div>

      <button type="submit" className="picklematch-profile-form-submit">
        {t('forms.profile.submit', 'Save Profile')}
      </button>
    </form>
  );
};
