import React from "react";
import { View, Platform, Text, StatusBar, SafeAreaView } from "react-native";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reducer from "../reducers";
import thunk from "redux-thunk";
import logger from "../middleware/logger";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { purple, white, lightPurp } from "../utils/colors";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import { createStackNavigator } from "@react-navigation/stack";
import DeckList from './DeckList'
import AddDeck from './AddDeck'
import Deck from './Deck'

function FlashCardStatusBar ({ backgroundColor, ...props }) {
    return (
        <SafeAreaView
            style={{ backgroundColor, height: Constants.statusBarHeight }}
        >
            <StatusBar
                translucent
                backgroundColor={backgroundColor}
                {...props}
            />
        </SafeAreaView>
    );
}

const Tab = createBottomTabNavigator();

function Tabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    if (route.name === "Decks") {
                        return (
                            <Ionicons
                                name={
                                    focused ? "ios-bookmarks" : "ios-bookmarks"
                                }
                                size={size}
                                color={color}
                            />
                        );
                    } else if (route.name === "Add Deck") {
                        return (
                            <FontAwesome
                                name={"plus-square"}
                                size={size}
                                color={color}
                            />
                        );
                    }
                },
            })}
            tabBarOptions={{
                activeTintColor: lightPurp,
                inactiveTintColor: "gray",
            }}
        >
            <Tab.Screen name="Decks" component={DeckList} />
            <Tab.Screen name="Add Deck" component={AddDeck} />
        </Tab.Navigator>
    );
}

const Stack = createStackNavigator();

function MainNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={Tabs}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Deck"
                    component={Deck}
                    options={{
                        headerTintColor: "white",
                        headerStyle: { backgroundColor: purple },
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const store = createStore(reducer, applyMiddleware(thunk, logger)); 

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <FlashCardStatusBar backgroundColor={purple} style="light" />
                <MainNavigator />
            </Provider>
        );
    }
}