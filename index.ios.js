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

const screen = Dimensions.get('window');
const Shape = ART.Shape;
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

var makeRectanglePath = function(x, y, w, h, left, top) {
    const leftPercent =  1.0 - left / w;
    return new Path()
        .moveTo(x, y)
        .line(w, 0)
        .line(0, h)
        .curve(
            -w * 0.05, 0,
            -w * leftPercent, top,
            -w, 0
        )
        .close();
};

//class Refresh extends Component {
//
//    render() {
//        //var { pan, width, height, ...props} = this.props;
//        //var { top, left } = pan.getLayout();
//        //console.log('render', pan.getLayout());
//
//        return (
//            <Shape
//                d={path}
//                {...props} />
//        );
//    }
//}


class MyRefreshControl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pan: new Animated.ValueXY({ x: 200, y: 0 }),
            //bla: {
            //    x: 200,
            //    y: 0,
            //},
        };

        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: () => true,
            onPanResponderMove: (e, gestureState) => {
                console.log('move', gestureState.moveX, gestureState.moveY);
                //this.state.pan.x.setValue(gestureState.moveX);
                //this.state.pan.y.setValue(gestureState.moveY);
                this.state.pan.setValue({ x: gestureState.moveX, y: gestureState.moveY });
                this.setState({ bla: {
                    x: gestureState.moveX,
                    y: gestureState.moveY,
                }});
            },

            onPanResponderTerminate: () => {
                console.log('terminate');
            },
            onPanResponderRelease: () => {
                console.log('end');
                Animated.spring(
                    this.state.pan,
                    { toValue: { x: 0, y: 0 } }
                ).start();
            }
        });
    }

  render() {
      console.log('render', this.state.pan.x.__getValue(), this.state.pan.y.__getValue());

      var path = makeRectanglePath(
          0,
          0,
          screen.width,
          0,
          this.state.pan.x.__getValue() || 0,
          this.state.pan.y.__getValue() || 0
      );
      return (
          <Animated.View
              {...this._panResponder.panHandlers}
              style={styles.refreshControl}>
              <ART.Surface
                  width={screen.width}
                  height={screen.height}>
                  <Shape
                      d={path}
                      height={400}
                      fill="#b0b0b0"
                  />
              </ART.Surface>
          </Animated.View>
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
