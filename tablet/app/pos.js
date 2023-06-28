import { View, Text, StyleSheet } from "react-native";

export default function POS() {
    return (
        <View style={styles.container}>
            <Text>POS Page</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});