/** @format */

import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native'

import { Color, Style, Constants, AppConfig, Config, Languages, warn } from '@common'
import { Agenda } from 'react-native-calendars'
import { Post } from '@data'
import wp from '@services/WPAPI'
import styles from './styles'
import { sortBy, find } from 'lodash'
import { connect } from 'react-redux'

const { width, height } = Dimensions.get('window')
class AgendaView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: {},
    }
    this.markedDates = {}
  }

  componentDidMount() {
    const { items, colorConfig } = this.props
    items.map((item) => {
      const starDayObject =
        typeof item.line_items[0] != 'undefined' &&
        find(item.line_items[0].meta_data, (obj) => obj.key === 'Start')
      this.markedDates[this.dateFormat(starDayObject.value)] = {
        selectedColor: colorConfig.mainColorTheme
          ? colorConfig.mainColorTheme
          : Color.main,
        textColor: Color.calendars.textColor,
        dotColor: Color.calendars.dot,
        selected: true,
        marked: true,
      }
    })
  }

  dateFormat = (date) => {
    const d = new Date(date)
    const year = d.getFullYear()
    const month =
      d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1
    const day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate()
    return year + '-' + month + '-' + day
  }

  renderEmptyDate = (day) => {
    const strTime = this.timeToString(day)
    return (
      <View style={styles.emptyDate}>
        <Text>{strTime + ' ' + Languages.emptyDate}</Text>
      </View>
    )
  }

  viewPost = (id) => {
    const { navigation } = this.props
    wp.getJobListing()
      .id(id)
      .embed()
      .then((post) => {
        const postFilter = new Post(post)
        navigation.navigate('postDetail', { post: postFilter })
      })
      .catch((err) => warn(['err::', err]))
  }

  renderItem = (item, firstItemInDay) => {
    const renderAttribute = (label = '', context = '', index) => {
      return (
        <View style={styles.row} key={index}>
          <Text style={styles.label}>{label}</Text>
          <Text style={[styles.contentLabel]}>{context}</Text>
        </View>
      )
    }

    const renderFeature = (value, index) => {
      const uri = value.split('|')[1]
      const id = value.split('|')[0]
      return (
        <TouchableOpacity
          onPress={() => this.viewPost(id)}
          key={index}
          style={Style.wrapCalImage}>
          <Image source={{ uri }} style={Style.calendarImage} />
        </TouchableOpacity>
      )
    }

    return (
      <View style={styles.item} key={item.toString()}>
        <View style={{ padding: 5, backgroundColor: '#FFF' }}>
          {typeof item != 'undefined' &&
            item.map((tp, index) => {
              if (tp.key == 'Feature Image') {
                return renderFeature(tp.value, index)
              }
              return renderAttribute(tp.key, tp.value, index)
            })}
        </View>
      </View>
    )
  }

  loadItemsForMonth = (day) => {
    // sort date item
    const items = sortBy(this.props.items, [
      (item) => {
        const starDayObject =
          typeof item.line_items[0] != 'undefined' &&
          find(item.line_items[0].meta_data, (obj) => obj.key === 'Start')
        return this.dateFormat(starDayObject.value)
      },
    ])

    const newItems = {}
    items.map((item, index) => {
      const starDayObject =
        typeof item.line_items[0] != 'undefined' &&
        find(item.line_items[0].meta_data, (obj) => obj.key === 'Start')
      let dateBooking = this.dateFormat(starDayObject.value)

      if (newItems.hasOwnProperty(dateBooking)) {
        // same date booking
        if (typeof item.line_items[0] != 'undefined') {
          newItems[dateBooking].push(item.line_items[0].meta_data)
        }
      } else {
        // init new date
        if (typeof item.line_items[0] != 'undefined') {
          newItems[dateBooking] = [item.line_items[0].meta_data]
        }
      }
    })

    this.setState({ items: newItems })
  }

  timeToString = (time) => new Date(time).toISOString().split('T')[0]

  rowHasChanged = (r1, r2) => r1 !== r2

  renderEmptyData = () => <View />

  renderKnob = () => (
    <View style={styles.fullLine}>
      <View style={styles.knob} />
    </View>
  )

  render() {
    return (
      <Agenda
        items={this.state.items}
        // callback that gets called when items for a certain month should be loaded (month became visible)
        loadItemsForMonth={this.loadItemsForMonth}
        // initially selected day
        selected={new Date()}
        // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
        minDate={Constants.OrderCalendar.minDate}
        // // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
        maxDate={Constants.OrderCalendar.maxDate}
        // specify how each item should be rendered in agenda
        renderItem={this.renderItem}
        // specify how empty date content with no items should be rendered
        renderEmptyDate={this.renderEmptyDate}
        // specify how agenda knob should look like
        renderKnob={this.renderKnob}
        // // specify what should be rendered instead of ActivityIndicator
        renderEmptyData={this.renderEmptyData}
        // specify your item comparison function for increased performance
        rowHasChanged={this.rowHasChanged}
        // Hide knob button. Default = false
        hideKnob={Constants.OrderCalendar.hideKnob}
        markingType={Constants.OrderCalendar.markingType}
        firstDay={1}
        monthFormat={Constants.OrderCalendar.formatMonth}
        // By default, agenda dates are marked if they have at least one item, but you can override this if needed
        markedDates={this.markedDates}
        // agenda theme
        theme={{
          agendaDayTextColor: Color.calendars.dayText,
          agendaDayNumColor: Color.calendars.dayNum,
          agendaTodayColor: Color.calendars.today,
          agendaKnobColor: Color.calendars.selectBackground,
          textSectionTitleColor: '#333',
          selectedDayBackgroundColor: Color.calendars.selectBackground,
          selectedDayTextColor: '#FFF',
          todayTextColor: Color.calendars.today,
          dayTextColor: '#2d4150',
          textDisabledColor: '#d9e1e8',
          selectedDotColor: '#FFF',
          monthTextColor: Color.calendars.monthTextColor,
          textDayFontFamily: Constants.fontFamilyLight,
          textMonthFontFamily: Constants.fontFamilyLight,
          textDayHeaderFontFamily: Constants.fontFamilyLight,
        }}
        // agenda container style

        style={{}}
      />
    )
  }
}

const mapStateToProps = ({ config }) => {
  return {
    colorConfig: config.color,
  }
}
export default connect(mapStateToProps)(AgendaView)
