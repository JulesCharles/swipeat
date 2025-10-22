import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  SlideInRight
} from 'react-native-reanimated';

// Step 1: What brings you here?
const purposeOptions = [
  { id: 'partner', icon: '👩‍❤️‍👨', title: 'Cooking with my partner' },
  { id: 'roommates', icon: '🏡', title: 'Choosing meals with my roommates' },
  { id: 'family', icon: '👨‍👩‍👧‍👦', title: 'Planning family dinners' },
  { id: 'personal', icon: '👤', title: 'Saving dishes I want to try' },
];

// Step 2: What type of food do you enjoy?
const foodTypes = [
  { id: 'italian', icon: '🍕', title: 'Italian' },
  { id: 'japanese', icon: '🍣', title: 'Japanese' },
  { id: 'mexican', icon: '🌮', title: 'Mexican' },
  { id: 'healthy', icon: '🥗', title: 'Healthy' },
  { id: 'comfort', icon: '🍔', title: 'Comfort Food' },
  { id: 'desserts', icon: '🧁', title: 'Desserts' },
  { id: 'surprise', icon: '🤷‍♂️', title: 'Surprise Me!' },
];

// Step 3: Any food restrictions?
const restrictions = [
  { id: 'vegetarian', icon: '🌱', title: 'Vegetarian' },
  { id: 'vegan', icon: '🥦', title: 'Vegan' },
  { id: 'lactose', icon: '🥛', title: 'Lactose-free' },
  { id: 'gluten', icon: '🌾', title: 'Gluten-free' },
  { id: 'allergies', icon: '🐚', title: 'Allergies (nuts, seafood…)' },
  { id: 'none', icon: '🚫', title: 'No restrictions' },
];

// Step 4: How often do you want to cook together?
const frequencyOptions = [
  { id: 'daily', icon: '📆', title: 'Every day' },
  { id: 'weekly', icon: '📆', title: '2–3 times a week' },
  { id: 'weekends', icon: '📆', title: 'Weekends only' },
  { id: 'random', icon: '💫', title: 'Randomly / No plan' },
];

