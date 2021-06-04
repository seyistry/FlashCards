import React, { Component } from "react";
import { ScrollView, View, StyleSheet, Text } from "react-native";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/index";
import Decks from './Decks'

export class DeckList extends Component {
    componentDidMount () {
        this.props.handleInitialData();
    }
    render() {
        const data = this.props.decks;
        return (
            <ScrollView>
                {Object.keys(data).map((title) => (
                    <Decks title={title} key={title} questions={data[title].questions} />
                ))}
            </ScrollView>
        );
    }
}

function mapStateToProps(state) {
    return {
        decks: state,
    };
}

export default connect(mapStateToProps, { handleInitialData })(DeckList);
