import React, { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { setLocalNotification, clearLocalNotification } from "../utils/helpers";

export function Result(props) {
    useEffect(() => {
        clearLocalNotification().then(setLocalNotification);
    }, []);
    const { goBackToDeck, correct, totalCount, handleRestart, SubmitBtn } = props;

    return (
        <View>
            <Text>You have scored</Text>
            <Text>
                {correct} out of {totalCount}
            </Text>
            <SubmitBtn text="Restart Quiz" onPress={handleRestart} />
            <SubmitBtn text="Back to Deck" onPress={goBackToDeck} />
        </View>
    );
}

export default Result;
