import { FlatList, Text, View, Pressable, StyleSheet } from "react-native";
import { Feather } from '@expo/vector-icons';

export default function Cart({ cart }) {
    return (
        <FlatList
            data={cart}
            renderItem={({ item }) => (
                <View style={styles.containerMain}>
                    <View style={styles.containerName}>
                        <Text style={styles.name}>{item.name} x{item.quantity}</Text>
                    </View>
                    <View style={styles.containerPrice}>
                        <Text style={styles.price}>£{item.price}</Text>
                    </View>
                    <View style={styles.containerBtn}>
                        <Pressable>
                            <Feather name="trash-2" size={30} color="black" />
                        </Pressable>
                    </View>
                </View>
            )}
            keyExtractor={item => item.id}
        />
    );
}

const styles = StyleSheet.create({
    containerMain: {
        flexDirection: 'row',
        marginHorizontal: 10,
        marginTop: 10,
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderWidth: 1
    },
    containerName: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    name: {
        fontSize: 18
    },
    containerPrice: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    price: {
        fontSize: 18
    },
    containerBtn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});