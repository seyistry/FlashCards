import React, { Component, useState } from "react";
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
import {addCard} from '../actions/'

const AddCard = (props) => {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const {title} = props.route.params
    // const { dispatch } = this.props;
    const handleSubmit = () => {
        // console.log(title)
        props.dispatch(addCard(title, [{question, answer}]));
        props.navigation.navigate("Deck", {
            title: title,
        })
    };

    return (
        <SafeAreaView>
            <TextInput
                style={styles.input}
                placeholder="Question"
                onChangeText={(text) => setQuestion(text)}
                // value={question}
            />
            <TextInput
                style={styles.input}
                placeholder="Answer"
                onChangeText={(text) => setAnswer(text)}
                // value={answer}
            />
            <Button
                title="Add Card"
                disabled = {answer === "" || question === ""}
                onPress={() => handleSubmit()}
            />
        </SafeAreaView>
    );
};


// export class AddCards extends Component {
//     State = {
//         question: "yii",
//         answer: "",
//         toHome: false,
//     };

//     onChangeQuestion = (text) => {
//         console.log(`Text Value: ${text}`);
//         this.setState(() => ({
//             question: text,
//         }));
//     };

//     onChangeAnswer = (text) => {
//         this.setState(() => ({
//             answer: text,
//         }));
//     };

    

//     render() {
//         const { title } = this.props.route.params;
//         const { toHome, question, answer } = this.State;
//         console.log(`question Value: ${question}`);

//         // if (toHome === true) {
//         //     return <Redirect to="/" />;
//         // }

//         return (
//             <SafeAreaView>
//                 <TextInput
//                     style={styles.input}
//                     placeholder="Question"
//                     onChangeText={this.onChangeQuestion}
//                     // value={question}
//                 />
//                 <TextInput
//                     style={styles.input}
//                     placeholder="Answer"
//                     onChange={this.onChangeAnswer}
//                     // value={answer}
//                 />
//                 <Button
//                     title="Submit"
//                     disabled //={answer === "" || question === ""}
//                     onPress={() => Alert.alert("Cannot press this one")}
//                 />
//             </SafeAreaView>
//         );
//     }
// }

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
    },
});

export default connect()(AddCard);
