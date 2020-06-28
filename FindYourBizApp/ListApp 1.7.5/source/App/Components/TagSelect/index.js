/** @format */

import React from 'react'
import { View, StyleSheet, Button, Alert, Text } from 'react-native'
import { Color, warn, Tools } from '@common'
import { TagSelect } from 'react-native-tag-select'
import styles from './styles'
import { connect } from 'react-redux'

class Index extends React.Component {
  constructor(props) {
    super(props)
    this.default = [
      { id: 1, name: 'Updating...' },
      { id: 2, name: 'Updating...' },
      { id: 3, name: 'Updating...' },
    ]
    this.state = {
      defaults: props.defaults ? props.defaults : [],
    }
  }

  _filter = (list, label) => {
    let data = []
    data =
      typeof list != 'undefined'
        ? list.map((item) => {
            return {
              id: typeof item !== 'undefined' ? item.id : 1,
              name: Tools.formatText(
                typeof item.name != 'undefined'
                  ? item.name
                  : item.title.rendered
              ),
              type: label,
            }
          })
        : this.default
    return data
  }

  render() {
    const { clear, label, list, onItemPress } = this.props
    // warn(defaults)

    return (
      <View style={styles.container}>
        <Text style={styles.labelText}>{label || ''}</Text>
        <TagSelect
          ref={'tag'}
          theme={'success'}
          data={this._filter(list, label)}
          onMaxError={() => error('error tag select')}
          labelAttr={'name'}
          keyAttr={'id'}
          value={this.state.defaults}
          clear={clear}
          containerStyle={styles.all}
          itemStyle={styles.item}
          onItemPress={onItemPress}
          itemLabelStyle={styles.label}
          itemStyleSelected={styles.itemSelected}
          itemLabelStyleSelected={styles.labelSelected}
        />
      </View>
    )
  }
}

const mapStateToProps = ({ listingTags }, ownProps) => {
  return {
    ...ownProps,
    clear: listingTags.clear,
  }
}
export default connect(
  mapStateToProps,
  null,
  null,
  // { withRef: true }
)(Index)
