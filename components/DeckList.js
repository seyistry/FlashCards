import React, { Component } from "react";
import {
    ScrollView,
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/index";
import DeckStats from "./DeckStats";

export class DeckList extends Component {
    componentDidMount() {
        this.props.handleInitialData();
    }
    render() {
        const data = this.props.decks;
        return (
            <ScrollView>
                {Object.keys(data).map((title) => (
                    <TouchableOpacity
                        key={title}
                        onPress={() =>
                            this.props.navigation.navigate("Deck", {
                                title: title,
                                questions: data[title].questions,
                            })
                        }
                    >
                        <DeckStats
                            title={title}
                            questions={data[title].questions}
                        />
                    </TouchableOpacity>
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
