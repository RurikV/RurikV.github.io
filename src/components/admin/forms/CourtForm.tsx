import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import { Court } from '../../../store/slices/locationsSlice';
import { useAppSelector } from '../../../store/hooks';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 500px;
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

const TextArea = styled.textarea`
  padding: 10px 12px;
  border: 2px solid ${(props) => props.theme.colorBorder};
  border-radius: 6px;
  font-size: 14px;
  background: ${(props) => props.theme.colorBgPrimary};
  color: ${(props) => props.theme.colorTextPrimary};
  min-height: 80px;
  resize: vertical;
  font-family: inherit;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colorPrimary};
  }

  &.error {
    border-color: #e74c3c;
  }
`;

const Select = styled.select`
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
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 8px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  cursor: pointer;
`;

const Checkbox = styled.input`
  cursor: pointer;
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

export interface CourtFormData {
  id: string;
  name: string;
  locationId: string;
  games: string[];
  pricePerHour: number;
  rating: number;
  description: string;
  amenities: string[];
  coordinates: { lat: number; lng: number };
  image: string;
  availability: string[];
}

interface CourtFormProps {
  initialData?: Court;
  onSubmit: (data: CourtFormData) => void;
  onCancel: () => void;
  isEdit?: boolean;
}

const defaultAmenities = [
  'Lighting',
  'Seating',
  'Equipment rental',
  'Changing rooms',
  'Parking',
  'Refreshments',
  'Professional net',
  'Court lines',
  'Storage',
  'Adjustable net',
  'Professional flooring',
  'Scoreboard',
  'Sound system',
  'Clay surface',
  'Scenic views',
  'Ocean view',
  'Natural lighting',
];

const timeSlots = [
  '07:00',
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00',
];

export const CourtForm: React.FC<CourtFormProps> = ({ initialData, onSubmit, onCancel, isEdit = false }) => {
  const { locations } = useAppSelector((state) => state.locations);
  const { gameTypes } = useAppSelector((state) => state.gameTypes);

  const [formData, setFormData] = useState<CourtFormData>({
    id: initialData?.id || '',
    name: initialData?.name || '',
    locationId: initialData?.location || '',
    games: initialData?.games || [],
    pricePerHour: initialData?.pricePerHour || 20,
    rating: initialData?.rating || 4.0,
    description: initialData?.description || '',
    amenities: initialData?.amenities || [],
    coordinates: initialData?.coordinates || { lat: 0, lng: 0 },
    image: initialData?.image || '',
    availability: initialData?.availability || [],
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CourtFormData, string>>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof CourtFormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Court name is required';
    }

    if (!formData.locationId) {
      newErrors.locationId = 'Location is required';
    }

    if (formData.games.length === 0) {
      newErrors.games = 'At least one game type must be selected';
    }

    if (formData.pricePerHour <= 0) {
      newErrors.pricePerHour = 'Price must be greater than 0';
    }

    if (formData.rating < 0 || formData.rating > 5) {
      newErrors.rating = 'Rating must be between 0 and 5';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.image.trim()) {
      newErrors.image = 'Image URL is required';
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
        id: isEdit ? formData.id : `court-${Date.now()}`,
      };
      onSubmit(submitData);
    }
  };

  const handleInputChange = (field: keyof CourtFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleArrayToggle = (field: 'games' | 'amenities' | 'availability', value: string) => {
    const currentArray = formData[field] as string[];
    const newArray = currentArray.includes(value)
      ? currentArray.filter((item) => item !== value)
      : [...currentArray, value];
    handleInputChange(field, newArray);
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <h3>{isEdit ? 'Edit Court' : 'Add New Court'}</h3>

      <FormField>
        <Label htmlFor="name">Court Name *</Label>
        <Input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          className={errors.name ? 'error' : ''}
          placeholder="Enter court name"
        />
        {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
      </FormField>

      <FormField>
        <Label htmlFor="location">Location *</Label>
        <Select
          id="location"
          value={formData.locationId}
          onChange={(e) => handleInputChange('locationId', e.target.value)}
        >
          <option value="">Select a location</option>
          {locations.map((location) => (
            <option key={location.id} value={location.id}>
              {location.name}
            </option>
          ))}
        </Select>
        {errors.locationId && <ErrorMessage>{errors.locationId}</ErrorMessage>}
      </FormField>

      <FormField>
        <Label>Game Types *</Label>
        <CheckboxGroup>
          {gameTypes.map((gameType) => (
            <CheckboxLabel key={gameType.id}>
              <Checkbox
                type="checkbox"
                checked={formData.games.includes(gameType.id)}
                onChange={() => handleArrayToggle('games', gameType.id)}
              />
              {gameType.name}
            </CheckboxLabel>
          ))}
        </CheckboxGroup>
        {errors.games && <ErrorMessage>{errors.games}</ErrorMessage>}
      </FormField>

      <FormField>
        <Label htmlFor="price">Price per Hour (€) *</Label>
        <Input
          id="price"
          type="number"
          min="0"
          step="0.01"
          value={formData.pricePerHour}
          onChange={(e) => handleInputChange('pricePerHour', parseFloat(e.target.value) || 0)}
          className={errors.pricePerHour ? 'error' : ''}
        />
        {errors.pricePerHour && <ErrorMessage>{errors.pricePerHour}</ErrorMessage>}
      </FormField>

      <FormField>
        <Label htmlFor="rating">Rating (0-5) *</Label>
        <Input
          id="rating"
          type="number"
          min="0"
          max="5"
          step="0.1"
          value={formData.rating}
          onChange={(e) => handleInputChange('rating', parseFloat(e.target.value) || 0)}
          className={errors.rating ? 'error' : ''}
        />
        {errors.rating && <ErrorMessage>{errors.rating}</ErrorMessage>}
      </FormField>

      <FormField>
        <Label htmlFor="description">Description *</Label>
        <TextArea
          id="description"
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          className={errors.description ? 'error' : ''}
          placeholder="Enter court description"
        />
        {errors.description && <ErrorMessage>{errors.description}</ErrorMessage>}
      </FormField>

      <FormField>
        <Label htmlFor="image">Image URL *</Label>
        <Input
          id="image"
          type="url"
          value={formData.image}
          onChange={(e) => handleInputChange('image', e.target.value)}
          className={errors.image ? 'error' : ''}
          placeholder="https://example.com/court-image.jpg"
        />
        {errors.image && <ErrorMessage>{errors.image}</ErrorMessage>}
      </FormField>

      <FormField>
        <Label>Amenities</Label>
        <CheckboxGroup>
          {defaultAmenities.map((amenity) => (
            <CheckboxLabel key={amenity}>
              <Checkbox
                type="checkbox"
                checked={formData.amenities.includes(amenity)}
                onChange={() => handleArrayToggle('amenities', amenity)}
              />
              {amenity}
            </CheckboxLabel>
          ))}
        </CheckboxGroup>
      </FormField>

      <FormField>
        <Label>Available Time Slots</Label>
        <CheckboxGroup>
          {timeSlots.map((slot) => (
            <CheckboxLabel key={slot}>
              <Checkbox
                type="checkbox"
                checked={formData.availability.includes(slot)}
                onChange={() => handleArrayToggle('availability', slot)}
              />
              {slot}
            </CheckboxLabel>
          ))}
        </CheckboxGroup>
      </FormField>

      <ButtonGroup>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          {isEdit ? 'Update Court' : 'Add Court'}
        </Button>
      </ButtonGroup>
    </FormContainer>
  );
};
