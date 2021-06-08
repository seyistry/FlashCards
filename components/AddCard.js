import React, { useState } from "react";
import { connect } from "react-redux";
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    StyleSheet,
    TextInput,
    Button,
    Alert,
} from "react-native";
import { addCard } from "../actions/";
import { addCardToDeck } from "../utils/api";
import { blue, gray, white } from "../utils/colors";

const AddCard = (props) => {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const { title, questions } = props.route.params;
    // const { dispatch } = this.props;
    const handleSubmit = () => {
        // console.log(title)
        props.dispatch(addCard(title, { question, answer }));
        addCardToDeck(title, { question, answer });
        props.navigation.navigate("Deck", {
            title: title,
            questions: questions + 1,
        });
    };

    return (
        <SafeAreaView
            style={{
                flex: 1,
                // justifyContent: "space-between",
                backgroundColor: gray,
            }}
        >
            <TextInput
                style={styles.input}
                placeholder="   Question"
                onChangeText={(text) => setQuestion(text)}
                // value={question}
            />
            <TextInput
                style={styles.input}
                placeholder="   Answer"
                onChangeText={(text) => setAnswer(text)}
                // value={answer}
            />
            <TouchableOpacity
                onPress={() => handleSubmit()}
                style={styles.button}
                disabled={answer === "" || question === ""}
            >
                <Text style={{ color: white, fontSize: 18 }}>Submit</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    input: {
        height: 50,
        margin: 12,
        borderBottomWidth: 1,
    },
    button: {
        backgroundColor: blue,
        marginTop: 30,
        marginHorizontal: "20%",
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: Platform.OS === "ios" ? 16 : 2,
    },
});

export default connect()(AddCard);
