import { Text, TextInput, Pressable, View, StyleSheet } from 'react-native'
import { useFormik } from 'formik'
import * as yup from 'yup'
import useSignIn from '../hooks/useSignIn'
import { useNavigate } from 'react-router-native'
import theme from '../theme'

const initialValues = {
  username: '',
  password: '',
}

const styles = StyleSheet.create({
  form: {
    padding: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d0d7de',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  inputError: {
    borderColor: theme.colors.error,
  },
  errorText: {
    color: theme.colors.error,
    marginBottom: 10,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: theme.colors.white,
    fontWeight: 'bold',
  },
})

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
})

export const LoginForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  })

  const usernameHasError = formik.touched.username && formik.errors.username

  const passwordHasError = formik.touched.password && formik.errors.password

  return (
    <View style={styles.form}>
      <TextInput
        style={[styles.input, usernameHasError && styles.inputError]}
        placeholder="Username"
        placeholderTextColor={theme.colors.placeholder}
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
        onBlur={formik.handleBlur('username')}
      />

      {usernameHasError && <Text style={styles.errorText}>{formik.errors.username}</Text>}

      <TextInput
        style={[styles.input, passwordHasError && styles.inputError]}
        placeholder="Password"
        placeholderTextColor={theme.colors.placeholder}
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        onBlur={formik.handleBlur('password')}
        secureTextEntry
      />

      {passwordHasError && <Text style={styles.errorText}>{formik.errors.password}</Text>}

      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
    </View>
  )
}

const SignIn = () => {
  const [signIn] = useSignIn()
  const navigate = useNavigate()

  const onSubmit = async (values) => {
    const { username, password } = values

    try {
      const { data } = await signIn({ username, password })
      console.log('Sign in successful!')
      navigate('/')
    } catch (e) {
      console.error('Sign in failed:', e)
    }
  }

  return (
    <View>
      <Text>The sign-in view</Text>
      <LoginForm onSubmit={onSubmit} />
    </View>
  )
}

export default SignIn
