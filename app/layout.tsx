import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import type { Metadata } from 'next';
import '../styles/global.css';
import { UserProvider } from '../interfaces/UserContext';

export const metadata: Metadata = {
  title: 'Bolsa de empleo inclusivo',
  description: 'Tu plataforma de empleo accesible',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <UserProvider>
        <NavBar />
          <main style={{ marginTop: '16px'}}>
            {children}
          </main>
         <Footer />
         </UserProvider>
      </body>
    </html>
  );
}