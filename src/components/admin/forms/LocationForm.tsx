import React, { useState } from 'react';
import { styled } from 'styled-components';
import { Location } from '../../../store/slices/locationsSlice';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 400px;
  width: 100%;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Label = styled.label`
  font-weight: 600;
  color: ${(props) => props.theme.colorTextPrimary};
  font-size: 14px;
`;

const Input = styled.input`
  padding: 10px 12px;
  border: 2px solid ${(props) => props.theme.colorBorder};
  border-radius: 6px;
  font-size: 14px;
  background: ${(props) => props.theme.colorBgPrimary};
  color: ${(props) => props.theme.colorTextPrimary};
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colorPrimary};
  }

  &.error {
    border-color: #e74c3c;
  }
`;

const CoordinatesGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`;

const ErrorMessage = styled.span`
  color: #e74c3c;
  font-size: 12px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 20px;
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  flex: 1;
  padding: 12px 20px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;

  ${(props) =>
    props.variant === 'primary'
      ? `
    background: ${props.theme.colorPrimary};
    color: white;
    &:hover {
      opacity: 0.9;
    }
  `
      : `
    background: ${props.theme.colorBgSecondary};
    color: ${props.theme.colorTextPrimary};
    border: 1px solid ${props.theme.colorBorder};
    &:hover {
      background: ${props.theme.colorBgTertiary};
    }
  `}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export interface LocationFormData {
  id: string;
  name: string;
  address: string;
  coordinates: { lat: number; lng: number };
}

interface LocationFormProps {
  initialData?: Omit<Location, 'courts'>;
  onSubmit: (data: LocationFormData) => void;
  onCancel: () => void;
  isEdit?: boolean;
}

export const LocationForm: React.FC<LocationFormProps> = ({ initialData, onSubmit, onCancel, isEdit = false }) => {
  const [formData, setFormData] = useState<LocationFormData>({
    id: initialData?.id || '',
    name: initialData?.name || '',
    address: initialData?.address || '',
    coordinates: initialData?.coordinates || { lat: 0, lng: 0 },
  });

  const [errors, setErrors] = useState<Partial<Record<keyof LocationFormData, string>>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof LocationFormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Location name is required';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (formData.coordinates.lat === 0 && formData.coordinates.lng === 0) {
      newErrors.coordinates = 'Valid coordinates are required';
    }

    if (formData.coordinates.lat < -90 || formData.coordinates.lat > 90) {
      newErrors.coordinates = 'Latitude must be between -90 and 90';
    }

    if (formData.coordinates.lng < -180 || formData.coordinates.lng > 180) {
      newErrors.coordinates = 'Longitude must be between -180 and 180';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Generate ID if not editing
      const submitData = {
        ...formData,
        id: isEdit ? formData.id : `location-${Date.now()}`,
      };
      onSubmit(submitData);
    }
  };

  const handleInputChange = (field: keyof LocationFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleCoordinateChange = (coord: 'lat' | 'lng', value: string) => {
    const numValue = parseFloat(value) || 0;
    setFormData((prev) => ({
      ...prev,
      coordinates: { ...prev.coordinates, [coord]: numValue },
    }));
    // Clear coordinate errors
    if (errors.coordinates) {
      setErrors((prev) => ({ ...prev, coordinates: undefined }));
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <h3>{isEdit ? 'Edit Location' : 'Add New Location'}</h3>

      <FormField>
        <Label htmlFor="name">Location Name *</Label>
        <Input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          className={errors.name ? 'error' : ''}
          placeholder="Enter location name"
        />
        {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
      </FormField>

      <FormField>
        <Label htmlFor="address">Address *</Label>
        <Input
          id="address"
          type="text"
          value={formData.address}
          onChange={(e) => handleInputChange('address', e.target.value)}
          className={errors.address ? 'error' : ''}
          placeholder="Enter full address"
        />
        {errors.address && <ErrorMessage>{errors.address}</ErrorMessage>}
      </FormField>

      <FormField>
        <Label>Coordinates *</Label>
        <CoordinatesGroup>
          <div>
            <Label htmlFor="lat">Latitude</Label>
            <Input
              id="lat"
              type="number"
              step="0.000001"
              min="-90"
              max="90"
              value={formData.coordinates.lat}
              onChange={(e) => handleCoordinateChange('lat', e.target.value)}
              className={errors.coordinates ? 'error' : ''}
              placeholder="59.437"
            />
          </div>
          <div>
            <Label htmlFor="lng">Longitude</Label>
            <Input
              id="lng"
              type="number"
              step="0.000001"
              min="-180"
              max="180"
              value={formData.coordinates.lng}
              onChange={(e) => handleCoordinateChange('lng', e.target.value)}
              className={errors.coordinates ? 'error' : ''}
              placeholder="24.7536"
            />
          </div>
        </CoordinatesGroup>
        {errors.coordinates && <ErrorMessage>{errors.coordinates}</ErrorMessage>}
      </FormField>

      <ButtonGroup>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          {isEdit ? 'Update Location' : 'Add Location'}
        </Button>
      </ButtonGroup>
    </FormContainer>
  );
};
