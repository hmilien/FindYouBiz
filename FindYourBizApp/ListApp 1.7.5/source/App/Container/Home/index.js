/** @format */

import React, { PureComponent } from 'react'
import { Constants } from '@common'
import { PostList, Mansory } from '@components'
import { connect } from 'react-redux'
import { fetchAllCountries, fetchCategories } from '@redux/actions'
import Horizontal from './Horizontal'

const mapStateToProps = ({ config }) => {
  return {
    layout: config.homeLayout,
  }
}

class Home extends PureComponent {
  render() {
    const {
      layout,
      onShowAll,
      onViewPost,
      onViewCategory,
      onViewSearch,
    } = this.props
    switch (layout) {
      case Constants.HomeLayout.horizontal: // 1
        return (
          <Horizontal
            onViewPost={onViewPost}
            onShowAll={onShowAll}
            onViewSearch={onViewSearch}
            onViewCategory={onViewCategory}
          />
        )
      case Constants.HomeLayout.mansory: // 3
        return <Mansory onViewPost={onViewPost} />
      default:
        // default is 2
        return <PostList horizontal={false} onViewPost={onViewPost} />
    }
  }
}

export default connect(
  mapStateToProps,
  { fetchAllCountries, fetchCategories }
)(Home)
