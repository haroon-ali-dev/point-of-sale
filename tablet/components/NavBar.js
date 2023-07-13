import { View, Pressable, Text, StyleSheet } from "react-native";
import { useNavigation } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SimpleLineIcons } from '@expo/vector-icons';

export default function NavBar() {
    const navigation = useNavigation();

    const logout = async () => {
        try {
            await AsyncStorage.removeItem('token')

            navigation.navigate("index");
        } catch (e) {
            console.log(e.message);
        }
    }

    return (
        <View style={styles.container}>
            <Pressable style={styles.logoutBtn} onPress={logout}>
                <SimpleLineIcons name="logout" size={20} color="black" />
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
        width: 120,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        backgroundColor: 'white',
        padding: 10,
        marginTop: 5,
        borderRadius: 10
    },
    logoutBtnText: {
        fontSize: 18
    }
});