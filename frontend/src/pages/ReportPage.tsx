import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import './ReportPage.css';

interface ReportForm {
  category: string;
  description: string;
  location: {
    lat: number;
    lng: number;
  };
  image?: File;
}

export default function ReportPage() {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors }, watch } = useForm<ReportForm>();

  const categories = [
    'Pothole',
    'Streetlight Outage',
    'Garbage/Trash',
    'Tree Fall',
    'Water Leak',
    'Traffic Sign Issue',
    'Other',
  ];

  useEffect(() => {
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        }
      );
    }
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: ReportForm) => {
    setSubmitting(true);
    
    try {
      const formData = new FormData();
      formData.append('category', data.category);
      formData.append('description', data.description);
      formData.append('latitude', location?.lat.toString() || '');
      formData.append('longitude', location?.lng.toString() || '');
      if (data.image) {
        formData.append('image', data.image);
      }

      // TODO: Replace with actual API call
      const response = await fetch('/api/reports', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setTicketId(result.ticketId);
        setSubmitted(true);
      } else {
        // Mock success for development
        setTicketId('TKT-' + Math.random().toString(36).substr(2, 9).toUpperCase());
        setSubmitted(true);
      }
    } catch (error) {
      // Mock success for development
      setTicketId('TKT-' + Math.random().toString(36).substr(2, 9).toUpperCase());
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted && ticketId) {
    return (
      <div className="report-page">
        <div className="report-success">
          <div className="success-icon">✅</div>
          <h2>Report Submitted Successfully!</h2>
          <p>Your ticket ID: <strong>{ticketId}</strong></p>
          <p className="success-message">
            We've received your report and will update you on its status.
            You can track it in the Notifications section.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setTicketId(null);
              setImagePreview(null);
            }}
            className="btn btn-primary"
          >
            Submit Another Report
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="report-page">
      <div className="report-header">
        <h1>Report an Issue</h1>
        <p>Help us improve your city by reporting problems</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="report-form">
        <div className="form-group">
          <label className="form-label">Category *</label>
          <select
            {...register('category', { required: 'Please select a category' })}
            className="form-input"
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && (
            <span className="error-text">{errors.category.message}</span>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Description *</label>
          <textarea
            {...register('description', {
              required: 'Please provide a description',
              minLength: {
                value: 10,
                message: 'Description must be at least 10 characters',
              },
            })}
            className="form-input form-textarea"
            rows={4}
            placeholder="Describe the issue in detail..."
          />
          {errors.description && (
            <span className="error-text">{errors.description.message}</span>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Photo (optional)</label>
          <input
            type="file"
            accept="image/*"
            {...register('image')}
            onChange={handleImageChange}
            className="form-input"
          />
          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="Preview" />
            </div>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Location</label>
          {location ? (
            <div className="location-info">
              <span>📍 {location.lat.toFixed(6)}, {location.lng.toFixed(6)}</span>
              <button
                type="button"
                onClick={() => {
                  if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition((position) => {
                      setLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                      });
                    });
                  }
                }}
                className="btn btn-secondary btn-sm"
              >
                Update Location
              </button>
            </div>
          ) : (
            <div className="location-info">
              <span>Getting location...</span>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-primary report-submit"
          disabled={submitting}
        >
          {submitting ? 'Submitting...' : 'Submit Report'}
        </button>
      </form>
    </div>
  );
}

