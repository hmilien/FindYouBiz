/** @format */

import React from 'react';
import { Text, View } from 'react-native';
import Icon from '@expo/vector-icons/SimpleLineIcons';
import styles from './styles';

const SearchGoogleItem = ({ row }) => {
  return (
    <View style={styles.descContainer}>
      <Icon style={{ marginRight: 10 }} name="location-pin" size={15} />
      {row && <Text style={styles.description}>{row.description}</Text>}
    </View>
  );
};

export default SearchGoogleItem;
