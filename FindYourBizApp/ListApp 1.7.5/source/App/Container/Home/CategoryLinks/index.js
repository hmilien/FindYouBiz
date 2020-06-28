/** @format */

import React, { PureComponent } from 'react'
import { FlatList, View, Text, Dimensions, StyleSheet } from 'react-native'
import Item from './Item'
import { Tools, Constants } from '@common'
const { width } = Dimensions.get('window')

export default class CategoryLinks extends PureComponent {
  static defaultProps = {
    categories: [],
    items: [],
  }

  renderHeader = () => {
    const { config } = this.props
    return (
      <View activeOpacity={0.9} style={styles.header} onPress={this.viewAll}>
        <Text
          style={[
            styles.headerText,
            config.textColor && { color: config.textColor },
          ]}>
          {Tools.formatText(config.name)}
        </Text>
      </View>
    )
  }

  render() {
    const { categories, items, type, onPress, config } = this.props
    const mapping = {}
    categories.forEach((item) => {
      mapping[item.id] = item.name
    })

    const column = typeof config.column != 'undefined' ? config.column : 1

    // console.warn([categories, mapping])
    return (
      <View>
        {typeof config.name !== 'undefined' &&
          config.name != '' &&
          this.renderHeader()}

        <FlatList
          style={styles.body}
          keyExtractor={(_, index) => `${index}`}
          contentContainerStyle={styles.flatlist}
          showsHorizontalScrollIndicator={false}
          horizontal={column == 1}
          numColumns={column}
          data={items}
          renderItem={({ item }) => (
            <Item
              item={item}
              type={type}
              column={column}
              label={mapping[item.category]}
              onPress={onPress}
            />
          )}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  flatlist: {
    marginBottom: 10,
  },
  body: {
    marginBottom: 5,
    marginTop: 5,
  },

  header: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 15,
  },
  headerText: {
    fontSize: 22,
    color: '#484848',
    letterSpacing: 0.5,
    fontFamily: Constants.fontFamilyBold,
    width: width * 0.6,
  },
})
