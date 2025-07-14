'use client';

import { useUser } from '../interfaces/UserContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function withRoleProtection(Component: any, allowedRoles: string[]) {
  return function ProtectedComponent(props: any) {
    const { user, loading } = useUser();
    const router = useRouter();

    useEffect(() => {
      if (!loading) {
        if (!user) {
          router.replace('/login');
        } else if (!allowedRoles.includes(user.role)) {
          router.replace('/not-authorized');
        }
      }
    }, [user, loading]);

    if (loading || !user || !allowedRoles.includes(user.role)) return null;

    return <Component {...props} />;
  };
}
