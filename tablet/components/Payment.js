import { useState, useEffect } from 'react';
import { StripeProvider, useStripe } from '@stripe/stripe-react-native';
import { View, Button, Alert } from "react-native";
import { useRouter } from "expo-router";

export default function Payment({ amount, setCart, setShowPayModal }) {
    const router = useRouter();

    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        initializePaymentSheet();
    }, []);

    const fetchPaymentSheetParams = async () => {
        const response = await fetch(`http://192.168.8.101:3000/api/pay`, {
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
            Alert.alert('Success', 'Order completed!');
            setCart([]);
            setShowPayModal(false);
        }
    };

    return (
        <View>
            <StripeProvider
                publishableKey="pk_test_51NQTx9G4clDTLncLfhsu1PSi5hHCGZ7xTnoibyXivJw15kQmBiHUmIeL85Qb6YCyh2V9XlS73PvVt7ocnVyGSu9y00THXgFE3N"
            >
                <Button
                    variant="primary"
                    disabled={!loading}
                    title="Pay"
                    onPress={openPaymentSheet}
                />
            </StripeProvider>
        </View>
    );
}