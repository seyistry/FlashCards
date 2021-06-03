import AsyncStorage from "@react-native-async-storage/async-storage";

export const FLASHCARDS_STORAGE_KEY = "FlashCards:Udacity";

const data = {
    React: {
        title: "React",
        questions: [
            {
                question: "What is React?",
                answer: "A library for managing user interfaces",
            },
            {
                question: "Where do you make Ajax requests in React?",
                answer: "The componentDidMount lifecycle event",
            },
        ],
    },
    JavaScript: {
        title: "JavaScript",
        questions: [
            {
                question: "What is a closure?",
                answer: "The combination of a function and the lexical environment within which that function was declared.",
            },
        ],
    },
};

export async function getDeck() {
    try {
        const stored_data = await AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY);

        if (stored_data === null) {
            AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(data));
        }

        return stored_data === null ? data : JSON.parse(stored_data);
    } catch (e) {
        console.log(e);
    }
}

export const saveDeckTitle = (title) => {
    try {
        AsyncStorage.mergeItem(
            FLASHCARDS_STORAGE_KEY,
            JSON.stringify({
                [title]: {
                    title: title,
                    questions: [],
                },
            })
        );
    } catch (e) {
        console.log(e);
    }
};

export async function removeDeck(key) {
    try {
        const results = await AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY);
        const decks = JSON.parse(results);
        decks[key] = undefined;
        delete decks[key];
        AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(decks));
    } catch (e) {
        console.log(e);
    }
}

export async function addCardToDeck(title, card) {
    try {
        const deck = await getDeck(title);
        await AsyncStorage.mergeItem(
            FLASHCARDS_STORAGE_KEY,
            JSON.stringify({
                [title]: {
                    questions: [...deck.questions].concat(card),
                },
            })
        );
    } catch (e) {
        console.log(e);
    }
}
