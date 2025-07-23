// app/layout.tsx o src/app/layout.tsx

import '../styles/global.css';

import Footer from '../components/Footer';
import type { Metadata } from 'next';
import NavBar from '../components/NavBar';
import { UserProvider } from '../interfaces/UserContext';
import { m_plus_rounded_1c } from "./m-plus-rounded-1c-font";

export const metadata: Metadata = {
  title: 'Bolsa de empleo inclusivo',
  description: 'Tu plataforma de empleo accesible',
  icons: {
    icon: '/assets/icons/favicon.ico', // o .png si es otro formato
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={m_plus_rounded_1c.className}>
        <UserProvider>
          <NavBar />
          <main>{children}</main>
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}
