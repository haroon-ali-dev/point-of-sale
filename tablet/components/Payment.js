import { useState, useEffect } from 'react';
import { StripeProvider, useStripe } from '@stripe/stripe-react-native';
import { View, Pressable, Alert, StyleSheet, Text } from "react-native";

export default function Payment({ amount, setShowPayModal, saveOder, host }) {
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        initializePaymentSheet();
    }, []);

    const fetchPaymentSheetParams = async () => {
        const response = await fetch(`${host}/api/pay`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount })
        });
        const { paymentIntent, ephemeralKey, customer } = await response.json();

        return {
            paymentIntent,
            ephemeralKey,
            customer,
        };
    };

    const initializePaymentSheet = async () => {
        const {
            paymentIntent,
            ephemeralKey,
            customer,
            publishableKey,
        } = await fetchPaymentSheetParams();

        const { error } = await initPaymentSheet({
            merchantDisplayName: "Point of Sale",
            customerId: customer,
            customerEphemeralKeySecret: ephemeralKey,
            paymentIntentClientSecret: paymentIntent,
            allowsDelayedPaymentMethods: false
        });
        if (!error) {
            setLoading(true);
        }
    };

    const openPaymentSheet = async () => {
        const { error } = await presentPaymentSheet();

        if (error) {
            Alert.alert(`Error code: ${error.code}`, error.message);
        } else {
            saveOder();
            setShowPayModal(false);
        }
    };

    return (
        <View>
            <StripeProvider
                publishableKey="pk_test_51NQTx9G4clDTLncLfhsu1PSi5hHCGZ7xTnoibyXivJw15kQmBiHUmIeL85Qb6YCyh2V9XlS73PvVt7ocnVyGSu9y00THXgFE3N"
            >
                <Pressable
                    style={!loading ? styles.payBtnDisabled : styles.payBtn}
                    onPress={openPaymentSheet}
                    disabled={!loading}
                    android_ripple={{ color: 'black' }}
                >
                    <Text style={styles.payBtnText}>Pay Now</Text>
                </Pressable>
            </StripeProvider>
        </View>
    );
}

const styles = StyleSheet.create({
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