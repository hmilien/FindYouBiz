/** @format */

import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Picker,
  I18nManager,
  Alert,
} from 'react-native'
import { Languages } from '@common'
import { Updates } from 'expo'
import { connect } from 'react-redux'
import { switchLanguage } from '@redux/actions'

class LanguageSwitch extends React.Component {
  changeLocale = (locale) => {
    Alert.alert(Languages.Confirm, Languages.SwitchRtlConfirm, [
      {
        text: Languages.CANCEL,
        onPress: () => undefined,
      },
      {
        text: Languages.OK,
        onPress: () => {
          this.props.switchLanguage(locale)
          I18nManager.forceRTL(locale == 'ar')
          Updates.reload()
        },
      },
    ])
  }

  render() {
    const { lang } = this.props
    return (
      <View style={styles.container}>
        <Picker
          style={styles.picker}
          selectedValue={lang}
          onValueChange={this.changeLocale}>
          <Picker.Item label={'🇺🇸 English'} value={'en'} />
          <Picker.Item label={'🇷🇺 Arabic'} value={'ar'} />
        </Picker>
        <View
          style={
            (I18nManager.isRTL && { flexDirection: 'row-reverse' },
            styles.centered)
          }>
          <Text style={styles.plainBanner}>
            {Languages.currentLanguage + ': '}
          </Text>
          <Text style={styles.plainBanner}>
            {lang == 'en' ? 'English' : 'Arabic'}
          </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  centered: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  picker: { backgroundColor: '#EEE', width: '50%' },
  container: {
    paddingVertical: 10,
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plainBanner: { fontSize: 14, marginTop: 15 },
})

const mapStateToProps = ({ language }) => {
  return {
    lang: language.lang,
  }
}

export default connect(
  mapStateToProps,
  { switchLanguage }
)(LanguageSwitch)
