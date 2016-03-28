/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  ListView,
  RefreshControl,
  ScrollView,
  ART,
  Dimensions,
  PanResponder,
  Animated
} from 'react-native';
import {Motion, spring} from 'react-motion';


const screen = Dimensions.get('window');
const Surface = Animated.createAnimatedComponent(ART.Surface);
const Shape = Animated.createAnimatedComponent(ART.Shape);
const Path = ART.Path;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    refreshControl: {
        flex: 1,
        backgroundColor: '#d0d0d0',
        height: screen.height,
    },
});

var makeRectanglePath = function(w, h, left, top) {
    const leftPercent =  1.0 - left / w;
    return new Path()
        .moveTo(0, 0)
        .line(w, 0)
        .line(0, h)
        .curve(
            -w * 0.05, 0,
            -w * leftPercent, top,
            -w, 0
        )
        .close();
};

class MyRefreshControl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            left: 200,
            top: 0,
        };

        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: () => true,
            onPanResponderMove: (e, gestureState) => {
                this.setState({
                  left: gestureState.moveX,
                  top: gestureState.moveY
                })
            },
            onPanResponderRelease: () => {
                this.setState({
                  left: spring(screen.width / 2),
                  top: spring(0)
                });
            }
        });
    }

  render() {
      return (
          <View
              {...this._panResponder.panHandlers}
              style={styles.refreshControl}>
              <Motion style={{left: this.state.left, top: this.state.top}}>{
                ({left, top}) =>
                  <Surface
                      width={screen.width}
                      height={screen.height}>
                      <Shape
                          d={makeRectanglePath(screen.width, 0, left, top)}
                          height={400}
                          fill="#b0b0b0"
                      />
                  </Surface>
              }
              </Motion>
          </View>
      );
  }
}

class App extends Component {
  render() {
    return (
        <View>
            <MyRefreshControl />
        </View>
    );
  }
}


AppRegistry.registerComponent('refreshcontrol', () => App);
