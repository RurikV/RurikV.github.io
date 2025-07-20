import React, { useState } from 'react';
import styledComponents from 'styled-components';
import classNames from 'clsx';
import { ProductFormData, ProductFormErrors, ProductFormProps } from '../../../components/picklematch/types';

const FormContainer = styledComponents.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 500px;
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

const FormRow = styledComponents.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
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
  min-height: 120px;
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

const Select = styledComponents.select`
  padding: 12px 16px;
  border: 2px solid #e1e8ed;
  border-radius: 8px;
  font-size: 16px;
  background: white;
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

const ImagePreview = styledComponents.div`
  margin-top: 8px;
  border: 2px dashed #e1e8ed;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  background: #f8f9fa;
`;

const PreviewImage = styledComponents.img`
  max-width: 200px;
  max-height: 150px;
  border-radius: 8px;
  object-fit: cover;
`;

const categories = [
  'Cucumber Pickles',
  'Vegetable Pickles',
  'Fruit Pickles',
  'Fermented Pickles',
  'Quick Pickles',
  'Specialty Pickles',
];

const validateForm = (values: ProductFormData): ProductFormErrors => {
  const errors: ProductFormErrors = {};

  if (!values.title.trim()) {
    errors.title = 'Product title is required';
  } else if (values.title.trim().length < 3) {
    errors.title = 'Title must be at least 3 characters long';
  }

  if (!values.description.trim()) {
    errors.description = 'Product description is required';
  } else if (values.description.trim().length < 20) {
    errors.description = 'Description must be at least 20 characters long';
  }

  if (!values.price || values.price <= 0) {
    errors.price = 'Price must be greater than 0';
  } else if (values.price > 10000) {
    errors.price = 'Price cannot exceed $10,000';
  }

  if (!values.category) {
    errors.category = 'Please select a category';
  }

  if (!values.image.trim()) {
    errors.image = 'Product image URL is required';
  } else if (!isValidUrl(values.image)) {
    errors.image = 'Please enter a valid image URL';
  }

  return errors;
};

const isValidUrl = (string: string): boolean => {
  try {
    new URL(string);
    return true;
  } catch {
    return false;
  }
};

export const ProductForm: React.FC<ProductFormProps> = ({
  initialValues = {
    title: '',
    description: '',
    price: 0,
    category: '',
    image: '',
  },
  onSubmit,
  className,
}) => {
  const [values, setValues] = useState<ProductFormData>(initialValues);
  const [errors, setErrors] = useState<ProductFormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ProductFormData, boolean>>>({});

  const handleChange =
    (field: keyof ProductFormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const value = field === 'price' ? parseFloat(e.target.value) || 0 : e.target.value;
      const newValues = { ...values, [field]: value };
      setValues(newValues);

      // Clear error when user starts typing
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };

  const handleBlur = (field: keyof ProductFormData) => () => {
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
    setTouched({
      title: true,
      description: true,
      price: true,
      category: true,
      image: true,
    });

    if (Object.keys(formErrors).length === 0) {
      console.log('[DEBUG_LOG] Product form submitted:', values);
      onSubmit(values);

      // Clear form after successful submission
      setValues({
        title: '',
        description: '',
        price: 0,
        category: '',
        image: '',
      });
      setTouched({});
      setErrors({});
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit} className={className}>
      <FormField>
        <Label htmlFor="title">Product Title *</Label>
        <Input
          id="title"
          type="text"
          value={values.title}
          onChange={handleChange('title')}
          onBlur={handleBlur('title')}
          className={classNames({ error: touched.title && errors.title })}
          placeholder="Enter product title"
        />
        {touched.title && errors.title && <ErrorMessage>{errors.title}</ErrorMessage>}
      </FormField>

      <FormField>
        <Label htmlFor="description">Description *</Label>
        <TextArea
          id="description"
          value={values.description}
          onChange={handleChange('description')}
          onBlur={handleBlur('description')}
          className={classNames({ error: touched.description && errors.description })}
          placeholder="Describe your pickle product in detail"
        />
        {touched.description && errors.description && <ErrorMessage>{errors.description}</ErrorMessage>}
      </FormField>

      <FormRow>
        <FormField>
          <Label htmlFor="price">Price ($) *</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            min="0"
            value={values.price || ''}
            onChange={handleChange('price')}
            onBlur={handleBlur('price')}
            className={classNames({ error: touched.price && errors.price })}
            placeholder="0.00"
          />
          {touched.price && errors.price && <ErrorMessage>{errors.price}</ErrorMessage>}
        </FormField>

        <FormField>
          <Label htmlFor="category">Category *</Label>
          <Select
            id="category"
            value={values.category}
            onChange={handleChange('category')}
            onBlur={handleBlur('category')}
            className={classNames({ error: touched.category && errors.category })}
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Select>
          {touched.category && errors.category && <ErrorMessage>{errors.category}</ErrorMessage>}
        </FormField>
      </FormRow>

      <FormField>
        <Label htmlFor="image">Image URL *</Label>
        <Input
          id="image"
          type="url"
          value={values.image}
          onChange={handleChange('image')}
          onBlur={handleBlur('image')}
          className={classNames({ error: touched.image && errors.image })}
          placeholder="https://example.com/image.jpg"
        />
        {touched.image && errors.image && <ErrorMessage>{errors.image}</ErrorMessage>}
        {values.image && isValidUrl(values.image) && (
          <ImagePreview>
            <PreviewImage src={values.image} alt="Product preview" />
          </ImagePreview>
        )}
      </FormField>

      <SubmitButton type="submit">Save Product</SubmitButton>
    </FormContainer>
  );
};

ProductForm.displayName = 'ProductForm';
