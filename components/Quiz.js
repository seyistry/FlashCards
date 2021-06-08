import React, { useState } from "react";
import {
    View,
    Platform,
    TouchableOpacity,
    Text,
    StyleSheet,
    Button,
} from "react-native";
import { connect } from "react-redux";
import { blue, gray, green, orange, white } from "../utils/colors";
import Result from "./Result";

function SubmitBtn({ text, onPress }) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.buttonContainer, {backgroundColor: blue}]}
        >
            <Text style={styles.button}>{text}</Text>
        </TouchableOpacity>
    );
}

const Quiz = (props) => {
    const [index, setIndex] = useState(0);
    const [correct, setCorrect] = useState(0);
    const [showAnswer, setShowAnwser] = useState(false);
    const { questions } = props;
    const totalCount = questions.length;
    const isEmpty = totalCount === 0 ? true : false;

    handleAnswer = (text) => {
        setIndex(index + 1);
        setCorrect(text === "correct" ? correct + 1 : correct);
        setShowAnwser(false);
    };

    goBackToDeck = () => {
        props.goBack();
    };

    handleShowAnswer = () => {
        setShowAnwser(!showAnswer);
    };

    handleRestart = () => {
        setIndex(0);
        setCorrect(0);
        setShowAnwser(false);
    };

    return (
        <View style={styles.container}>
            {isEmpty ? (
                <View
                    style={{
                        justifyContent: "center",
                    }}
                >
                    <Text style={styles.empty}>
                        Sorry! You can't start quiz before adding cards to the
                        deck.
                    </Text>
                </View>
            ) : (
                <View style={styles.container}>
                    {index < totalCount ? (
                        showAnswer ? (
                            <View style={styles.container}>
                                <Text style={styles.top}>
                                    [{index + 1}/{totalCount}]
                                </Text>
                                <View style={styles.subContainer}>
                                    <Text style={styles.quiz}>
                                        Answer : {questions[index].answer}
                                    </Text>
                                </View>
                                <TouchableOpacity
                                    title="Show Question"
                                    color="#7daed3"
                                    onPress={handleShowAnswer}
                                >
                                    <Text style={styles.toggle}>
                                        Show Question
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => handleAnswer("correct")}
                                    style={[styles.buttonContainer, {backgroundColor: blue}]}
                                >
                                    <Text style={styles.button}>Correct</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => handleAnswer("incorrect")}
                                    style={[styles.buttonContainer, {backgroundColor: orange}]}
                                >
                                    <Text style={styles.button}>Incorrect</Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <View style={styles.container}>
                                <Text style={styles.top}>
                                    [{index + 1}/{totalCount}]
                                </Text>
                                <View style={styles.subContainer}>
                                    <Text style={styles.quiz}>
                                        {questions[index].question}
                                    </Text>
                                </View>
                                <TouchableOpacity
                                    title="Show Answer"
                                    color="#7daed3"
                                    onPress={handleShowAnswer}
                                >
                                    <Text style={styles.toggle}>
                                        Show Answer
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => handleAnswer("correct")}
                                    style={[styles.buttonContainer, {backgroundColor: blue}]}
                                >
                                    <Text style={styles.button}>Correct</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => handleAnswer("incorrect")}
                                    style={[styles.buttonContainer, {backgroundColor: orange}]}
                                >
                                    <Text style={styles.button}>Incorrect</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    ) : (
                        <Result
                            goBackToDeck={goBackToDeck}
                            correct={correct}
                            totalCount={totalCount}
                            handleRestart={handleRestart}
                            SubmitBtn={SubmitBtn}
                        />
                    )}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    top: {
        fontSize: 15,
    },
    container: {
        flex: 1,
        backgroundColor: gray,
    },
    subContainer: {
        height: 200,
        justifyContent: "center",
    },
    empty: {
        fontSize: 22,
        textAlign: "center",
        marginTop: 10,
    },
    quiz: {
        fontSize: 22,
        textAlign: "center",
        marginLeft: 20,
        marginRight: 20,
    },
    toggle: {
        textAlign: "center",
        fontSize: 16,
    },
    button: {
        width: 250,
        textAlign: "center",
        fontSize: 16,
        color: white,
    },
    buttonContainer: {
        height: 50,
        marginHorizontal: "20%",
        marginTop: 50,
        borderRadius: Platform.OS === "ios" ? 16 : 2,
        justifyContent:'center',
        alignItems:'center',
    },
});

function mapStateToProps(decks, { route }) {
    const { title } = route.params;
    return {
        questions: decks[title].questions,
    };
}

function mapDispatchToProps(dispatch, { navigation }) {
    return {
        goBack: () => navigation.goBack(),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
