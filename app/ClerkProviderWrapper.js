'use client';

import { ClerkProvider } from '@clerk/nextjs';

export default function ClerkProviderWrapper({ children }) {
  return <ClerkProvider>{children}</ClerkProvider>;
}