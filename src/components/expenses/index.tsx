import { StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList, Alert, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { vh, vw } from '../../utils/dimensions';
import { Calendar } from 'react-native-calendars';
import { colors } from '../../utils/colors';
import Header from '../header';
import { images } from '../../assets';


const Expenses = () => {
  const [cal, setCal] = useState(false);
  const [exp, setExp] = useState(false);
  const [selected, setSelected] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Food');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const loadExpenses = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('expenses');
        if (jsonValue != null) {
          setExpenses(JSON.parse(jsonValue));
        }
      } catch (e) {
        console.error(e);
      }
    };

    loadExpenses();
  }, []);

  const toggleCalendar = () => {
    setCal(!cal);
  };

  const toggleExpenses = () => {
    setExp(!exp);
  };

  const selectedCat = (type) => {
    setSelectedCategory(type);
    setExp(false);
  };

  const addExpense = async () => {
    if (expenseAmount.trim() === '' || selected === '') {
      Alert.alert('Please enter an amount and select a date.');
      return;
    }

    const newExpense = {
      id: Date.now().toString(),
      date: selected,
      category: selectedCategory,
      amount: parseFloat(expenseAmount),
    };

    const updatedExpenses = [...expenses, newExpense];
    setExpenses(updatedExpenses);
    setExpenseAmount('');
    setSelected('');
    setSelectedCategory('Food');

    try {
      await AsyncStorage.setItem('expenses', JSON.stringify(updatedExpenses));
    } catch (e) {
      console.error(e);
    }
  };

  const deleteExpense = async (id) => {
    const updatedExpenses = expenses.filter(expense => expense.id !== id);
    setExpenses(updatedExpenses);

    try {
      await AsyncStorage.setItem('expenses', JSON.stringify(updatedExpenses));
    } catch (e) {
      console.error(e);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.expenseItem}>
      <Text style={styles.expenseText}>{item.date}</Text>
      <Text style={styles.expenseText}>{item.category}</Text>
      <Text style={styles.expenseText}>${item.amount.toFixed(2)}</Text>
      <TouchableOpacity onPress={() => deleteExpense(item.id)} style={styles.deleteButton}>
        <Image source={images.delete} style={styles.delImg}/>
      </TouchableOpacity>
    </View>
  );

  const totalExpense = expenses.reduce((sum, expense) => sum + expense.amount, 0).toFixed(2);

  return (
    <View style={styles.container}>
      <Header yes={true}/>
      <View style={styles.expenseContainer}>
      <View style={styles.dateWrap}>
        <TouchableOpacity onPress={toggleCalendar} style={styles.dateCont}>
          <Text style={styles.date}>Select Date : </Text>
        </TouchableOpacity>
        <TextInput style={styles.inputDate} placeholder='Date' value={selected} editable={false} />
      </View>

      {cal && (
        <Calendar
          onDayPress={day => {
            setSelected(day.dateString);
            setCal(false);
          }}
          markedDates={{
            [selected]: { selected: true, disableTouchEvent: true, selectedDotColor : 'orange' }
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

      <View style={styles.expWrapper}>
        <View style={{ flexDirection: 'row', flex: 1 }}>
          <TouchableOpacity onPress={toggleExpenses} style={styles.expensesCont}>
            <Text style={styles.expenses}>Select Category : </Text>
          </TouchableOpacity>

          <TextInput placeholder='Select' style={styles.inputExp} value={selectedCategory} editable={false} />
        </View>

        {exp && (
          <View style={styles.cont}>
            {['Food', 'Transport', 'Shopping', 'Education', 'Others'].map((type, index) => (
              <TouchableOpacity key={index} onPress={() => selectedCat(type)}>
                <Text style={index % 2 === 0 ? styles.expTextOdd : styles.expTextEven}>{type}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <View style={styles.InputWrapper}>
        <Text style={styles.expenses}>Enter Expense : </Text>
        <TextInput
          placeholder='Expense'
          style={styles.expInput}
          keyboardType='decimal-pad'
          value={expenseAmount}
          onChangeText={setExpenseAmount}
        />
      </View>

      <TouchableOpacity style={styles.addExpCont} onPress={addExpense}>
        <Text style={styles.addExp}>Add Expense</Text>
      </TouchableOpacity>

      <FlatList
        data={expenses}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.expenseList}
      />
      <View style={styles.totalIncomeContainer}>
        <Text style={styles.totalIncomeText}>Total Income: ${totalExpense}</Text>
      </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  expenseContainer:{
    flex:1,
    paddingHorizontal: vw(10),
  },
  date: {
    fontSize: vh(16),
    fontWeight: '600',
    color: colors.primary,
  },
  dateCont: {
    marginBottom: vh(10),
  },
  expenses: {
    fontSize: vh(16),
    fontWeight: '600',
    color: colors.primary,
  },
  expensesCont: {
    marginVertical: vh(10),
  },

  expTextOdd: {
    padding: vw(5),
    backgroundColor: '#e9ecef',
    textAlign: 'center',
  },
  expTextEven: {
    padding: vw(5),
    textAlign: 'center',
  },
  expWrapper: {
    flexDirection: 'row',
  },
  expInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    flex: 1,
    paddingVertical: vh(5),
    textAlign: 'center',
    borderRadius: 5,
  },
  InputWrapper: {
    flexDirection: 'row',
    marginVertical: vh(10),
    alignItems: 'center',
  },
  inputDate: {
    borderWidth: 1,
    borderColor: '#ccc',
    flex: 1,
    textAlign: 'center',
    borderRadius: 5,
  },
  dateWrap: {
    flexDirection: 'row',
    marginTop: vh(30),
  },
  addExpCont: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    padding: vw(8),
    marginVertical: vh(20),
    borderRadius: 5,
  },
  addExp: {
    color: colors.white,
    fontSize: 16,
  },
  expenseList: {
    marginTop: vh(20),
  },
  expenseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: vw(10),
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: 'white',
    borderRadius: 5,
    marginVertical: vh(5),
  },
  deleteButton: {

  },
  deleteText: {
    color: 'white',
  },
  totalIncomeContainer: {
    marginTop: vh(20),
    alignItems: 'center',
    marginBottom: vh(20),
  },
  totalIncomeText: {
    fontSize: vh(18),
    fontWeight: '700',
    color: colors.primary,
  },
  delImg:{
    width: vw(20),
    height: vw(20),
  },
  expenseText:{
    fontSize: vw(14),
    color: 'gray',
    fontWeight: '700',
  }
});

export default Expenses;
