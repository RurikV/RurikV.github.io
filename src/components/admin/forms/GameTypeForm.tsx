import React, { useState } from 'react';
import { styled } from 'styled-components';
import { GameType } from '../../../store/slices/gameTypesSlice';

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

const PlayerCountGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`;

const EquipmentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const EquipmentItem = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const RemoveButton = styled.button`
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 12px;
  cursor: pointer;

  &:hover {
    background: #c0392b;
  }
`;

const AddButton = styled.button`
  background: ${(props) => props.theme.colorPrimary};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 12px;
  cursor: pointer;
  align-self: flex-start;

  &:hover {
    opacity: 0.9;
  }
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

export interface GameTypeFormData {
  id: string;
  name: string;
  description: string;
  minPlayers: number;
  maxPlayers: number;
  equipment: string[];
  rules?: string;
}

interface GameTypeFormProps {
  initialData?: GameType;
  onSubmit: (data: GameTypeFormData) => void;
  onCancel: () => void;
  isEdit?: boolean;
}

export const GameTypeForm: React.FC<GameTypeFormProps> = ({ initialData, onSubmit, onCancel, isEdit = false }) => {
  const [formData, setFormData] = useState<GameTypeFormData>({
    id: initialData?.id || '',
    name: initialData?.name || '',
    description: initialData?.description || '',
    minPlayers: initialData?.minPlayers || 2,
    maxPlayers: initialData?.maxPlayers || 4,
    equipment: initialData?.equipment || [],
    rules: initialData?.rules || '',
  });

  const [newEquipment, setNewEquipment] = useState('');
  const [errors, setErrors] = useState<Partial<Record<keyof GameTypeFormData, string>>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof GameTypeFormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Game type name is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (formData.minPlayers < 1) {
      newErrors.minPlayers = 'Minimum players must be at least 1';
    }

    if (formData.maxPlayers < formData.minPlayers) {
      newErrors.maxPlayers = 'Maximum players must be greater than or equal to minimum players';
    }

    if (formData.equipment.length === 0) {
      newErrors.equipment = 'At least one equipment item is required';
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
        id: isEdit ? formData.id : formData.name.toLowerCase().replace(/\s+/g, '-'),
      };
      onSubmit(submitData);
    }
  };

  const handleInputChange = (field: keyof GameTypeFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const addEquipment = () => {
    if (newEquipment.trim() && !formData.equipment.includes(newEquipment.trim())) {
      setFormData((prev) => ({
        ...prev,
        equipment: [...prev.equipment, newEquipment.trim()],
      }));
      setNewEquipment('');
      // Clear equipment error
      if (errors.equipment) {
        setErrors((prev) => ({ ...prev, equipment: undefined }));
      }
    }
  };

  const removeEquipment = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      equipment: prev.equipment.filter((_, i) => i !== index),
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addEquipment();
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <h3>{isEdit ? 'Edit Game Type' : 'Add New Game Type'}</h3>

      <FormField>
        <Label htmlFor="name">Game Type Name *</Label>
        <Input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          className={errors.name ? 'error' : ''}
          placeholder="Enter game type name"
        />
        {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
      </FormField>

      <FormField>
        <Label htmlFor="description">Description *</Label>
        <TextArea
          id="description"
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          className={errors.description ? 'error' : ''}
          placeholder="Enter game type description"
        />
        {errors.description && <ErrorMessage>{errors.description}</ErrorMessage>}
      </FormField>

      <FormField>
        <Label>Player Count *</Label>
        <PlayerCountGroup>
          <div>
            <Label htmlFor="minPlayers">Min Players</Label>
            <Input
              id="minPlayers"
              type="number"
              min="1"
              value={formData.minPlayers}
              onChange={(e) => handleInputChange('minPlayers', parseInt(e.target.value) || 1)}
              className={errors.minPlayers ? 'error' : ''}
            />
            {errors.minPlayers && <ErrorMessage>{errors.minPlayers}</ErrorMessage>}
          </div>
          <div>
            <Label htmlFor="maxPlayers">Max Players</Label>
            <Input
              id="maxPlayers"
              type="number"
              min="1"
              value={formData.maxPlayers}
              onChange={(e) => handleInputChange('maxPlayers', parseInt(e.target.value) || 1)}
              className={errors.maxPlayers ? 'error' : ''}
            />
            {errors.maxPlayers && <ErrorMessage>{errors.maxPlayers}</ErrorMessage>}
          </div>
        </PlayerCountGroup>
      </FormField>

      <FormField>
        <Label>Equipment *</Label>
        <EquipmentItem>
          <Input
            type="text"
            value={newEquipment}
            onChange={(e) => setNewEquipment(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add equipment item"
          />
          <AddButton type="button" onClick={addEquipment}>
            Add
          </AddButton>
        </EquipmentItem>
        <EquipmentList>
          {formData.equipment.map((item, index) => (
            <EquipmentItem key={index}>
              <Input type="text" value={item} readOnly />
              <RemoveButton type="button" onClick={() => removeEquipment(index)}>
                Remove
              </RemoveButton>
            </EquipmentItem>
          ))}
        </EquipmentList>
        {errors.equipment && <ErrorMessage>{errors.equipment}</ErrorMessage>}
      </FormField>

      <FormField>
        <Label htmlFor="rules">Rules (Optional)</Label>
        <TextArea
          id="rules"
          value={formData.rules}
          onChange={(e) => handleInputChange('rules', e.target.value)}
          placeholder="Enter game rules and additional information"
        />
      </FormField>

      <ButtonGroup>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          {isEdit ? 'Update Game Type' : 'Add Game Type'}
        </Button>
      </ButtonGroup>
    </FormContainer>
  );
};
