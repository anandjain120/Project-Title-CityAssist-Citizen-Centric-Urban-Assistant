import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import './ProfilePage.css';

export default function ProfilePage() {
  const { user, setUser } = useAuthStore();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    age: user?.age?.toString() || '',
    medicalFlags: user?.medicalFlags || [],
    commutePatterns: user?.commutePatterns || [],
  });

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

  const handleSave = async () => {
    // TODO: Replace with actual API call
    setUser({
      ...user!,
      name: formData.name,
      age: formData.age ? parseInt(formData.age) : undefined,
      medicalFlags: formData.medicalFlags,
      commutePatterns: formData.commutePatterns,
    });
    setEditing(false);
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
    <div className="profile-page">
      <div className="profile-header">
        <h1>Profile</h1>
        {!editing && (
          <button onClick={() => setEditing(true)} className="btn btn-primary">
            Edit Profile
          </button>
        )}
      </div>

      <div className="profile-card">
        <div className="profile-section">
          <h2>Basic Information</h2>
          <div className="form-group">
            <label className="form-label">Name</label>
            {editing ? (
              <input
                type="text"
                className="form-input"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            ) : (
              <p className="profile-value">{user?.name}</p>
            )}
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <p className="profile-value">{user?.email}</p>
          </div>
          <div className="form-group">
            <label className="form-label">Age</label>
            {editing ? (
              <input
                type="number"
                className="form-input"
                value={formData.age}
                onChange={(e) =>
                  setFormData({ ...formData, age: e.target.value })
                }
              />
            ) : (
              <p className="profile-value">{user?.age || 'Not specified'}</p>
            )}
          </div>
        </div>

        <div className="profile-section">
          <h2>Health Profile</h2>
          {editing ? (
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
          ) : (
            <div className="profile-tags">
              {user?.medicalFlags && user.medicalFlags.length > 0 ? (
                user.medicalFlags.map((flag) => (
                  <span key={flag} className="tag">
                    {flag}
                  </span>
                ))
              ) : (
                <p className="profile-value">No medical conditions specified</p>
              )}
            </div>
          )}
        </div>

        <div className="profile-section">
          <h2>Commute Patterns</h2>
          {editing ? (
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
          ) : (
            <div className="profile-tags">
              {user?.commutePatterns && user.commutePatterns.length > 0 ? (
                user.commutePatterns.map((pattern) => (
                  <span key={pattern} className="tag">
                    {pattern}
                  </span>
                ))
              ) : (
                <p className="profile-value">No commute patterns specified</p>
              )}
            </div>
          )}
        </div>

        {editing && (
          <div className="profile-actions">
            <button onClick={() => setEditing(false)} className="btn btn-secondary">
              Cancel
            </button>
            <button onClick={handleSave} className="btn btn-primary">
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

