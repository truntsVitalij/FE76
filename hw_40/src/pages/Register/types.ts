export interface RegisterProps {
  onRegister: (name: string, email: string, password: string) => boolean;
}

export interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}