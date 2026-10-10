import { render, screen, fireEvent, waitFor } from '@testing-library/react-native'
import { LoginForm } from '../../components/SignIn'

describe('SignIn', () => {
  describe('LoginForm', () => {
    it('calls onSubmit with correct values when the form is submitted', async () => {
      const onSubmit = jest.fn()
      const username = 'kalle'
      const password = 'password'

      render(<LoginForm onSubmit={onSubmit} />)

      fireEvent.changeText(screen.getByPlaceholderText('Username'), username)
      fireEvent.changeText(screen.getByPlaceholderText('Password'), password)

      fireEvent.press(screen.getByText('Login'))

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1)

        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: 'kalle',
          password: 'password',
        })
      })
    })
  })
})
