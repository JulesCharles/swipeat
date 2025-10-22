import { supabase } from './supabase';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';

// Required for OAuth to work properly
WebBrowser.maybeCompleteAuthSession();

/**
 * Email Authentication
 */

export const signUpWithEmail = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw error;
  return data;
};

export const signInWithEmail = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const resetPassword = async (email: string) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: Linking.createURL('/auth/reset-password'),
  });

  if (error) throw error;
  return data;
};

/**
 * OAuth Authentication (Google & Apple)
 */

export const signInWithGoogle = async () => {
  const redirectUrl = Linking.createURL('/auth/callback');

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: redirectUrl,
      skipBrowserRedirect: true,
    },
  });

  if (error) throw error;
  if (!data?.url) throw new Error('No auth URL returned');

  // Open the OAuth URL in the browser
  const result = await WebBrowser.openAuthSessionAsync(
    data.url,
    redirectUrl
  );

  if (result.type === 'success') {
    const url = result.url;
    // Extract tokens from the URL and set the session
    const params = new URL(url).searchParams;
    const accessToken = params.get('access_token');
    const refreshToken = params.get('refresh_token');

    if (accessToken && refreshToken) {
      await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      });
    }
  }

  return result;
};

export const signInWithApple = async () => {
  const redirectUrl = Linking.createURL('/auth/callback');

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'apple',
    options: {
      redirectTo: redirectUrl,
      skipBrowserRedirect: true,
    },
  });

  if (error) throw error;
  if (!data?.url) throw new Error('No auth URL returned');

  // Open the OAuth URL in the browser
  const result = await WebBrowser.openAuthSessionAsync(
    data.url,
    redirectUrl
  );

  if (result.type === 'success') {
    const url = result.url;
    // Extract tokens from the URL and set the session
    const params = new URL(url).searchParams;
    const accessToken = params.get('access_token');
    const refreshToken = params.get('refresh_token');

    if (accessToken && refreshToken) {
      await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      });
    }
  }

  return result;
};

/**
 * Session Management
 */

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) throw error;
  return user;
};

export const getCurrentSession = async () => {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error) throw error;
  return session;
};
