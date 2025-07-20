import React, { useState } from 'react';
import styledComponents from 'styled-components';
import classNames from 'clsx';
import { ProfileFormData, ProfileFormProps } from '../../../components/picklematch/types';

const FormContainer = styledComponents.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 400px;
  margin: 0 auto;
  padding: 24px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const FormField = styledComponents.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styledComponents.label`
  font-weight: 600;
  color: #2c3e50;
  font-size: 14px;
`;

const Input = styledComponents.input`
  padding: 12px 16px;
  border: 2px solid #e1e8ed;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #27ae60;
  }

  &.error {
    border-color: #e74c3c;
  }
`;

const TextArea = styledComponents.textarea`
  padding: 12px 16px;
  border: 2px solid #e1e8ed;
  border-radius: 8px;
  font-size: 16px;
  min-height: 100px;
  resize: vertical;
  font-family: inherit;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #27ae60;
  }

  &.error {
    border-color: #e74c3c;
  }
`;

const ErrorMessage = styledComponents.span`
  color: #e74c3c;
  font-size: 12px;
  margin-top: 4px;
`;

const SubmitButton = styledComponents.button`
  background: #27ae60;
  color: white;
  border: none;
  padding: 14px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background: #219a52;
  }

  &:active {
    background: #1e8449;
  }

  &:disabled {
    background: #bdc3c7;
    cursor: not-allowed;
  }
`;

const validateForm = (values: ProfileFormData): Partial<ProfileFormData> => {
  const errors: Partial<ProfileFormData> = {};

  if (!values.name.trim()) {
    errors.name = 'Name is required';
  } else if (values.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters long';
  }

  if (!values.about.trim()) {
    errors.about = 'About field is required';
  } else if (values.about.trim().length < 10) {
    errors.about = 'About must be at least 10 characters long';
  }

  return errors;
};

export const ProfileForm: React.FC<ProfileFormProps> = ({
  initialValues = { name: '', about: '' },
  onSubmit,
  className,
}) => {
  const [values, setValues] = useState<ProfileFormData>(initialValues);
  const [errors, setErrors] = useState<Partial<ProfileFormData>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ProfileFormData, boolean>>>({});

  const handleChange =
    (field: keyof ProfileFormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const newValues = { ...values, [field]: e.target.value };
      setValues(newValues);

      // Clear error when user starts typing
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };

  const handleBlur = (field: keyof ProfileFormData) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));

    // Validate field on blur
    const fieldErrors = validateForm(values);
    if (fieldErrors[field]) {
      setErrors((prev) => ({ ...prev, [field]: fieldErrors[field] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formErrors = validateForm(values);
    setErrors(formErrors);
    setTouched({ name: true, about: true });

    if (Object.keys(formErrors).length === 0) {
      console.log('[DEBUG_LOG] Profile form submitted:', values);
      onSubmit(values);

      // Clear form after successful submission
      setValues({ name: '', about: '' });
      setTouched({});
      setErrors({});
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit} className={className}>
      <FormField>
        <Label htmlFor="name">Name *</Label>
        <Input
          id="name"
          type="text"
          value={values.name}
          onChange={handleChange('name')}
          onBlur={handleBlur('name')}
          className={classNames({ error: touched.name && errors.name })}
          placeholder="Enter your name"
        />
        {touched.name && errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
      </FormField>

      <FormField>
        <Label htmlFor="about">About *</Label>
        <TextArea
          id="about"
          value={values.about}
          onChange={handleChange('about')}
          onBlur={handleBlur('about')}
          className={classNames({ error: touched.about && errors.about })}
          placeholder="Tell us about yourself"
        />
        {touched.about && errors.about && <ErrorMessage>{errors.about}</ErrorMessage>}
      </FormField>

      <SubmitButton type="submit">Save Profile</SubmitButton>
    </FormContainer>
  );
};

ProfileForm.displayName = 'ProfileForm';
