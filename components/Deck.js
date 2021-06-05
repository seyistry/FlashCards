import React, { Component } from 'react'
import { View, Text } from "react-native";

export class Deck extends Component {
    
    setTitle = (DeckId) => {
        if (!DeckId) return;

        this.props.navigation.setOptions({
            title: DeckId,
        });
    };

    componentDidMount (){
        const { DeckId } = this.props.route.params;
        this.setTitle(DeckId);
    }

    render() {
        return (
            <View>
                <Text>Deckers</Text>
            </View>
        )
    }
}

export default Deck
