import React, { Component } from "react";
import { View, Text, StyleSheet, Platform, Animated } from "react-native";
import { orange, gray, blue, green, yellow, white } from "../utils/colors";

export class DeckStats extends Component {
    state = {
        opacity: new Animated.Value(0),
        setHeight: new Animated.Value(0),
        width: new Animated.Value(0),
    };

    componentDidMount() {
        const { opacity, setHeight } = this.state;
        Animated.timing(opacity, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
        Animated.spring(setHeight, {
            toValue: 1,
            speed: 9,
            useNativeDriver: true,
        }).start();
    }
    render() {
        const { title, questions } = this.props;
        const { opacity, setHeight } = this.state;
        return (
            <Animated.View
                style={[
                    styles.container,
                    { backgroundColor: blue, opacity, transform:  [{ scale: setHeight }] },
                ]}
            >
                <View style={{ justifyContent: "flex-end" }}>
                    <Text style={styles.textTitle}>{title}</Text>
                    <Text style={styles.textBase}>{questions.length} Card</Text>
                </View>
            </Animated.View>
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
