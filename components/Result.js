import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { blue, orange } from "../utils/colors";
import { setLocalNotification, clearLocalNotification } from "../utils/helpers";

export function Result(props) {
    useEffect(() => {
        clearLocalNotification().then(setLocalNotification);
    }, []);
    const { goBackToDeck, correct, totalCount, handleRestart, SubmitBtn } =
        props;
    const percentage = Math.round((correct / totalCount) * 100);
    return (
        <View>
            <Text style={{ fontSize: 25, textAlign: "center", marginTop: 40 }}>
                You have scored
            </Text>
            {/* <Text style={{ textAlign: "center" }}>
                {correct} out of {totalCount}
            </Text> */}
            <View
                style={{
                    height: 250,
                    justifyContent: "center",
                    alignItems: "center",
                    color: blue,
                }}
            >
                <Text
                    style={{
                        fontSize: 85,
                        textAlign: "center",
                        color: orange,
                    }}
                >
                    {percentage}%
                </Text>
            </View>

            <SubmitBtn text="Restart Quiz" onPress={handleRestart} />
            <SubmitBtn text="Back to Deck" onPress={goBackToDeck} />
        </View>
    );
}

export default Result;
