import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/hooks/useProfile';

export const useRoleRedirect = () => {
  const { user } = useAuth();
  const { profile } = useProfile();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && profile) {
      // Redirect based on user role
      switch (profile.role) {
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
  }, [user, profile, navigate]);

  return { user, profile };
};