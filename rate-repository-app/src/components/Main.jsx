import { View } from 'react-native'
import { Route, Routes, Navigate } from 'react-router-native'

import RepositoryList from './RepositoryList'
import RepositoryView from './RepositoryView'
import AppBar from './AppBar'
import SignIn from './SignIn'
import SignUp from './SignUp'
import CreateReview from './CreateReview'

const Main = () => {
  return (
    <View style={{ flex: 1 }}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/repository/:id" element={<RepositoryView />} />
        <Route path="*" element={<Navigate replace to="/" />} />
        <Route path="/create-review" element={<CreateReview />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </View>
  )
}

export default Main
