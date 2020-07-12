/**
 * Created by InspireUI on 27/02/2017.
 *
 * @format
 */

import React, { PureComponent } from 'react'
import { View, FlatList, StyleSheet, Animated } from 'react-native'
import { connect } from 'react-redux'
import { Color, Constants } from '@common'
import { PostLayout, AnimatedHeader } from '@components'
import { fetchPostsByTerm } from '@redux/actions'
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)
class Category extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      scrollY: new Animated.Value(0),
    }
    this.page = 1
  }

  componentDidMount() {
    const { fetchPostsByTerm, selectedCategory } = this.props
    fetchPostsByTerm(this.page, selectedCategory)
  }

  render() {
    const { list, cateName, goBack } = this.props;

    return (
      <View style={styles.container}>
        <AnimatedHeader
          goBack={goBack}
          label={cateName}
          scrollY={this.state.scrollY}
        />

        <AnimatedFlatList
          contentContainerStyle={styles.listView}
          keyExtractor={(item, index) => `${index}`}
          data={list}
          numColumns={2}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: true }
          )}
          renderItem={this.renderItem}
        />
      </View>
    )
  }

  onViewPost = (item, index) => this.props.onViewPost(item, index)

  renderItem = ({ item, index }) => {
    if (item == null) return <View />
    return (
      <PostLayout
        post={item}
        onViewPost={() => this.onViewPost(item, index)}
        layout={Constants.Layout.twoColumn}
      />
    )
  }
}

const styles = StyleSheet.create({
  listView: {
    alignItems: 'center',
    paddingTop: 40,
  },
  container: {
    flexGrow: 1,
    backgroundColor: Color.background,
  },
})

const mapStateToProps = ({ categories, posts }) => ({
  selectedCategory: categories.selectedCategory,
  isFetching: posts.isFetching,
  list: posts.listByCates,
})

export default connect(
  mapStateToProps,
  {
    fetchPostsByTerm,
  }
)(Category);
