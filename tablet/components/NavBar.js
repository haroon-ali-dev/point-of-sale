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
            <View style={styles.logoutBtnContainer}>
                <Pressable style={styles.logoutBtn} android_ripple={{ color: 'black', borderless: true }} onPress={logout}>
                    <SimpleLineIcons name="logout" size={20} color="white" />
                    <Text style={styles.logoutBtnText}>Logout</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    logoutBtnContainer: {
        borderRadius: 10,
        marginTop: 5
    },
    logoutBtn: {
        backgroundColor: '#dc3545',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        paddingHorizontal: 17,
        paddingVertical: 10
    },
    logoutBtnText: {
        fontSize: 18,
        color: 'white'
    }
});