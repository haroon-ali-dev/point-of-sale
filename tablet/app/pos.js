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
                <View style={styles.containerAddProduct}>

                </View>
                <View style={styles.containerRightPanel}>
                    <View style={styles.containerCart}>

                    </View>
                    <View style={styles.containerPayBtn}>

                    </View>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row'
    },
    containerAddProduct: {
        flex: 2,
        borderWidth: 1
    },
    containerRightPanel: {
        flex: 1,
        borderWidth: 1
    },
    containerCart: {
        flex: 3,
        borderWidth: 1
    },
    containerPayBtn: {
        flex: 1,
        borderWidth: 1
    }
});