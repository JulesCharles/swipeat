import { signInWithEmail, signUpWithEmail } from '@/lib/auth';
import { Image } from 'expo-image';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

export default function AuthScreen() {
  const [isSignUp, setIsSignUp] = useState(true); // Start with Sign Up
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!name || !email || !confirmEmail || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (email !== confirmEmail) {
      Alert.alert('Error', 'Emails do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      await signUpWithEmail(email, password);
      Alert.alert('Success', 'Account created successfully!');
    } catch (error: any) {
      Alert.alert('Registration Error', error.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      await signInWithEmail(email, password);
    } catch (error: any) {
      Alert.alert('Login Error', error.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    // Reset only sign-up specific fields
    setName('');
    setConfirmEmail('');
    // Keep email and password intact
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Logo/Icon */}
        <View style={styles.logoContainer}>
          <Image
            source={require('@/assets/images/logoswipeat.png')}
            style={styles.logo}
            contentFit="contain"
          />
        </View>

        {/* Form */}
        <View style={styles.formContainer}>
          {/* Name field - only visible in Sign Up, but no animation */}
          {isSignUp && (
            <TextInput
              style={styles.input}
              placeholder="Name"
              placeholderTextColor="#999"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
              editable={!loading}
            />
          )}

          {/* Email field - always visible, fixed position, no animation */}
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            editable={!loading}
          />

          {/* Password and Confirm Password - animated together */}
          {isSignUp ? (
            <Animated.View
              entering={FadeIn.duration(400)}
              exiting={FadeOut.duration(300)}
            >
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                editable={!loading}
              />

              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                placeholderTextColor="#999"
                value={confirmEmail}
                onChangeText={setConfirmEmail}
                secureTextEntry
                editable={!loading}
              />
            </Animated.View>
          ) : (
            <Animated.View
              entering={FadeIn.duration(400)}
              exiting={FadeOut.duration(300)}
            >
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                editable={!loading}
              />
            </Animated.View>
          )}

          <TouchableOpacity
            style={styles.submitButton}
            onPress={isSignUp ? handleSignUp : handleSignIn}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.submitButtonText}>
                {isSignUp ? 'Create Account' : 'Sign In'}
              </Text>
            )}
          </TouchableOpacity>

          {/* Toggle Link */}
          <TouchableOpacity
            style={styles.toggleButton}
            onPress={toggleMode}
            disabled={loading}
          >
            <Text style={styles.toggleText}>
              {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
              <Text style={styles.toggleTextBold}>
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F8F0', // Light green background
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 160, // Fixed top padding
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 8, // Fixed margin to form
  },
  logo: {
    width: 440,
    height: 200,
  },
  formContainer: {
    width: '100%',
    minHeight: 400, // Reserve space for 4 inputs to prevent jumping
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    marginBottom: 16,
    color: '#1a1a1a',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  submitButton: {
    backgroundColor: '#2E7D32', // Dark green
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  toggleButton: {
    marginTop: 24,
    alignItems: 'center',
    paddingVertical: 8,
  },
  toggleText: {
    fontSize: 15,
    color: '#666',
  },
  toggleTextBold: {
    color: '#2E7D32',
    fontWeight: '600',
  },
});

