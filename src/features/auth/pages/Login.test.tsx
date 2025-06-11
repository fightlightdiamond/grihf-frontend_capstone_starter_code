import { fireEvent, screen } from '@testing-library/react';
import { Login } from './Login';
import { renderWithProviders } from '../../../common/utils/test-utils';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router';

describe('Login Component with Redux Toolkit', () => {
  it('renders login form', () => {
    renderWithProviders(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );

    expect(screen.getByText(/Employee Polls/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/test@gmail.com/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Your password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
  });

  it('dispatches login action and shows status', async () => {
    renderWithProviders(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );

    const emailInput = screen.getByPlaceholderText(/test@gmail.com/i);
    const passwordInput = screen.getByLabelText(/Your password/i);
    const submitButton = screen.getByRole('button', { name: /Submit/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);
    // screen!.debug()
    expect(
      await screen.findByText(/Failed to authenticate/i),
    ).toBeInTheDocument();
  });

  test('matches snapshot for personalized message', () => {
    const { asFragment } = renderWithProviders(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
