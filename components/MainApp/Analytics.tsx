import moment from 'moment';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';




export default function Analytics() {

    const [selected, setSelected] = useState('');
    return (
        <ScrollView>
            <View>
                <Calendar
                    // Customize the appearance of the calendar
                    style={{
                        borderWidth: 1,
                        borderColor: 'gray',
                        height: 350
                    }}
                    // Specify the current date
                    // current={'2012-03-01'}
                    // Callback that gets called when the user selects a day
                    onDayPress={day => {
                        console.log('selected day', day);
                    }}
                    // Mark specific dates as marked
                    markedDates={{
                        '2025-01-01': { selected: true, marked: true, selectedColor: 'blue' },
                        '2025-01-02': { marked: true },
                        // '2012-03-03': { selected: true, marked: true, selectedColor: 'blue' }
                    }}
                />
                <TouchableOpacity onPress={() => { console.log(moment.months.name) }}>
                    <Text>

                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )

}








