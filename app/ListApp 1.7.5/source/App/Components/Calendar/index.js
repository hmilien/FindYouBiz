/** @format */

import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";
import { warn, Constants, Languages } from "@common";
import { DateTimePicker } from "@components";
import Dates from "react-native-dates";
import moment from "moment";

export default class Index extends Component {
  state = {
    date: null,
    focus: "startDate",
    startDate: null,
    endDate: null
  };

  render() {
    const isDateBlocked = date => date.isBefore(moment(), "day");

    const onDatesChange = ({ startDate, endDate, focusedInput }) => {
      this.setState({ ...this.state, focus: focusedInput }, () =>
        this.setState({ ...this.state, startDate, endDate })
      );
      this.props.selectedDate({ startDate, endDate });
    };

    const onDateChange = ({ date }) => {
      this.setState({ ...this.state, date });

      this.props.selectedDate(({ startDate, endDate }) => {
        startDate, endDate;
      });
    };

    const selectedTimePickerStart = time => {
      this.props.selectedTimeStart(time);
    };
    const selectedTimePickerEnd = time => {
      this.props.selectedTimeEnd(time);
    };

    return (
      <View style={styles.container}>
        {!this.state.startDate && (
          <Text style={styles.selectCal}>{Languages.selectOnCalendar}</Text>
        )}
        <Dates
          onDatesChange={onDatesChange}
          isDateBlocked={isDateBlocked}
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          focusedInput={this.state.focus}
          range
        />

        {this.state.startDate && (
          <View style={styles.datePanel}>
            <Text style={styles.date}>
              {Languages.startDate + ": " + this.state.startDate.format("LL")}
            </Text>
            <DateTimePicker
              textHolder={Languages.timeStart}
              selectedTimePicker={selectedTimePickerStart}
            />
          </View>
        )}

        {this.state.endDate && (
          <View style={{ flexDirection: "row" }}>
            <Text
              style={[
                styles.date,
                this.state.focus === "endDate" && styles.focused
              ]}
            >
              {Languages.endDate + ": " + this.state.endDate.format("LL")}
            </Text>
            <DateTimePicker
              textHolder={Languages.timeEnd}
              selectedTimePicker={selectedTimePickerEnd}
            />
          </View>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    marginTop: 30
  },

  datePanel: {
    flexDirection: "row",
    marginTop: 10
  },

  date: {
    marginBottom: 15,
    marginTop: 30,
    flex: 1,
    color: "#333"
  },
  focused: {
    color: "blue"
  },
  selectCal: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 10,
    color: "#333",
    fontFamily: Constants.fontFamily
  }
});
