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

function SubmitBtn({ text, onPress }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <Text>{text}</Text>
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
        <View>
            {isEmpty ? (
                <View>
                    <Text>
                        Sorry! You can't start quiz before adding cards to the
                        deck.
                    </Text>
                </View>
            ) : (
                <View>
                    {index < totalCount ? (
                        showAnswer ? (
                            <View>
                                <Text>
                                    [{index + 1}/{totalCount}]
                                </Text>
                                <Text>Answer : {questions[index].answer}</Text>
                                <Button
                                    title="Show Question"
                                    color="#7daed3"
                                    onPress={handleShowAnswer}
                                >
                                    Show Question
                                </Button>
                                <SubmitBtn
                                    text="Correct"
                                    onPress={() => handleAnswer("correct")}
                                />
                                <SubmitBtn
                                    text="Incorrect"
                                    onPress={() => handleAnswer("incorrect")}
                                />
                            </View>
                        ) : (
                            <View>
                                <Text>
                                    [{index + 1}/{totalCount}]
                                </Text>
                                <Text>{questions[index].question}</Text>
                                <Button
                                    title="Show Answer"
                                    color="#7daed3"
                                    onPress={handleShowAnswer}
                                >
                                    Show Answer
                                </Button>
                                <SubmitBtn
                                    text="Correct"
                                    onPress={() => handleAnswer("correct")}
                                />
                                <SubmitBtn
                                    text="Incorrect"
                                    onPress={() => handleAnswer("incorrect")}
                                />
                            </View>
                        )
                    ) : (
                        <View>
                            <Text>You have scored</Text>
                            <Text>
                                {correct} out of {totalCount}
                            </Text>
                            <SubmitBtn
                                text="Restart Quiz"
                                onPress={handleRestart}
                            />
                            <SubmitBtn
                                text="Back to Deck"
                                onPress={goBackToDeck}
                            />
                        </View>
                    )}
                </View>
            )}
        </View>
    );
};

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
