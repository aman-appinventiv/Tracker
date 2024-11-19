import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { vh, vw } from '../../utils/dimensions'
import { colors } from '../../utils/colors'
import { images } from '../../assets'
import { useNavigation } from '@react-navigation/native'

const Header = ({yes}) => {
  const Navigation = useNavigation();
  const goback = () =>{
    Navigation.goBack();
  }
  return (
    <View style={styles.header}>
      {yes && ( <TouchableOpacity onPress={goback}>
      <Image source={images.back} style={styles.back}/>
      </TouchableOpacity>)}
     
      <Text style={styles.title}>Personal Expense Tracker</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        margin: 20,
        fontSize: vh(20),
        fontWeight: '700',
        letterSpacing: 1.2,
        color: colors.white,
        flex:1,
      },
      header:{
        backgroundColor:colors.primary,
        paddingTop: vh(50),
        flexDirection:'row',
        alignItems:'flex-end',
        gap: vh(10),
      },
      back:{
        width: vh(20),
        height: vh(20),
        color: 'white',
        marginLeft: vw(10),
        marginBottom: 20,
        backgroundColor: 'white',
        borderRadius: 10,
      }
})