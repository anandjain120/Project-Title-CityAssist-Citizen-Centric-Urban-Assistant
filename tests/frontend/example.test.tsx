import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import LoginPage from '../../frontend/src/pages/LoginPage';
import { useAuthStore } from '../../frontend/src/store/authStore';

// Mock the auth store
vi.mock('../../frontend/src/store/authStore', () => ({
  useAuthStore: vi.fn(),
}));

describe('LoginPage', () => {
  it('renders login form', () => {
    vi.mocked(useAuthStore).mockReturnValue({
      login: vi.fn(),
      isAuthenticated: false,
      user: null,
      token: null,
    } as any);

    render(<LoginPage />);
    
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('submits login form with valid credentials', async () => {
    const mockLogin = vi.fn().mockResolvedValue(undefined);
    vi.mocked(useAuthStore).mockReturnValue({
      login: mockLogin,
      isAuthenticated: false,
      user: null,
      token: null,
    } as any);

    render(<LoginPage />);
    
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'user@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('user@example.com', 'password123');
    });
  });
});

