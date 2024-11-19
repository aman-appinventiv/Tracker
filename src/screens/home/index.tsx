import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { vh, Wwidth } from '../../utils/dimensions'
import { useNavigation } from '@react-navigation/native'
import { colors } from '../../utils/colors'
import { images } from '../../assets'
import Header from '../../components/header'

const Home = () => {
  const Navigation = useNavigation();
  const gotoExpense=()=>{
    Navigation.navigate('Expenses');
  }

  const gotoIncome = ()=>{
    Navigation.navigate('Income');
  }

  const gotoTotal=()=>{
    Navigation.navigate('TotalIncomeExpense');
  }
  return (
    <View style={styles.container}> 
    <Header yes={false}/>
    <ImageBackground style={styles.mainCont} source={images.bg}>
      <Text onPress={gotoExpense} style={styles.button}>Add Expenses</Text>
      <Text onPress={gotoIncome} style={styles.button}>Add Income</Text>
      <Text onPress={gotoTotal} style={styles.button}>Total Income Expense</Text>
    </ImageBackground>
     
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container:{
    flex:1,
  },

  mainCont:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  },
  button:{
    backgroundColor: colors.white,
    width: Wwidth/2,
    paddingVertical: vh(20),
    borderRadius: 10,
    textAlign: 'center',
    marginVertical: vh(30),
    fontWeight: '700',
    fontSize: vh(20),
  }
})