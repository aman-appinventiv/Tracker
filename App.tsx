import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import RootNavigator from './src/navigator'

const App = () => {
  return (
    <View style={styles.container}>
      <RootNavigator/>
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container:{
    flex:1,
  }
})