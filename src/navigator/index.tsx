import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/home';
import Splash from '../screens/splash';
import Expenses from '../components/expenses';
import Income from '../components/income';
import TotalIncomeExpense from '../components/totalIncomeExpense';


const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Expenses"
          component={Expenses}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Income"
          component={Income}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="TotalIncomeExpense"
          component={TotalIncomeExpense}
          options={{headerShown: false}}
        />

  
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;

const styles = StyleSheet.create({});
