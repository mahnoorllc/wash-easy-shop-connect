import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useUserRole } from '@/hooks/useUserRole';

export const useRoleRedirect = () => {
  const { user } = useAuth();
  const { role } = useUserRole();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && role) {
      // Redirect based on user role from user_roles table
      switch (role) {
        case 'admin':
          navigate('/admin-dashboard');
          break;
        case 'merchant':
          navigate('/merchant-dashboard');
          break;
        case 'customer':
        default:
          navigate('/customer-dashboard');
          break;
      }
    }
  }, [user, role, navigate]);

  return { user, role };
};
