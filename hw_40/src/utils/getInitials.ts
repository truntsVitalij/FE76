export const getInitials = (name?: string, email?: string): string => {
  if (name) {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  }

  if (email) {
    return email.substring(0, 2).toUpperCase();
  }

  return '??';
};