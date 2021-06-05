import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import PagerView from "react-native-pager-view";

export class Quiz extends Component {
    render() {
        return (
            <PagerView style={styles.pagerView} initialPage={0}>
                <View key="1">
                    <Text>First page</Text>
                </View>
                <View key="2">
                    <Text>Second page</Text>
                </View>
            </PagerView>
        );
    }
}

const styles = StyleSheet.create({
    pagerView: {
        flex: 1,
    },
});

function mapStateToProps(decks) {
    return {
        decks,
    };
}

export default connect(mapStateToProps)(Quiz);
