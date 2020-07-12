import React, { PureComponent } from 'react'
import { FlatList, Animated, View } from 'react-native'
import {
  fetchCategories,
  fetchPostsByTerm,
  setActiveLayout,
} from '@redux/actions'
import {
  Constants,
  Images,
  Languages,
  Config,
  Color,
  Layout,
  warn,
} from '@common'
import { connect } from 'react-redux'
import styles from './styles'
import {
  PostLayout,
  CategoryBanner,
  HeaderFilter,
  Toolbar,
  FlatButton,
  LogoSpinner,
  Spinkit,
} from '@components'

const HEADER_MIN_HEIGHT = 40
const HEADER_SCROLL_DISTANCE = Constants.Window.headerHeight - HEADER_MIN_HEIGHT

const AnimatedListView = Animated.createAnimatedComponent(FlatList)

class CategoryList extends PureComponent {
  state = { scrollY: new Animated.Value(0) }

  constructor(props) {
    super(props)
    this.page = 1
    this.isNextPost = false

    const scrollY = new Animated.Value(0)
    const offsetAnimate = new Animated.Value(0)

    this.state = {
      scrollY,
      offsetAnimate,
      clampedScroll: Animated.diffClamp(
        Animated.add(
          scrollY.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolateLeft: 'clamp',
          }),
          offsetAnimate
        ),
        0,
        HEADER_MIN_HEIGHT
      ),
    }
  }

  _clampedScrollValue = 0
  _offsetValue = 0
  _scrollValue = 0

  componentDidMount() {
    this.page == 1 && this.fetchPost()
  }

  onViewPost(item, index) {
    this.props.onViewPost(item, index)
  }

  renderItem = ({ item, index }) => {
    if (item == null) return <View />

    let layout = this.props.parentLayout

    if (typeof this.props.layout != 'undefined') {
      layout = this.props.layout
    }

    // update layout for advance mod
    if (layout == Constants.Layout.advance || layout == null) {
      const total = Layout.length
      layout = Layout[index % total]
    }

    return (
      <PostLayout
        post={item}
        config={{ height: 80, width: 300 }}
        onViewPost={this.onViewPost.bind(this, item, index)}
        layout={Constants.Layout.twoColumn}
      />
    )
  }

  fetchPost = () => {
    const { selectedCategory, fetchPostsByTerm } = this.props
    fetchPostsByTerm(this.page, selectedCategory)
  }

  nextPosts = () => {
    this.isNextPost = true
    this.page += 1
    this.fetchPost()
  }

  _onScrollEndDrag = () => {
    this._scrollEndTimer = setTimeout(this._onMomentumScrollEnd, 250)
  }

  _onMomentumScrollBegin = () => {
    clearTimeout(this._scrollEndTimer)
  }

  _onMomentumScrollEnd = () => {
    const toValue =
      this._scrollValue > HEADER_MIN_HEIGHT &&
      this._clampedScrollValue > HEADER_MIN_HEIGHT / 2
        ? this._offsetValue + HEADER_MIN_HEIGHT
        : this._offsetValue - HEADER_MIN_HEIGHT

    Animated.timing(this.state.offsetAnimate, {
      toValue,
      duration: 350,
      useNativeDriver: true,
    }).start()
  }

  render() {
    const {
      list,
      listCate,
      showBanner,
      isFetching,
      postFinish,
      onViewPost,
      selectedLayout,
    } = this.props

    const { clampedScroll } = this.state

    const navbarTranslate = clampedScroll.interpolate({
      inputRange: [0, HEADER_MIN_HEIGHT],
      outputRange: [0, -HEADER_MIN_HEIGHT],
      extrapolate: 'clamp',
    })
    const navbarOpacity = clampedScroll.interpolate({
      inputRange: [0, HEADER_MIN_HEIGHT],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    })

    const headerTransform = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE - 100, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 0, 100],
      extrapolate: 'clamp',
    })

    const animateOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0],
      extrapolate: 'clamp',
    })

    const titleTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -50, -100],
      extrapolate: 'clamp',
    })

    const renderHeader = () => (
      <View>
        {showBanner && (
          <CategoryBanner
            onViewPost={onViewPost}
            animateOpacity={animateOpacity}
            headerTransform={headerTransform}
            animate={titleTranslate}
          />
        )}
        {showBanner && <HeaderFilter />}
      </View>
    )

    const renderFooter = () => {
      if (isFetching) return <Spinkit />
      return (
        !postFinish && (
          <View style={styles.more}>
            <FlatButton
              name="arrow-down"
              text={isFetching ? 'LOADING...' : 'MORE'}
              load={this.nextPosts}
            />
          </View>
        )
      )
    }

    return (
      <View style={{ flex: 1 }}>
        <AnimatedListView
          contentContainerStyle={styles.flatlist}
          data={list}
          keyExtractor={(item, index) => `${index}`}
          // stickySectionHeadersEnabled
          // stickyHeaderIndices={[0]}
          renderItem={this.renderItem}
          scrollEventThrottle={1}
          numColumns={2}
          onMomentumScrollBegin={this._onMomentumScrollBegin}
          onMomentumScrollEnd={this._onMomentumScrollEnd}
          onScrollEndDrag={this._onScrollEndDrag}
          ListHeaderComponent={renderHeader()}
          ListFooterComponent={renderFooter()}
          onEndReachedThreshold={Constants.Window.height * 10 / 100}
          onEndReached={this.isNextPost && this.nextPosts}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: true }
          )}
        />

        {showBanner && (
          <Animated.View
            style={[
              styles.navbar,
              { transform: [{ translateY: navbarTranslate }] },
            ]}
          >
            <Animated.View style={{ opacity: navbarOpacity }}>
              <Toolbar />
            </Animated.View>
          </Animated.View>
        )}
      </View>
    )
  }
}

const mapStateToProps = ({ posts, categories }, ownProps) => {
  return {
    list: posts.list,
    listCate: categories.list,
    postFinish: posts.postFinish,
    isFetching: posts.isFetching,
    selectedCategory: categories.selectedCategory,
    layout: posts.layout,
    parentLayout: ownProps.layout,
  }
}
export default connect(mapStateToProps, { fetchPostsByTerm, setActiveLayout })(
  CategoryList
)
