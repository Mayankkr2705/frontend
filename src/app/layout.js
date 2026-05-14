import { Anton, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Toast from '../components/Toast';

const anton = Anton({ 
  weight: '400',
  subsets: ["latin"],
  variable: '--font-anton',
});

const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: '--font-geist-mono',
});

export const metadata = {
  title: "Todo App",
  description: "AdminFlow Neo-Brutalist Todo App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`dark ${anton.variable} ${geistMono.variable}`}>
      <body className="bg-background text-foreground font-mono min-h-screen antialiased selection:bg-primary/30 selection:text-white">
        <AuthProvider>
          <div className="relative min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow pt-16">
              {children}
            </main>
            <Toast />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}