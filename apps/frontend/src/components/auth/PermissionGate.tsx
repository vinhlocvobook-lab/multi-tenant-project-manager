import React from 'react';
import { useAuth } from '../../contexts/auth-context';

interface PermissionGateProps {
  children: React.ReactNode;
  permission: string;
  fallback?: React.ReactNode;
}

/**
 * A wrapper component that only renders its children if the user has the required permission.
 * Otherwise, it renders a fallback (optional).
 */
export const PermissionGate: React.FC<PermissionGateProps> = ({ 
  children, 
  permission, 
  fallback = null 
}) => {
  const { hasPermission } = useAuth();

  if (hasPermission(permission)) {
    return <>{children}</>;
  }

  return <>{fallback}</>;
};
