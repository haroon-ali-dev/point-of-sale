import { useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";

export default function Home() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
                    <Text style={styles.loginBtnText}>Login</Text>
                </Pressable>
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
        marginTop: 5
    },
    loginBtnText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20
    }
});