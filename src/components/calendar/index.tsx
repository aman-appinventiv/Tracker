import React, {useState} from 'react';
import {Calendar, LocaleConfig} from 'react-native-calendars';

const CalendarComp = () => {
  const [selected, setSelected] = useState('');
  console.log(selected);

  return (
    <Calendar
      onDayPress={day => {
        setSelected(day.dateString);
      }}
      markedDates={{
        [selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
      }}
    />
  );
};

export default CalendarComp;