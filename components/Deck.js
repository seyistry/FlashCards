import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text, TouchableOpacity } from "react-native";
import { deleteDeck } from "../actions";

export class Deck extends Component {
    setTitle = (title) => {
        if (!title) return;

        this.props.navigation.setOptions({
            title: title,
        });
    };

    removeDeck = (title) => {
        this.props.dispatch(deleteDeck(title));
        this.props.navigation.navigate("Home");
    };

    componentDidMount() {
        const { title, questions } = this.props.route.params;
        this.setTitle(title);
        console.log(questions);
    }

    render() {
        const { title, questions } = this.props.route.params;
        const deckLength = questions;
        console.log(deckLength);
        return (
            <View>
                <Text>{title}</Text>
                <Text>{`${deckLength} Card`}</Text>
                <TouchableOpacity
                    onPress={() =>
                        this.props.navigation.navigate("Add Card", {
                            title: title,
                            questions,
                        })
                    }
                >
                    <Text>Add Card</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() =>
                        this.props.navigation.navigate("Quiz", {
                            title: title,
                        })
                    }
                >
                    <Text>Start Quiz</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.removeDeck(title)}>
                    <Text>Delete Deck</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default connect()(Deck);
