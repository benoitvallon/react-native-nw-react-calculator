"use strict";

import React, { StyleSheet, Text, View } from "react-native";

export default function (props, state) {
  return (
    <View>
      <Text style={styles.screen}>{state.displayScreen}</Text>
      <Text style={styles.screen}>{state.displayNumber}</Text>
    </View>
  );
}

var styles = StyleSheet.create({
  screen: {
    color: "#190d08",
    fontSize: 70,
    fontWeight: "200",
  },
});
