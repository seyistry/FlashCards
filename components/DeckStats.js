import React, { Component } from "react";
import { View, Text } from "react-native";
import Deck from './Deck'

export class DeckStats extends Component {
    render() {
        const { title, questions } = this.props;
        return (
            <View>
                <Text>{title}</Text>
                <Text>{questions.length} Card</Text>
            </View>
        );
    }
}

export default DeckStats;
