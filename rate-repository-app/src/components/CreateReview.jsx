import { View, TextInput, Pressable, StyleSheet } from 'react-native'
import { Formik } from 'formik'
import * as yup from 'yup'
import { useNavigate } from 'react-router-native'

import Text from './Text'
import theme from '../theme'
import useCreateReview from '../hooks/useCreateReview'

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: theme.colors.white,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.textSecondary,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  inputError: {
    borderColor: '#d73a4a',
  },
  errorText: {
    color: '#d73a4a',
    marginBottom: 10,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: theme.colors.white,
    fontWeight: theme.fontWeights.bold,
  },
})

const validationSchema = yup.object().shape({
  ownerName: yup.string().required('Repository owner name is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup
    .number()
    .typeError('Rating must be a number')
    .required('Rating is required')
    .min(0, 'Rating must be at least 0')
    .max(100, 'Rating must be at most 100'),
  text: yup.string(),
})

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: '',
}

const CreateReview = () => {
  const [createReview] = useCreateReview()
  const navigate = useNavigate()

  const onSubmit = async (values) => {
    const review = {
      ...values,
      rating: Number(values.rating),
    }

    const result = await createReview(review)

    navigate(`/repository/${result.repositoryId}`)
  }

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
        <View style={styles.container}>
          <TextInput
            style={[styles.input, touched.ownerName && errors.ownerName && styles.inputError]}
            placeholder="Repository owner name"
            value={values.ownerName}
            onChangeText={handleChange('ownerName')}
            onBlur={handleBlur('ownerName')}
          />
          {touched.ownerName && errors.ownerName && (
            <Text style={styles.errorText}>{errors.ownerName}</Text>
          )}

          <TextInput
            style={[
              styles.input,
              touched.repositoryName && errors.repositoryName && styles.inputError,
            ]}
            placeholder="Repository name"
            value={values.repositoryName}
            onChangeText={handleChange('repositoryName')}
            onBlur={handleBlur('repositoryName')}
          />
          {touched.repositoryName && errors.repositoryName && (
            <Text style={styles.errorText}>{errors.repositoryName}</Text>
          )}

          <TextInput
            style={[styles.input, touched.rating && errors.rating && styles.inputError]}
            placeholder="Rating between 0 and 100"
            keyboardType="numeric"
            value={values.rating}
            onChangeText={handleChange('rating')}
            onBlur={handleBlur('rating')}
          />
          {touched.rating && errors.rating && <Text style={styles.errorText}>{errors.rating}</Text>}

          <TextInput
            style={styles.input}
            placeholder="Review"
            value={values.text}
            onChangeText={handleChange('text')}
            onBlur={handleBlur('text')}
            multiline
          />

          <Pressable style={styles.button} onPress={handleSubmit} disabled={isSubmitting}>
            <Text style={styles.buttonText}>Create a review</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  )
}

export default CreateReview
