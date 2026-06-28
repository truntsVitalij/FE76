export interface RegisterProps {
  onRegister: (email: string, password: string) => void;
}
export interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
}