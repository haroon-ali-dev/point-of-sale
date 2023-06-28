import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text } from 'react-native';

export default function AuthOnly({ children }) {
    const [loading, setLoading] = useState(true);

    const router = useRouter();

    useEffect(() => {
        const getToken = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (token) {
                    setLoading(false);
                } else {
                    console.log("Please login.");
                    router.replace("/");
                }
            } catch (e) {
                console.log(e.message);
            }
        }

        getToken();
    }, []);

    return (
        <>
            {loading && (
                <Text>Loading...</Text>
            )}
            {!loading && (
                children
            )}
        </>
    )
}