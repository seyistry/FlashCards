import React, { Component } from "react";
import { connect } from "react-redux";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Platform,
} from "react-native";
import { deleteDeck } from "../actions";
import { removeDeck } from "../utils/api";
import { blue, gray, orange, red } from "../utils/colors";

export class Deck extends Component {
    setTitle = (title) => {
        if (!title) return;

        this.props.navigation.setOptions({
            title: title,
        });
    };

    removeDeck = (title) => {
        this.props.dispatch(deleteDeck(title));
        removeDeck(title);
        this.props.navigation.navigate("Home");
    };

    componentDidMount() {
        const { title, questions } = this.props.route.params;
        this.setTitle(title);
        // console.log(questions);
    }

    render() {
        const { title, questions } = this.props.route.params;
        const deckLength = questions;
        // console.log(deckLength);
        return (
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.titleBase}>{`${deckLength} Card`}</Text>
                </View>
                <View>
                    <TouchableOpacity
                        onPress={() =>
                            this.props.navigation.navigate("Add Card", {
                                title: title,
                                questions,
                            })
                        }
                        style={[styles.button, { backgroundColor: orange }]}
                    >
                        <Text
                            style={{
                                textAlign: "center",
                                fontSize: 18,
                                color: "white",
                            }}
                        >
                            Add Card
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() =>
                            this.props.navigation.navigate("Quiz", {
                                title: title,
                            })
                        }
                        style={[styles.button, { backgroundColor: blue }]}
                    >
                        <Text
                            style={{
                                textAlign: "center",
                                fontSize: 18,
                                color: "white",
                            }}
                        >
                            Start Quiz
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.removeDeck(title)}>
                        <Text
                            style={{
                                textAlign: "center",
                                fontSize: 18,
                                marginTop: 20,
                                color: red,
                            }}
                        >
                            Delete Deck
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-evenly",
        backgroundColor: gray,
    },
    titleContainer: {
        // alignItems: "center",
        // marginTop: 60,
        // height: 60,
        // width: 200,
        // borderWidth: 1,
    },
    title: {
        fontSize: 40,
        textAlign: "center",
        color: blue,
        textTransform: "uppercase",
    },
    titleBase: {
        fontSize: 18,
        textAlign: "center",
        color: blue,
    },
    button: {
        marginHorizontal: "20%",
        height: 48,
        justifyContent: "center",
        borderRadius: Platform.OS === "ios" ? 16 : 2,
        marginTop: 30,
    },
});

export default connect()(Deck);
