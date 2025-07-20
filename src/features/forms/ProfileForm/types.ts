export interface ProfileFormValues {
  name: string;
  about: string;
}

export interface ProfileFormErrors {
  name?: string;
  about?: string;
}

export interface ProfileFormProps {
  className?: string;
  disabled?: boolean;
  initialValues?: Partial<ProfileFormValues>;
  onSubmit?: (values: ProfileFormValues) => void;
}
