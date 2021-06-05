import React, { Component } from "react";
import {connect} from 'react-redux'
import { View, Text, TouchableOpacity } from "react-native";

export class Deck extends Component {
    setTitle = (title) => {
        if (!title) return;

        this.props.navigation.setOptions({
            title: title,
        });
    };

    deleteDeck = () => {
        console.log("Deck Deleted");
    };

    componentDidMount() {
        const { title, questions } = this.props.route.params;
        this.setTitle(title);
        console.log(questions);
    }

    render() {
        const { title} = this.props.route.params;
        const { decks } = this.props;
        console.log(decks)
        return (
            <View>
                <Text>{title}</Text>
                <Text>{`${decks[title].questions.length} Card`}</Text>
                <TouchableOpacity
                    onPress={() =>
                        this.props.navigation.navigate("Add Card", {
                            title: title,
                        })
                    }
                >
                    <Text>Add Card</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() =>
                        this.props.navigation.navigate("Start Quiz", {
                            title: title,
                            questions: questions,
                        })
                    }
                >
                    <Text>Start Quiz</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.deleteDeck}>
                    <Text>Delete Deck</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

function mapStateToProps(decks) {
    return {
        decks,
    };
}

export default connect(mapStateToProps)(Deck);
