import { AuthProvider } from '@/components/contexts/AuthProvider';
import { Toaster } from '@/components/ui/sonner';
import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import metadataConfig from '@/config/metadata';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = metadataConfig;
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} antialiased flex flex-col items-center bg-zinc-300`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
