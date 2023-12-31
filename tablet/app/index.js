import { useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';

import NoAuth from "../components/NoAuth";
import Notification from "../components/Notification";

import config from "../config.json";

export default function Login() {
    return (
        <NoAuth><LoginContent /></NoAuth>
    );
}

export function LoginContent() {
    const router = useRouter();

    const [notification, setNotification] = useState({
        message: "",
        display: false,
        bgColor: ""
    });
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [reqInProcess, setReqInProcess] = useState(false);

    const host = __DEV__ ? config.localHost : "https://point-of-sale-tau.vercel.app";

    const login = async () => {
        setReqInProcess(true);

        try {
            const res = await fetch(`${host}/api/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (res.status === 200) {
                await AsyncStorage.setItem('token', data.token);

                router.push('/pos');
            } else {
                setNotification({
                    message: data.message,
                    display: true,
                    bgColor: "#E2412E"
                });
            }
        } catch (error) {
            setNotification({
                message: error.message,
                display: true,
                bgColor: "#E2412E"
            });
        } finally {
            setReqInProcess(false);
            setTimeout(() => {
                setNotification({
                    message: "",
                    display: false,
                    bgColor: "#E2412E"
                });
            }, 3000);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.formPanel}>
                <Text style={styles.heading}>Login</Text>
                <View>
                    <Text style={styles.label}>Email</Text>
                    <TextInput style={styles.input} value={email} onChangeText={setEmail} />
                </View>
                <View>
                    <Text style={styles.label}>Password</Text>
                    <TextInput style={styles.input} secureTextEntry value={password} onChangeText={setPassword} />
                </View>
                <Pressable
                    onPress={login}
                    android_ripple={{ color: 'black' }}
                    style={styles.loginBtn}>
                    {reqInProcess && (
                        <ActivityIndicator size="large" />
                    )}
                    {!reqInProcess && (
                        <Text style={styles.loginBtnText}>Login</Text>
                    )}
                </Pressable>
                {notification.display && (
                    <Notification
                        message={notification.message}
                        bgColor={notification.bgColor}
                    />
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center'
    },
    formPanel: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 50
    },
    heading: {
        fontSize: 30,
        textAlign: 'center',
        marginBottom: 20
    },
    label: {
        fontSize: 18
    },
    input: {
        fontSize: 18,
        borderWidth: 1,
        width: 400,
        height: 50,
        padding: 10,
        marginTop: 5,
        marginBottom: 10
    },
    loginBtn: {
        backgroundColor: '#0d6efd',
        padding: 15,
        borderRadius: 10
    },
    loginBtnText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18
    }
});