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
import { blue, gray, white } from "../utils/colors";

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
        <View styles={styles.container}>
            <Text style={styles.title}>
                What is the title of your new deck?
            </Text>
            <TextInput
                style={styles.input}
                onChangeText={(text) => setValue(text)}
                value={value}
                autoCapitalize="words"
                placeholder="Deck Title"
                clearButtonMode="always"
            />
            <TouchableOpacity
                disabled={value === ""}
                onPress={createDeck}
                style={styles.buttonContainer}
            >
                <Text style={styles.button}>Submit</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: gray,
    },
    title: {
        fontSize: 28,
        textAlign: "center",
        marginTop: 40,
        marginHorizontal: 20,
        color: blue,
    },
    input: {
        marginTop: 30,
        marginHorizontal: 12,
        borderBottomWidth: 1,
    },
    buttonContainer: {
        marginTop: 30,
        height: 40,
        marginHorizontal: "20%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: Platform.OS === "ios" ? 16 : 2,
        backgroundColor: blue,
    },
    button: {
        fontSize: 16,
        color: white,
    },
});

function mapStateToProps(state) {
    return {
        decks: state,
    };
}

export default connect(mapStateToProps, { addDeck })(AddDeck);
