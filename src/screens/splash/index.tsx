import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Wwidth } from '../../utils/dimensions';
import { useNavigation } from '@react-navigation/native';
import { images } from '../../assets';


const Splash = () => {
  const Navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      Navigation.replace('Home');
    }, 2000);
    return () => clearTimeout(timer);
  }, [Navigation]);




  return (
    <View style={styles.container}>
      <FastImage source={images.splashGif} style={styles.splashGif} resizeMode={FastImage.resizeMode.contain} />
    </View>
  );
}
export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'white',
  },
  splashGif: {
    height: Wwidth / 2,
    width: Wwidth / 2,
  }
});