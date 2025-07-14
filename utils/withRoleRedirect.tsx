// utils/withRoleRedirect.tsx
'use client';

import { useUser } from '../interfaces/UserContext';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function withRoleRedirect<P>(
  Component: React.ComponentType<P>,
  forbiddenRole: string,
  redirectTo: string
) {
  return function WrappedComponent(props: P) {
    const { user, loading } = useUser();
    const router = useRouter();

    useEffect(() => {
      if (!loading && user?.role === forbiddenRole) {
        router.replace(redirectTo);
      }
    }, [user, loading]);

    if (loading || user?.role === forbiddenRole) return null;

    return <Component {...props} />;
  };
}
