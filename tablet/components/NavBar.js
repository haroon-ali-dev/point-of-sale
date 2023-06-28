import { View, Pressable, Text, StyleSheet } from "react-native";

export default function NavBar() {
    return (
        <View style={styles.container}>
            <Pressable style={styles.logoutBtn}>
                <Text style={styles.logoutBtnText}>Logout</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        padding: 10,
        alignItems: 'flex-end'
    },
    logoutBtn: {
        backgroundColor: 'white',
        padding: 10,
        marginTop: 5,
        borderRadius: 10,
        width: 75
    },
    logoutBtnText: {
        fontSize: 15,
        textAlign: 'center'
    }
});