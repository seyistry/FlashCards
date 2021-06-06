import React, { useState } from "react";
import { connect } from "react-redux";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { addDeck } from "../actions/index";
import { saveDeckTitle } from "../utils/api";

export const AddDeck = (props) => {
    const [value, setValue] = useState("");
    const navigation = useNavigation();

    const createDeck = () => {
        props.addDeck(value);
        saveDeckTitle(value);
        navigation.navigate("Deck", {
            title: value,
            questions: 0,
        });
        setValue("");
    };
    return (
        <View>
            <View>
                <Text>What is the title of your new deck?</Text>
            </View>

            <View>
                <TextInput
                    onChangeText={(text) => setValue(text)}
                    value={value}
                    autoCapitalize="words"
                    placeholder="Deck Title"
                    clearButtonMode="always"
                />
            </View>
            <View>
                <TouchableOpacity onPress={createDeck}>
                    <Text>Create Deck</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

function mapStateToProps(state) {
    return {
        decks: state,
    };
}

export default connect(mapStateToProps, { addDeck })(AddDeck);
