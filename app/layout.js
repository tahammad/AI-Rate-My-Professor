// app/layout.js
'use client';
import { ClerkProvider,SignInButton,SignedIn,SignedOut,UserButton } from '@clerk/nextjs';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider>{children}</ClerkProvider>
      </body>
    </html>
  );
}
