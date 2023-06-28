import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import NavBar from "../components/NavBar";
import AuthOnly from "../components/AuthOnly";

export default function PointOfSale() {
    return (
        <AuthOnly><PointOfSaleContent /></AuthOnly>
    );
}

function PointOfSaleContent() {
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
        <>
            <NavBar />
            <View style={styles.container}>
                <Text style={{ fontSize: 30 }}>POS Page</Text>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});