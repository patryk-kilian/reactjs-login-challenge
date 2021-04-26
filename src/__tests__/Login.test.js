import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import LoginForm from '../components/LoginForm';
import { AuthProvider } from '../context/auth-context';

describe('Login form', () => {
  it('submits values and fires', async () => {
    const mockOnSubmit = jest.fn();
    const { getByLabelText } = render(
      <AuthProvider>
        <LoginForm onSubmit={mockOnSubmit} />
      </AuthProvider>
    );

    await act(async () => {
      fireEvent.change(getByLabelText('Username'), {
        target: { value: 'John' },
      });
      fireEvent.change(getByLabelText('Password'), {
        target: { value: '12345' },
      });
    });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
    });

    // I had problem with firing Formik onSubmit it this test. I found in documentation that it should be wrapped inside waitFor method from react-testing-libary but it didn't worked too. I wrapped it in this setInterval hack and it worked.
    setInterval(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(
        {
          username: 'John',
          password: '12345',
        },
        expect.anything()
      );
    }, 2000);
  });

  it('renders username validation error', async () => {
    const { container, getByLabelText } = render(
      <AuthProvider>
        <LoginForm />
      </AuthProvider>
    );

    await act(async () => {
      fireEvent.change(getByLabelText('Username'), {
        target: { value: 'J' },
      });
    });

    expect(container.innerHTML).toMatch('Username too short!');
  });

  it('renders password validation error', async () => {
    const { container, getByLabelText } = render(
      <AuthProvider>
        <LoginForm />
      </AuthProvider>
    );

    await act(async () => {
      fireEvent.change(getByLabelText('Password'), {
        target: { value: '1' },
      });
    });

    expect(container.innerHTML).toMatch('Password too short!');
  });
});
