import { View, Text, StyleSheet } from "react-native";

export default function Notification({ message, bgColor }) {
    return (
        <View style={[styles.notification, { backgroundColor: bgColor }]}>
            <Text style={styles.notText}>{message}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    notification: {
        borderRadius: 10,
        padding: 20,
        marginTop: 20
    },
    notText: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center'
    }
});