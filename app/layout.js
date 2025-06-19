import Navbar from '../app/components/Navbar';
import { AuthProvider } from '../context/auth-context';
import './globals.css';

export const metadata = {
  title: 'KampusHub',
  description: 'Kampüs içi iletişim platformu',
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body className="bg-gray-50 text-gray-900">
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