export default function OnboardingScreen() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPurpose, setSelectedPurpose] = useState<string | null>(null);
  const [selectedFoodTypes, setSelectedFoodTypes] = useState<string[]>([]);
  const [selectedRestrictions, setSelectedRestrictions] = useState<string[]>([]);
  const [selectedFrequency, setSelectedFrequency] = useState<string | null>(null);

  const handleContinue = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      // Final step - navigate to auth page
      router.push('/(auth)/auth');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      router.back();
    }
  };

  const handleFoodTypeToggle = (id: string) => {
    setSelectedFoodTypes(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const handleRestrictionToggle = (id: string) => {
    setSelectedRestrictions(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const canContinue = () => {
    switch (currentStep) {
      case 1: return selectedPurpose !== null;
      case 2: return selectedFoodTypes.length > 0;
      case 3: return true; // Restrictions are optional
      case 4: return selectedFrequency !== null;
      case 5: return true;
      default: return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Animated.View key="step1" entering={FadeIn.duration(500)} exiting={FadeOut.duration(300)} style={{ flex: 1 }}>
            <Text style={styles.title}>What brings you here?</Text>
            <Text style={styles.subtitle}>What do you want to use SwipEat for?</Text>

            <View style={styles.optionsList}>
              {purposeOptions.map((option, index) => (
                <Animated.View
                  key={option.id}
                  entering={SlideInRight.delay(index * 100).duration(400)}
                >
                  <TouchableOpacity
                    style={[
                      styles.optionCard,
                      selectedPurpose === option.id && styles.optionCardSelected,
                    ]}
                    onPress={() => setSelectedPurpose(option.id)}
                  >
                    <Text style={styles.optionIcon}>{option.icon}</Text>
                    <Text style={styles.optionTitle}>{option.title}</Text>
                    <View
                      style={[
                        styles.radio,
                        selectedPurpose === option.id && styles.radioSelected,
                      ]}
                    >
                      {selectedPurpose === option.id && <View style={styles.radioDot} />}
                    </View>
                  </TouchableOpacity>
                </Animated.View>
              ))}
            </View>
          </Animated.View>
        );

      case 2:
        return (
          <Animated.View key="step2" entering={FadeIn.duration(500)} exiting={FadeOut.duration(300)} style={{ flex: 1 }}>
            <Text style={styles.title}>What type of food do you enjoy?</Text>
            <Text style={styles.subtitle}>What kind of dishes do you like?</Text>

            <View style={styles.optionsList}>
              {foodTypes.map((option, index) => (
                <Animated.View
                  key={option.id}
                  entering={SlideInRight.delay(index * 100).duration(400)}
                >
                  <TouchableOpacity
                    style={[
                      styles.optionCard,
                      selectedFoodTypes.includes(option.id) && styles.optionCardSelected,
                    ]}
                    onPress={() => handleFoodTypeToggle(option.id)}
                  >
                    <Text style={styles.optionIcon}>{option.icon}</Text>
                    <Text style={styles.optionTitle}>{option.title}</Text>
                    <View
                      style={[
                        styles.checkbox,
                        selectedFoodTypes.includes(option.id) && styles.checkboxSelected,
                      ]}
                    >
                      {selectedFoodTypes.includes(option.id) && <Text style={styles.checkmark}>✓</Text>}
                    </View>
                  </TouchableOpacity>
                </Animated.View>
              ))}
            </View>
          </Animated.View>
        );

      case 3:
        return (
          <Animated.View key="step3" entering={FadeIn.duration(500)} exiting={FadeOut.duration(300)} style={{ flex: 1 }}>
            <Text style={styles.title}>Any food restrictions?</Text>
            <Text style={styles.subtitle}>Do you have any food restrictions or preferences?</Text>

            <View style={styles.optionsList}>
              {restrictions.map((option, index) => (
                <Animated.View
                  key={option.id}
                  entering={SlideInRight.delay(index * 100).duration(400)}
                >
                  <TouchableOpacity
                    style={[
                      styles.optionCard,
                      selectedRestrictions.includes(option.id) && styles.optionCardSelected,
                    ]}
                    onPress={() => handleRestrictionToggle(option.id)}
                  >
                    <Text style={styles.optionIcon}>{option.icon}</Text>
                    <Text style={styles.optionTitle}>{option.title}</Text>
                    <View
                      style={[
                        styles.checkbox,
                        selectedRestrictions.includes(option.id) && styles.checkboxSelected,
                      ]}
                    >
                      {selectedRestrictions.includes(option.id) && <Text style={styles.checkmark}>✓</Text>}
                    </View>
                  </TouchableOpacity>
                </Animated.View>
              ))}
            </View>
          </Animated.View>
        );

      case 4:
        return (
          <Animated.View key="step4" entering={FadeIn.duration(500)} exiting={FadeOut.duration(300)} style={{ flex: 1 }}>
            <Text style={styles.title}>How often do you want to cook together?</Text>
            <Text style={styles.subtitle}>How often do you want to match meals with your group?</Text>

            <View style={styles.optionsList}>
              {frequencyOptions.map((option, index) => (
                <Animated.View
                  key={option.id}
                  entering={SlideInRight.delay(index * 100).duration(400)}
                >
                  <TouchableOpacity
                    style={[
                      styles.optionCard,
                      selectedFrequency === option.id && styles.optionCardSelected,
                    ]}
                    onPress={() => setSelectedFrequency(option.id)}
                  >
                    <Text style={styles.optionIcon}>{option.icon}</Text>
                    <Text style={styles.optionTitle}>{option.title}</Text>
                    <View
                      style={[
                        styles.radio,
                        selectedFrequency === option.id && styles.radioSelected,
                      ]}
                    >
                      {selectedFrequency === option.id && <View style={styles.radioDot} />}
                    </View>
                  </TouchableOpacity>
                </Animated.View>
              ))}
            </View>
          </Animated.View>
        );

      case 5:
        return (
          <Animated.View key="step5" entering={FadeIn.duration(500)} exiting={FadeOut.duration(300)} style={{ flex: 1 }}>
            <View style={styles.finalStep}>
              <Text style={styles.finalEmoji}>🎉</Text>
              <Text style={styles.finalTitle}>You're all set!</Text>
              <Text style={styles.finalMessage}>
                You're ready to start swiping!{'\n'}
                We'll show you dishes that match your taste.{'\n'}
                Anything you like will be sent to your group.{'\n'}
                If they like it too — it's a match!
              </Text>
            </View>
          </Animated.View>
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${(currentStep / 5) * 100}%` }]} />
          </View>
        </View>

        {/* Step Content */}
        <View style={styles.stepContainer}>
          {renderStep()}
        </View>

        {/* Continue Button */}
        <Animated.View entering={FadeIn.delay(400).duration(500)}>
          <TouchableOpacity
            style={[styles.continueButton, !canContinue() && styles.continueButtonDisabled]}
            onPress={handleContinue}
            disabled={!canContinue()}
          >
            <Text
              style={[
                styles.continueButtonText,
                !canContinue() && styles.continueButtonTextDisabled,
              ]}
            >
              {currentStep === 5 ? 'Start Swiping 🍽️' : 'Next'}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </SafeAreaView>
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
    paddingTop: 16,
    paddingBottom: 32,
  },
  header: {
    marginBottom: 32,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 24,
    color: '#1a1a1a',
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: '#f0f0f0',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2E7D32',
    borderRadius: 2,
  },
  stepContainer: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
  },
  optionsList: {
    flex: 1,
    gap: 12,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  optionCardSelected: {
    backgroundColor: '#E8F5E9',
    borderColor: '#2E7D32',
  },
  optionIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  optionTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#1a1a1a',
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    borderColor: '#2E7D32',
  },
  radioDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#2E7D32',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    borderColor: '#2E7D32',
    backgroundColor: '#2E7D32',
  },
  checkmark: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  finalStep: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  finalEmoji: {
    fontSize: 80,
    marginBottom: 24,
  },
  finalTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 16,
    textAlign: 'center',
  },
  finalMessage: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    lineHeight: 28,
  },
  continueButton: {
    backgroundColor: '#2E7D32',
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 16,
  },
  continueButtonDisabled: {
    backgroundColor: '#e0e0e0',
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  continueButtonTextDisabled: {
    color: '#999',
  },
});


