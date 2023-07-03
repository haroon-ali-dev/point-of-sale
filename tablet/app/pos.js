import { useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import NavBar from "../components/NavBar";
import AuthOnly from "../components/AuthOnly";

export default function PointOfSale() {
    return (
        <AuthOnly><PointOfSaleContent /></AuthOnly>
    );
}

function PointOfSaleContent() {
    const [productId, setProductId] = useState("");

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

    const addProduct = async () => {
        try {
            const token = await AsyncStorage.getItem('token');

            const res = await fetch(`http://192.168.8.101:3000/api/products/product-id/${productId}`, {
                headers: { "x-auth-token": token }
            });

            const data = await res.json();

            console.log(data);
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <>
            <NavBar />
            <View style={styles.container}>
                <View style={styles.containerAddProduct}>
                    <TextInput
                        style={styles.input}
                        placeholder="Product ID"
                        value={productId}
                        onChangeText={setProductId}
                    />
                    <Pressable style={styles.btn} onPress={addProduct}>
                        <Text style={styles.btnText}>Add</Text>
                    </Pressable>
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
        flexDirection: 'row',
        gap: 10,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        fontSize: 18,
        borderWidth: 1,
        width: 300,
        height: 50,
        padding: 10
    },
    btn: {
        backgroundColor: 'black',
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    btnText: {
        color: 'white',
        fontSize: 18
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