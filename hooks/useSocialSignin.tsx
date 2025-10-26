import { useCallback, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { authClient } from '@/lib/auth-client';
import { toast } from 'sonner-native';

export type SocialProvider = 'google' | 'microsoft' | 'github';
export type SocialAuthStatus = 'idle' | 'launching' | 'dismissed' | 'success' | 'error';

interface UseSocialSigninResult {
  status: SocialAuthStatus;
  signingIn: boolean;
  signInWith: (provider: SocialProvider) => Promise<void>;
  reset: () => void;
}

export function useSocialSignin(): UseSocialSigninResult {
  const [status, setStatus] = useState<SocialAuthStatus>('idle');
  const [signingIn, setSigningIn] = useState(false);

  const reset = useCallback(() => {
    setStatus('idle');
    setSigningIn(false);
  }, []);

  const signInWith = useCallback(
    async (provider: SocialProvider) => {
      if (signingIn) return;
      setSigningIn(true);
      setStatus('launching');
      try {
        await authClient.signIn.social(
          {
            provider,
            callbackURL: 'mobile://',
          },
          {
            onError: (ctx) => {
              console.log(`auth-error -> ${ctx.error.message}`);
            },
            onSuccess: (ctx) => {
              console.log(`auth-success -> ${JSON.stringify(ctx.data)}`);
            },
          }
        );
      } catch (err) {
        console.log('Social sign-in error:', err);
        setStatus('error');

        toast.error('Operation failed!', {
          style: { backgroundColor: 'white' },
          description: err instanceof Error ? err.message : 'Social login failed',
          duration: 6000,
          icon: <Ionicons name="alert-circle" size={24} color="black" />,
        });

        setSigningIn(false);
      }
    },
    [signingIn]
  );

  return { status, signingIn, signInWith, reset };
}
