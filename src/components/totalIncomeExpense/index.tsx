import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Calendar } from 'react-native-calendars';
import { vh, vw } from '../../utils/dimensions';
import { colors } from '../../utils/colors';
import Header from '../header';

const TotalIncomeExpense = () => {
  const [cal, setCal] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  
  useEffect(() => {
   
    const loadData = async () => {
      try {
        const storedIncomes = await AsyncStorage.getItem('incomes');
        const storedExpenses = await AsyncStorage.getItem('expenses');
        
        if (storedIncomes) {
          setIncomes(JSON.parse(storedIncomes));
        }
        if (storedExpenses) {
          setExpenses(JSON.parse(storedExpenses));
        }
      } catch (e) {
        console.error(e);
      }
    };

    loadData();
  }, []);


  const toggleCalendar = () => {
    setCal(!cal);
  };


  const totalIncomeForSelectedDate = incomes.reduce((sum, income) => {
    if (income.date === selectedDate) {
      return sum + income.amount;
    }
    return sum;
  }, 0).toFixed(2);


  const totalExpenseForSelectedDate = expenses.reduce((sum, expense) => {
    if (expense.date === selectedDate) {
      return sum + expense.amount;
    }
    return sum;
  }, 0).toFixed(2);

  return (
    <View style={styles.container}>
        <Header yes={true}/>
        <View style={styles.mainCont}>
      <View style={styles.content}>
        <TouchableOpacity onPress={toggleCalendar} style={styles.calendarButton}>
          <Text style={styles.buttonText}>Select Date</Text>
        </TouchableOpacity>

        {cal && (
          <Calendar
            onDayPress={day => {
              setSelectedDate(day.dateString);
              setCal(false); 
            }}
            markedDates={{
              [selectedDate]: { selected: true, selectedDotColor: 'orange' }
            }}
            theme={{
              selectedDayBackgroundColor: colors.primary,
              todayTextColor: colors.primary,
              dayTextColor: '#2d4150',
              monthTextColor: '#2d4150',
              arrowColor: colors.primary,
            }}
          />
        )}

        <Text style={styles.selectedDateText}>
          Selected Date: {selectedDate ? selectedDate : 'None'}
        </Text>

        {selectedDate && (
          <View style={styles.totalsContainer}>
            <Text style={styles.totalText}>Total Income: ${totalIncomeForSelectedDate}</Text>
            <Text style={styles.totalText}>Total Expense: ${totalExpenseForSelectedDate}</Text>
          </View>
        )}
      </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainCont:{
    justifyContent: 'center',
    paddingHorizontal: vw(15),
    backgroundColor: '#fff',
    flex:1,
  },
  content: {
    alignItems: 'center',
  },
  calendarButton: {
    backgroundColor: colors.primary,
    padding: vw(10),
    borderRadius: 5,
    marginVertical: vh(20),
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  selectedDateText: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: vh(10),
    color: colors.primary,
  },
  totalsContainer: {
    marginTop: vh(20),
    alignItems: 'center',
  },
  totalText: {
    fontSize: 20,
    fontWeight: '700',
    marginVertical: vh(5),
    color: '#333',
  },
});

export default TotalIncomeExpense;
