import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function POS() {
    const readToken = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (token !== null) {
                console.log(token);
            }
        } catch (e) {
            console.log(e.message);
        }
    }

    readToken();

    return (
        <View style={styles.container}>
            <Text>POS Page</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});