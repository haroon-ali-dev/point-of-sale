import { useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable, Alert, Keyboard, ScrollView, ActivityIndicator } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from "jwt-decode";

import NavBar from "../components/NavBar";
import AuthOnly from "../components/AuthOnly";
import Cart from "../components/Cart";
import PayModal from "../components/PayModal";

import config from "../config.json";

export default function PointOfSale() {
    return (
        <AuthOnly><PointOfSaleContent /></AuthOnly>
    );
}

function PointOfSaleContent() {
    const [productId, setProductId] = useState("");
    const [cart, setCart] = useState([]);
    const [showPayModal, setShowPayModal] = useState(false);
    const [reqInProcess, setReqInProcess] = useState(false);

    const host = __DEV__ ? config.localHost : "https://point-of-sale-tau.vercel.app";

    const addProduct = async () => {
        setReqInProcess(true);

        try {
            const token = await AsyncStorage.getItem('token');

            const res = await fetch(`${host}/api/products/product-id/${productId}`, {
                headers: { "x-auth-token": token }
            });

            const data = await res.json();

            if (res.status === 200) {
                const findProduct = cart.find(product => product.pId === data["p_id"]);

                if (findProduct) {
                    if (findProduct.quantity >= +data.quantity) {
                        Alert.alert("Error", "No more product quantity available.");
                    } else {
                        setCart(cart.map(product => product.pId === data["p_id"] ? { ...product, quantity: product.quantity + 1 } : product));
                    }
                } else {
                    setCart([...cart, {
                        pId: data["p_id"],
                        name: data.name,
                        price: +data.price,
                        quantity: 1
                    }]);
                }

                Keyboard.dismiss();

                setProductId("");
            } else {
                Alert.alert("Error", data.message);
            }
        } catch (error) {
            Alert.alert("Error", error.message);
        } finally {
            setReqInProcess(false);
        }
    }

    const deleteProduct = (pId) => {
        setCart(cart.filter(product => product.pId !== pId));
    }

    const total = () => {
        return cart.reduce((a, c) => a + (c.price * c.quantity), 0).toFixed(2);
    }

    const saveOrder = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const { uId } = jwt_decode(token);

            const res = await fetch(`${host}/api/orders`, {
                method: "POST",
                headers: { "Content-Type": "application/json", "x-auth-token": token },
                body: JSON.stringify({ uId, cart, total: +total() })
            });

            const data = await res.json();

            if (res.status === 200) {
                Alert.alert('Success', 'Order completed!');
                setCart([]);
            } else {
                Alert.alert("Error", data.message);
            }
        } catch (error) {
            Alert.alert("Error", error.message);
        }
    }

    return (
        <>
            <NavBar />

            <PayModal
                showPayModal={showPayModal}
                setShowPayModal={setShowPayModal}
                setCart={setCart}
                amount={total()}
                saveOrder={saveOrder}
                host={host}
            />

            <View style={styles.container}>
                <View style={styles.containerAddProduct}>
                    <TextInput
                        style={styles.input}
                        placeholder="Product ID"
                        value={productId}
                        onChangeText={setProductId}
                    />
                    <Pressable style={styles.btn} android_ripple={{ color: 'black' }} onPress={addProduct}>
                        {reqInProcess && (
                            <ActivityIndicator />
                        )}
                        {!reqInProcess && (
                            <Text style={styles.btnText}>Add</Text>
                        )}
                    </Pressable>
                </View>
                <View style={styles.containerRightPanel}>
                    <View style={styles.containerCart}>
                        <Cart cart={cart} deleteProduct={deleteProduct} />
                    </View>
                    <View style={styles.containerPayBtn}>
                        <ScrollView contentContainerStyle={styles.containerPayBtnScroll}>
                            <Text style={styles.total}>£{total()}</Text>
                            <Pressable
                                style={total() === "0.00" ? styles.payBtnDisabled : styles.payBtn}
                                onPress={() => setShowPayModal(true)}
                                disabled={total() === "0.00"}
                                android_ripple={{ color: 'black' }}
                            >
                                <Text style={styles.payBtnText}>Pay</Text>
                            </Pressable>
                        </ScrollView>
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
        borderRadius: 10,
        backgroundColor: '#198754',
        width: 100,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnText: {
        color: 'white',
        fontSize: 18
    },
    containerRightPanel: {
        flex: 1
    },
    containerCart: {
        flex: 3,
        borderWidth: 1
    },
    containerPayBtn: {
        flex: 1,
        borderWidth: 1,
    },
    containerPayBtnScroll: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10

    },
    total: {
        fontSize: 30
    },
    payBtn: {
        borderRadius: 10,
        backgroundColor: '#0d6efd',
        paddingHorizontal: 50,
        paddingVertical: 20
    },
    payBtnDisabled: {
        borderRadius: 10,
        backgroundColor: '#adb5bd',
        paddingHorizontal: 50,
        paddingVertical: 20
    },
    payBtnText: {
        fontSize: 25,
        color: 'white'
    }
});