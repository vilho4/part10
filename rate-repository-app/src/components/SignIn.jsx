import { Text, TextInput, Pressable, View, StyleSheet } from 'react-native'
import { useFormik } from 'formik'
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

const LoginForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    onSubmit,
  })

  return (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor={theme.colors.placeholder}
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={theme.colors.placeholder}
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        secureTextEntry
      />

      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
    </View>
  )
}

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values)
  }

  return (
    <View>
      <Text>The sign-in view</Text>
      <LoginForm onSubmit={onSubmit} />
    </View>
  )
}

export default SignIn
