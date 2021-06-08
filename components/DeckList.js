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
import { gray, blue, yellow, orange } from "../utils/colors";

export class DeckList extends Component {
    componentDidMount() {
        this.props.handleInitialData();
    }
    render() {
        const data = this.props.decks;
        return (
            <ScrollView
                style={{
                    backgroundColor: gray,
                }}
            >
                <Text
                    style={{
                        fontSize: 24,
                        textAlign: "center",
                        marginVertical: 20,
                        color: blue,
                        fontWeight: "bold"
                    }}
                >
                    MASTER YOUR CARDS
                </Text>
                {Object.keys(data).map((title) => (
                    <TouchableOpacity
                        key={title}
                        onPress={() =>
                            this.props.navigation.navigate("Deck", {
                                title: title,
                                questions: data[title].questions.length,
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
