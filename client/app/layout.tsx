import './globals.css';

import Nav from './nav';
import { Suspense } from 'react';
import { getServerSession } from 'next-auth';
import { Analytics } from '@vercel/analytics/react';
import { authOptions } from '../pages/api/auth/[...nextauth]';
import { redirect } from 'next/navigation';
import AuthProvider from './login/AuthProvider';

export const metadata = {
  title: 'Ellipsis Annotation Interface',
  description:
    'A user admin dashboard configured with Next.js, PlanetScale, NextAuth, Tailwind CSS, TypeScript, ESLint, and Prettier.'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {

  const session = await getServerSession(authOptions)

  return (
    <html lang="en" className="h-[calc(100vh-1600px)] bg-gray-50">
      <body className="h-[calc(100vh-1600px)]" suppressHydrationWarning={true}>
        <Suspense>
          <Nav />
        </Suspense>
        <AuthProvider>
          {children}
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
