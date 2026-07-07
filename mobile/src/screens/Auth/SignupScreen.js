import React, { useState } from 'react';
import {
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../redux/slices/authSlice';
import { showErrorToast, showSuccessToast } from '../../utils/toastConfig';
import { validateEmail, validatePassword } from '../../utils/validation';
import { COLORS } from '../../utils/constants';

const SignupScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('customer');
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

  const handleSignup = async () => {
    if (!name || !email || !password || !confirmPassword) {
      showErrorToast('Please fill in all fields');
      return;
    }

    if (!validateEmail(email)) {
      showErrorToast('Please enter a valid email');
      return;
    }

    if (!validatePassword(password)) {
      showErrorToast('Password must be at least 8 characters');
      return;
    }

    if (password !== confirmPassword) {
      showErrorToast('Passwords do not match');
      return;
    }

    try {
      await dispatch(
        registerUser({
          name,
          email,
          password,
          userType,
        })
      ).unwrap();
      showSuccessToast('Account created successfully!');
    } catch (err) {
      showErrorToast(err || 'Signup failed');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Join RytFoods today</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your full name"
          value={name}
          onChangeText={setName}
          editable={!isLoading}
        />

        <Text style={styles.label}>Email Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          editable={!isLoading}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          editable={!isLoading}
        />

        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirm your password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          editable={!isLoading}
        />

        <Text style={styles.label}>Account Type</Text>
        <View style={styles.typeContainer}>
          <TouchableOpacity
            style={[
              styles.typeButton,
              userType === 'customer' && styles.typeButtonActive,
            ]}
            onPress={() => setUserType('customer')}
          >
            <Text
              style={[
                styles.typeButtonText,
                userType === 'customer' && styles.typeButtonTextActive,
              ]}
            >
              Customer
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.typeButton,
              userType === 'vendor' && styles.typeButtonActive,
            ]}
            onPress={() => setUserType('vendor')}
          >
            <Text
              style={[
                styles.typeButtonText,
                userType === 'vendor' && styles.typeButtonTextActive,
              ]}
            >
              Vendor
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.signupButton, isLoading && styles.disabledButton]}
          onPress={handleSignup}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color={COLORS.white} />
          ) : (
            <Text style={styles.signupButtonText}>Create Account</Text>
          )}
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLink}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.darkCharcoal,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.gray,
  },
  form: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.darkCharcoal,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 15,
    fontSize: 14,
    color: COLORS.darkCharcoal,
  },
  typeContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  typeButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  typeButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  typeButtonText: {
    color: COLORS.gray,
    fontSize: 14,
    fontWeight: '600',
  },
  typeButtonTextActive: {
    color: COLORS.white,
  },
  signupButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 20,
  },
  disabledButton: {
    opacity: 0.6,
  },
  signupButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: COLORS.gray,
    fontSize: 14,
  },
  loginLink: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default SignupScreen;