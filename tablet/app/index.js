import { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

export default function Home() {
    const [email, setEmail] = useState("");

    return (
        <View style={styles.container}>
            <View style={styles.formPanel}>
                <View>
                    <Text style={styles.label}>Email</Text>
                    <TextInput style={styles.input} value={email} onChangeText={setEmail} />
                </View>
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
    label: {
        fontSize: 20
    },
    input: {
        fontSize: 20,
        borderWidth: 1,
        width: 300,
        height: 50,
        padding: 10,
        marginTop: 5
    }
});