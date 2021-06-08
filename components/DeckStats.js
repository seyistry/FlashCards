import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { orange, gray, blue, green, yellow, white } from "../utils/colors";

export class DeckStats extends Component {
    render() {
        const { title, questions } = this.props;
        return (
            <View style={[styles.container, { backgroundColor: blue }]}>
                <View style={{ justifyContent: "flex-end" }}>
                    <Text style={styles.textTitle}>{title}</Text>
                    <Text style={styles.textBase}>{questions.length} Card</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 150,
        justifyContent: "center",
        borderBottomWidth: 2,
        borderColor: orange,
        borderRadius: Platform.OS === "ios" ? 16 : 2,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
    },
    textTitle: {
        fontSize: 30,
        textAlign: "center",
        color: white,
    },
    textBase: {
        fontSize: 18,
        color: yellow,
        textAlign: "center",
    },
});

export default DeckStats;
