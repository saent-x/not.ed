import { convexAuth } from '@convex-dev/auth/server';
import Github from '@auth/core/providers/github';
import Microsoft from '@auth/core/providers/microsoft-entra-id';
import Google from '@auth/core/providers/google';

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [
    Github,
    Microsoft({
      clientId: process.env.AUTH_MICROSOFT_ENTRA_ID_ID,
      clientSecret: process.env.AUTH_MICROSOFT_ENTRA_ID_SECRET,
      tenantId: '9a0811ea-62e6-45ed-a377-6874f19cc0b4',
      issuer: process.env.AUTH_MICROSOFT_ENTRA_ID_ISSUER,
    }),
    Google,
  ],
  callbacks: {
    
  }
});
