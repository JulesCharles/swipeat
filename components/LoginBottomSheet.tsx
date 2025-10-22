import React, { useEffect } from 'react';
import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const { height } = Dimensions.get('window');
const SHEET_HEIGHT = height * 0.5;

interface LoginBottomSheetProps {
  visible: boolean;
  onClose: () => void;
}

export default function LoginBottomSheet({ visible, onClose }: LoginBottomSheetProps) {
  const translateY = useSharedValue(SHEET_HEIGHT);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      opacity.value = withTiming(1, { duration: 200 });
      translateY.value = withSpring(0, {
        damping: 30,
        stiffness: 300,
      });
    } else {
      opacity.value = withTiming(0, { duration: 200 });
      translateY.value = withTiming(SHEET_HEIGHT, { duration: 250 });
    }
  }, [visible]);

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const handleAppleLogin = () => {
    // Placeholder for Apple login
    console.log('Apple login pressed');
  };

  const handleGoogleLogin = () => {
    // Placeholder for Google login
    console.log('Google login pressed');
  };

  const handleEmailLogin = () => {
    // Placeholder for Email login
    console.log('Email login pressed');
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={styles.modalContainer}>
        <TouchableWithoutFeedback onPress={onClose}>
          <Animated.View style={[styles.backdrop, backdropStyle]} />
        </TouchableWithoutFeedback>

        <Animated.View style={[styles.sheet, sheetStyle]}>
          {/* Handle Bar */}
          <View style={styles.handleBar} />

          {/* Content */}
          <View style={styles.content}>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Sign in to your account to continue</Text>

            {/* Continue with Apple */}
            <TouchableOpacity
              style={[styles.button, styles.appleButton]}
              onPress={handleAppleLogin}
            >
              <Text style={styles.appleIcon}>🍎</Text>
              <Text style={styles.appleButtonText}>Continue with Apple</Text>
            </TouchableOpacity>

            {/* Continue with Google */}
            <TouchableOpacity
              style={[styles.button, styles.googleButton]}
              onPress={handleGoogleLogin}
            >
              <Text style={styles.googleIcon}>G</Text>
              <Text style={styles.googleButtonText}>Continue with Google</Text>
            </TouchableOpacity>

            {/* Continue with Email */}
            <TouchableOpacity
              style={[styles.button, styles.emailButton]}
              onPress={handleEmailLogin}
            >
              <Text style={styles.emailIcon}>✉️</Text>
              <Text style={styles.emailButtonText}>Continue with Email</Text>
            </TouchableOpacity>

            {/* Terms and Privacy */}
            <Text style={styles.termsText}>
              By continuing, you agree to our{' '}
              <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
              <Text style={styles.termsLink}>Privacy Policy</Text>
            </Text>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  sheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    minHeight: SHEET_HEIGHT,
    paddingBottom: 40,
  },
  handleBar: {
    width: 40,
    height: 4,
    backgroundColor: '#ddd',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 24,
  },
  content: {
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginBottom: 12,
  },
  appleButton: {
    backgroundColor: '#000',
  },
  appleIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  appleButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  googleIcon: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4285F4',
    marginRight: 12,
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  emailButton: {
    backgroundColor: '#f5f5f5',
  },
  emailIcon: {
    fontSize: 18,
    marginRight: 12,
  },
  emailButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  termsText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginTop: 24,
    lineHeight: 18,
  },
  termsLink: {
    color: '#2E7D32',
    textDecorationLine: 'underline',
  },
});


