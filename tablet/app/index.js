import { useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";

import Notification from "../components/Notification";

export default function Login() {
    const [notification, setNotification] = useState({
        message: "",
        display: false,
        bgColor: ""
    });
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = async () => {
        try {
            const res = await fetch(`http://192.168.8.101:3000/api/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (res.status === 200) {
                console.log(data.token);
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
                    <TextInput style={styles.input} value={password} onChangeText={setPassword} />
                </View>
                <Pressable style={styles.loginBtn}>
                    <Text style={styles.loginBtnText} onPress={login}>Login</Text>
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
        fontSize: 20
    },
    input: {
        fontSize: 20,
        borderWidth: 1,
        width: 400,
        height: 50,
        padding: 10,
        marginTop: 5,
        marginBottom: 10
    },
    loginBtn: {
        backgroundColor: 'black',
        padding: 20,
        marginTop: 5,
        borderRadius: 10
    },
    loginBtnText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20
    }
});