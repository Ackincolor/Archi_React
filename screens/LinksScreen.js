import * as React from 'react';
import { Text, View, StyleSheet, Animated } from 'react-native';
import { Constants } from 'expo';


export default class LinkScreen extends React.Component {
  state = {
    value: new Animated.Value(0),
  }
  componentDidMount(){
    Animated.timing(this.state.value, {toValue :1, duration : 500}).start();
  }
  render() {
    const scale = this.state.value;
    return (
      <View style={styles.container}>
      <Animated.View style={{transform : [{scale}]}}>
        <Text style={styles.paragraph}>
          Hello World !! Nassim
        </Text>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});