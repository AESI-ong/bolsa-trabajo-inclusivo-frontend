'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import api from '../utils/axiosInstance';
import type { User } from './User';
import type { Applicant } from './Applicant';

interface FullUser extends User {
  applicant_profile?: Applicant;
}

interface UserContextType {
  user: FullUser | null;
  loading: boolean;
  setUser: (user: FullUser | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<FullUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const userRes = await api.get<User>('/users/me/');
        const userData: FullUser = userRes.data;

        if (userData.role === 'applicant') {
          const applicantRes = await api.get<Applicant>('/applicants/me/');
          userData.applicant_profile = applicantRes.data;
        }

        setUser(userData);
      } catch (error) {
        console.error('Error al cargar el usuario:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser debe usarse dentro de <UserProvider>");
  return context;
};
