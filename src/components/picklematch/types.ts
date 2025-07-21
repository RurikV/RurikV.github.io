import { ReactNode } from 'react';

// General component interfaces
export interface ModalProps {
  visible: boolean;
  children: ReactNode;
  onClose?: () => void;
}

export interface LayoutProps {
  children: ReactNode;
}

export interface HeaderProps {
  className?: string;
}

export interface LogoProps {
  className?: string;
}

// Transaction/Operation interfaces
export interface TransactionData {
  amount: number;
  category: string;
  title: string;
  description: string;
  date?: string;
}

export interface BriefTransactionProps {
  transaction: TransactionData;
}

export interface FullTransactionProps {
  transaction: TransactionData;
  onEdit?: () => void;
}

// E-commerce interfaces
export interface ProductData {
  id: string;
  price: number;
  image: string;
  title: string;
  description: string;
  category?: string;
}

export interface AddToCartButtonProps {
  count: number;
  onIncrease?: () => void;
  onDecrease?: () => void;
  onAdd?: () => void;
}

export interface BriefProductProps {
  product: ProductData;
  cartCount?: number;
}

export interface FullProductProps {
  product: ProductData;
  cartCount?: number;
}

export interface CartItemProps {
  product: ProductData;
  count: number;
  onRemove?: () => void;
}

// Form interfaces
export interface ProfileFormData {
  name: string;
  about: string;
  isAdmin: boolean;
}

export interface ProfileFormProps {
  initialValues?: ProfileFormData;
  onSubmit: (values: ProfileFormData) => void;
  className?: string;
}

export interface ProductFormData {
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

export interface ProductFormErrors {
  title?: string;
  description?: string;
  price?: string;
  category?: string;
  image?: string;
}

export interface ProductFormProps {
  initialValues?: ProductFormData;
  onSubmit: (values: ProductFormData) => void;
  className?: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
}

export interface LoginFormProps {
  onSubmit: (values: LoginFormData) => void;
  className?: string;
}

export interface RegisterFormProps {
  onSubmit: (values: RegisterFormData) => void;
  className?: string;
}
