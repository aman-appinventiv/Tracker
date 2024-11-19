import {StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList, Alert, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {vh, vw} from '../../utils/dimensions';
import {Calendar} from 'react-native-calendars';
import { colors } from '../../utils/colors';
import Header from '../header';
import { images } from '../../assets';

const Income = () => {
  const [cal, setCal] = useState(false);
  const [exp, setExp] = useState(false);
  const [selected, setSelected] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Food');
  const [incomeAmount, setIncomeAmount] = useState(''); 
  const [incomes, setIncomes] = useState([]); 

  useEffect(() => {
    const loadIncomes = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('incomes'); 
        if (jsonValue != null) {
          setIncomes(JSON.parse(jsonValue));
        }
      } catch (e) {
        console.error(e);
      }
    };

    loadIncomes();
  }, []);

  const toggleCalendar = () => {
    setCal(!cal);
  };

  const toggleExpenses = () => {
    setExp(!exp);
  };

  const selectedCat = (type: string) => {
    setSelectedCategory(type);
    setExp(false);
  };

  const addIncome = async () => { 
    if (incomeAmount.trim() === '' || selected === '') { 
      Alert.alert('Please enter an amount and select a date.');
      return;
    }

    const newIncome = {
      id: Date.now().toString(),
      date: selected,
      category: selectedCategory,
      amount: parseFloat(incomeAmount), 
    };

    const updatedIncomes = [...incomes, newIncome]; 
    setIncomes(updatedIncomes); 
    setIncomeAmount(''); 
    setSelected('');
    setSelectedCategory('Food');

    try {
      await AsyncStorage.setItem('incomes', JSON.stringify(updatedIncomes)); 
    } catch (e) {
      console.error(e);
    }
  };

  const deleteIncome = async (id) => {
    const updatedIncomes = incomes.filter(income => income.id !== id);
    setIncomes(updatedIncomes);

    try {
      await AsyncStorage.setItem('incomes', JSON.stringify(updatedIncomes));
    } catch (e) {
      console.error(e);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.incomeItem}> 
      <Text>{item.date}</Text>
      <Text>{item.category}</Text>
      <Text>${item.amount.toFixed(2)}</Text>
      <TouchableOpacity onPress={() => deleteExpense(item.id)} style={styles.deleteButton}>
        <Image source={images.delete} style={styles.delImg}/>
      </TouchableOpacity>
    </View>
  );

  
  const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0).toFixed(2);

  return (
    <View style={styles.container}>
        <Header yes={true}/>
        <View style={styles.incomeContainer}>
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
            [selected ]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
          }}
        />
      )}

      <View style={styles.expWrapper}>
        <View style={{flexDirection: 'row', flex: 1}}>
          <TouchableOpacity onPress={toggleExpenses} style={styles.expensesCont}>
            <Text style={styles.expenses}>Select Category : </Text>
          </TouchableOpacity>

          <TextInput placeholder='Select' style={styles.inputExp} value={selectedCategory} editable={false} />
        </View>

        {exp && (
          <View style={styles.cont}>
            <TouchableOpacity onPress={() => selectedCat('Salary')}>
              <Text style={styles.expTextOdd}>Salary</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => selectedCat('Investment')}>
              <Text style={styles.expTextEven}>Investment</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => selectedCat('Part-Time')}>
              <Text style={styles.expTextOdd}>Part-Time</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => selectedCat('Bonus')}>
              <Text style={styles.expTextEven}>Bonus</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => selectedCat('Others')}>
              <Text style={styles.expTextOdd}>Others</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.InputWrapper}>
        <Text style={styles.expenses}>Enter Income : </Text>
        <TextInput
          placeholder='Income'
          style={styles.expInput}
          keyboardType='decimal-pad'
          value={incomeAmount} 
          onChangeText={setIncomeAmount} 
        />
      </View>

      <TouchableOpacity style={styles.addExpCont} onPress={addIncome}> 
        <Text style={styles.addExp}>Add Income</Text>
      </TouchableOpacity>

      <FlatList
        data={incomes} 
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.incomeList} 
      />

   
      <View style={styles.totalIncomeContainer}>
        <Text style={styles.totalIncomeText}>Total Income: ${totalIncome}</Text>
      </View>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  cont: {
    borderWidth: 1,
    flex: 1,
    marginHorizontal: vw(15),
    marginVertical: vh(10),
   
  },
  expTextOdd: {
    padding: vw(5),
    backgroundColor: 'white',
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
    flex: 1,
    paddingVertical: vh(5),
    textAlign: 'center',
    borderColor: 'gray'
  },
  InputWrapper: {
    flexDirection: 'row',
    marginVertical: vh(10),
    alignItems: 'center',
  },
  inputDate: {
    borderWidth: 1,
    flex: 1,
    textAlign: 'center',
    borderColor: 'gray'
  },
  dateWrap: {
    flexDirection: 'row',
    paddingTop: vh(30),
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
  inputExp: {
    borderWidth: 1,
    padding: vw(5),
    flex: 1,
    marginVertical: vh(10),
    borderColor: 'gray'
  },
  addExpCont: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    padding: vw(8),
    marginVertical: vh(20),
  },
  addExp: {
    color: colors.white,
    fontSize: 16,
  },
  incomeList: {
    marginTop: vh(20),
  },
  incomeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: vw(10),
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  delImg:{
    width: vw(20),
    height: vw(20),
  },
  incomeContainer:{
    paddingHorizontal: vw(10),
  }
});

export default Income;

