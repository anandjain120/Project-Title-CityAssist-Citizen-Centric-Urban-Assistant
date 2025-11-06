import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import './OnboardingPage.css';

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    medicalFlags: [] as string[],
    commutePatterns: [] as string[],
    notifications: true,
  });
  const { setUser, setToken } = useAuthStore();
  const navigate = useNavigate();

  const medicalConditions = [
    'Asthma',
    'Heart Disease',
    'Respiratory Issues',
    'Elderly (65+)',
    'None',
  ];

  const commuteOptions = [
    'Daily Commuter',
    'Public Transit User',
    'Cyclist',
    'Pedestrian',
    'Occasional Traveler',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock registration - replace with actual API call
    try {
      // TODO: Replace with actual API call
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setToken(data.token);
        navigate('/');
      } else {
        // Mock success for development
        setUser({
          id: '1',
          email: formData.email,
          name: formData.name,
          age: formData.age ? parseInt(formData.age) : undefined,
          medicalFlags: formData.medicalFlags,
          commutePatterns: formData.commutePatterns,
        });
        setToken('mock-token');
        navigate('/');
      }
    } catch (error) {
      // Mock success for development
      setUser({
        id: '1',
        email: formData.email,
        name: formData.name,
        age: formData.age ? parseInt(formData.age) : undefined,
        medicalFlags: formData.medicalFlags,
        commutePatterns: formData.commutePatterns,
      });
      setToken('mock-token');
      navigate('/');
    }
  };

  const toggleMedicalFlag = (flag: string) => {
    setFormData((prev) => ({
      ...prev,
      medicalFlags: prev.medicalFlags.includes(flag)
        ? prev.medicalFlags.filter((f) => f !== flag)
        : [...prev.medicalFlags, flag],
    }));
  };

  const toggleCommutePattern = (pattern: string) => {
    setFormData((prev) => ({
      ...prev,
      commutePatterns: prev.commutePatterns.includes(pattern)
        ? prev.commutePatterns.filter((p) => p !== pattern)
        : [...prev.commutePatterns, pattern],
    }));
  };

  return (
    <div className="onboarding-page">
      <div className="onboarding-container">
        <h1 className="onboarding-title">Welcome to CityAssist</h1>
        <p className="onboarding-subtitle">
          Let's set up your profile to get personalized alerts and recommendations
        </p>

        <form onSubmit={handleSubmit} className="onboarding-form">
          {step === 1 && (
            <div className="onboarding-step">
              <h2>Basic Information</h2>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-input"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-input"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                  minLength={8}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Age (optional)</label>
                <input
                  type="number"
                  className="form-input"
                  value={formData.age}
                  onChange={(e) =>
                    setFormData({ ...formData, age: e.target.value })
                  }
                  min="1"
                  max="120"
                />
              </div>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="btn btn-primary"
              >
                Next
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="onboarding-step">
              <h2>Health & Commute Profile</h2>
              <div className="form-group">
                <label className="form-label">Medical Conditions (optional)</label>
                <div className="checkbox-group">
                  {medicalConditions.map((condition) => (
                    <label key={condition} className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={formData.medicalFlags.includes(condition)}
                        onChange={() => toggleMedicalFlag(condition)}
                      />
                      <span>{condition}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Commute Patterns</label>
                <div className="checkbox-group">
                  {commuteOptions.map((pattern) => (
                    <label key={pattern} className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={formData.commutePatterns.includes(pattern)}
                        onChange={() => toggleCommutePattern(pattern)}
                      />
                      <span>{pattern}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.notifications}
                    onChange={(e) =>
                      setFormData({ ...formData, notifications: e.target.checked })
                    }
                  />
                  <span>Enable push notifications for alerts and updates</span>
                </label>
              </div>
              <div className="button-group">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="btn btn-secondary"
                >
                  Back
                </button>
                <button type="submit" className="btn btn-primary">
                  Complete Setup
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

