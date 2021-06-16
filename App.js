import React, { useEffect } from "react";
import { View, Platform, Text, StatusBar, SafeAreaView } from "react-native";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import thunk from "redux-thunk";
import logger from "./middleware/logger";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { blue, orange } from "./utils/colors";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import { createStackNavigator } from "@react-navigation/stack";
import DeckList from "./components/DeckList";
import AddDeck from "./components/AddDeck";
import Deck from "./components/Deck";
import AddCard from "./components/AddCard";
import Quiz from "./components/Quiz";
import { setLocalNotification } from "./utils/helpers";
import Result from "./components/Result";

function FlashCardStatusBar({ backgroundColor, ...props }) {
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
                activeTintColor: orange,
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
                        headerStyle: { backgroundColor: blue },
                    }}
                />
                <Stack.Screen
                    name="Add Card"
                    component={AddCard}
                    options={{
                        headerTintColor: "white",
                        headerStyle: { backgroundColor: blue },
                    }}
                />
                <Stack.Screen
                    name="Quiz"
                    component={Quiz}
                    options={{
                        headerTintColor: "white",
                        headerStyle: { backgroundColor: blue },
                    }}
                />
                <Stack.Screen
                    name="Result"
                    component={Result}
                    options={{
                        headerTintColor: "white",
                        headerStyle: { backgroundColor: blue },
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default function App() {
    useEffect(() => {
        setLocalNotification();
    }, []);
    return (
        <Provider store={store}>
            <FlashCardStatusBar backgroundColor={orange} style="light" />
            <MainNavigator />
        </Provider>
    );
}
