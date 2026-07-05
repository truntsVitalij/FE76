import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../../components/Button';
import type { RegisterProps, FormData, FormErrors } from './types';

const Container = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const BackLink = styled(Link)`
  display: inline-block;
  color: #6b7280;
  font-size: 0.875rem;
  margin-bottom: 1rem;
  text-decoration: none;

  &:hover {
    color: #1a237e;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: #1f2937;
`;

const Card = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const Input = styled.input<{ $hasError?: boolean }>`
  padding: 0.75rem 1rem;
  border: 1px solid ${props => props.$hasError ? '#ef4444' : '#e5e7eb'};
  border-radius: 8px;
  font-size: 0.95rem;
  color: #1f2937;
  outline: none;
  transition: border-color 0.2s;

  &::placeholder {
    color: #9ca3af;
  }

  &:focus {
    border-color: ${props => props.$hasError ? '#ef4444' : '#1a237e'};
  }
`;

const ErrorMessage = styled.span`
  font-size: 0.75rem;
  color: #ef4444;
  margin-top: 0.125rem;
`;

const SubmitButton = styled(Button)`
  margin-top: 0.5rem;
  width: 100%;
`;

const FooterText = styled.p`
  text-align: center;
  font-size: 0.875rem;
  color: #6b7280;
  margin-top: 1.5rem;
`;

const StyledLink = styled(Link)`
  color: #1a237e;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const Register: React.FC<RegisterProps> = ({ onRegister }) => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const success = onRegister(formData.email, formData.password);
    
    if (success) {
      navigate('/success', { state: { email: formData.email } });
    }
  };

  return (
    <Container>
      <BackLink to="/">← Back to home</BackLink>
      <Title>Sign Up</Title>
      <Card>
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              $hasError={!!errors.email}
            />
            {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
          </InputGroup>

          <InputGroup>
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              $hasError={!!errors.password}
            />
            {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
          </InputGroup>

          <InputGroup>
            <Input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              $hasError={!!errors.confirmPassword}
            />
            {errors.confirmPassword && (
              <ErrorMessage>{errors.confirmPassword}</ErrorMessage>
            )}
          </InputGroup>

          <SubmitButton type="submit">
            Sign Up
          </SubmitButton>
        </Form>

        <FooterText>
          Already have an account?{' '}
          <StyledLink to="/login">Sign In</StyledLink>
        </FooterText>
      </Card>
    </Container>
  );
};