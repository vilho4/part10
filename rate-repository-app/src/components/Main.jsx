import { View } from 'react-native'
import { Route, Routes, Navigate } from 'react-router-native'

import RepositoryList from './RepositoryList'
import AppBar from './AppBar'
import SignIn from './SignIn'

const Main = () => {
  return (
    <View style={{ flex: 1 }}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="sign-in" element={<SignIn />} />

        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </View>
  )
}

export default Main
