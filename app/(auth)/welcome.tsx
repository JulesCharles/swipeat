import LoginBottomSheet from '@/components/LoginBottomSheet';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const DISHES = [
  require('@/assets/images/salade3D.png'),
  require('@/assets/images/salade3D.png'),
  require('@/assets/images/salade3D.png'),
  require('@/assets/images/salade3D.png'),
];

const AUTO_SLIDE_INTERVAL = 7000; // 7 seconds

export default function WelcomeScreen() {
  const [showLoginSheet, setShowLoginSheet] = useState(false);
  const [currentDishIndex, setCurrentDishIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDishIndex((prev) => (prev + 1) % DISHES.length);
    }, AUTO_SLIDE_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  const handleStartNow = () => {
    router.push('/(auth)/onboarding');
  };

  const handleNextDish = () => {
    setCurrentDishIndex((prev) => (prev + 1) % DISHES.length);
  };

  const handlePreviousDish = () => {
    setCurrentDishIndex((prev) => (prev - 1 + DISHES.length) % DISHES.length);
  };

  return (
    <View style={styles.container}>
      {/* Content */}
      <View style={styles.content}>
        {/* Hero Image */}
        <View style={styles.imageContainer}>
          {/* Left Arrow */}
          <TouchableOpacity onPress={handlePreviousDish} style={styles.arrowButton}>
            <Image
              source={require('@/assets/images/fleche3D.png')}
              style={styles.arrowLeft}
              contentFit="contain"
            />
          </TouchableOpacity>

          {/* Dish Carousel */}
          <View style={styles.dishContainer}>
            <Animated.View
              key={currentDishIndex}
              entering={FadeIn.duration(500)}
              exiting={FadeOut.duration(300)}
              style={styles.dishWrapper}
            >
              <Image
                source={DISHES[currentDishIndex]}
                style={styles.heroImage}
                contentFit="contain"
              />
            </Animated.View>
          </View>

          {/* Right Arrow */}
          <TouchableOpacity onPress={handleNextDish} style={styles.arrowButton}>
            <Image
              source={require('@/assets/images/fleche3D.png')}
              style={styles.arrowRight}
              contentFit="contain"
            />
          </TouchableOpacity>
        </View>

        {/* Title */}
        <Text style={styles.title}>Discover meals together</Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          Swipe on dishes and match with your circle
        </Text>

        {/* Spacer */}
        <View style={styles.spacer} />

        {/* Start Button */}
        <TouchableOpacity style={styles.startButton} onPress={handleStartNow}>
          <Text style={styles.startButtonText}>Start Swiping 🍽️</Text>
        </TouchableOpacity>

        {/* Login Link */}
        <TouchableOpacity
          style={styles.loginLink}
          onPress={() => setShowLoginSheet(true)}
        >
          <Text style={styles.loginLinkText}>
            Already have an account?{' '}
            <Text style={styles.loginLinkBold}>Log In</Text>
          </Text>
        </TouchableOpacity>
      </View>

      {/* Login Bottom Sheet */}
      <LoginBottomSheet
        visible={showLoginSheet}
        onClose={() => setShowLoginSheet(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 120,
    paddingBottom: 48,
  },
  imageContainer: {
    width: width,
    height: width * 0.75,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: -24,
    marginBottom: 12,
  },
  dishContainer: {
    width: width * 0.5,
    height: width * 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dishWrapper: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroImage: {
    width: width * 0.5,
    height: width * 0.5,
  },
  arrowButton: {
    padding: 10,
  },
  arrowLeft: {
    width: width * 0.2,
    height: width * 0.2,
    transform: [{ scaleX: -1 }],
  },
  arrowRight: {
    width: width * 0.2,
    height: width * 0.2,
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 17,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 8,
  },
  spacer: {
    flex: 1,
  },
  startButton: {
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    paddingVertical: 18,
    paddingHorizontal: 32,
    alignItems: 'center',
    marginTop: 32,
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2E7D32',
  },
  loginLink: {
    marginTop: 16,
    alignItems: 'center',
    paddingVertical: 8,
  },
  loginLinkText: {
    fontSize: 14,
    color: '#666',
  },
  loginLinkBold: {
    color: '#2E7D32',
    fontWeight: '600',
  },
});

