/** @format */

'use strict'
import React, { PureComponent } from 'react'
import { View, Text, FlatList, ScrollView } from 'react-native'
import styles from './styles'
import { Constants, Languages } from '@common'
import { PostList } from '@components'
import HorizonItemSearch from './HorizonItemSearch'

export default class DefaultSearch extends PureComponent {
  _renderHeader = (title) => {
    return (
      <View style={styles.headerTitle}>
        <Text style={styles.headerText}>{title}</Text>
      </View>
    )
  }

  _keyExtractor = (item, index) => index.toString()

  render() {
    const { onView, listCategories } = this.props
    return (
      <ScrollView>
        {this._renderHeader(Languages.categories)}
        <FlatList
          data={listCategories}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={this._keyExtractor}
          renderItem={({ item, index }) => (
            <HorizonItemSearch
              key={index}
              data={item}
              onViewPost={() => {
                onView(item, index, true)
              }}
              width={160}
              height={100}
            />
          )}
        />
        {this._renderHeader(Languages.recents)}

        <PostList
          layout={Constants.Layout.list}
          horizontal={false}
          onViewPost={onView}
        />
      </ScrollView>
    )
  }
}
