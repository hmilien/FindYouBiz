/* @flow */

import PropTypes from 'prop-types';
import { Animated } from 'react-native';

export const NavigationRoutePropType = PropTypes.shape({
  title: PropTypes.string,
  key: PropTypes.string.isRequired,
});

export const NavigationStatePropType = PropTypes.shape({
  routes: PropTypes.arrayOf(NavigationRoutePropType).isRequired,
  index: PropTypes.number.isRequired,
});

export const SceneRendererPropType = {
  panX: PropTypes.object,
  offsetX: PropTypes.object,
  layout: PropTypes.shape({
    measured: PropTypes.bool,
    height: PropTypes.number,
    width: PropTypes.number,
  }).isRequired,
  navigationState: NavigationStatePropType.isRequired,
  position: PropTypes.object.isRequired,
  jumpTo: PropTypes.func.isRequired,
  useNativeDriver: PropTypes.bool,
};

export const PagerRendererPropType = {
  layout: PropTypes.shape({
    measured: PropTypes.bool,
    height: PropTypes.number,
    width: PropTypes.number,
  }).isRequired,
  navigationState: NavigationStatePropType.isRequired,
  panX: PropTypes.instanceOf(Animated.Value),
  offsetX: PropTypes.instanceOf(Animated.Value),
  canJumpToTab: PropTypes.func.isRequired,
  jumpTo: PropTypes.func.isRequired,
  animationEnabled: PropTypes.bool,
  swipeEnabled: PropTypes.bool,
  useNativeDriver: PropTypes.bool,
  onSwipeStart: PropTypes.func,
  onSwipeEnd: PropTypes.func,
  onAnimationEnd: PropTypes.func,
  children: PropTypes.node.isRequired,
};
