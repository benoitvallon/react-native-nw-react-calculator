'use strict';

import React, {
  Component,
  StyleSheet,
  Text
} from 'react-native';

export default class ScreenRender extends Component {
  Render () {
    return (
      <Text style={styles.screen}>
        {state.displayScreen}
      </Text>
    );
  }
}

var styles = StyleSheet.create({
  screen: {
    color: '#190d08',
    fontSize: 70,
    fontWeight: '200'
  }
});
