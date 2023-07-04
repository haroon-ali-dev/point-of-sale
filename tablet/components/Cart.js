import { FlatList, Text, View } from "react-native";

export default function Cart({ cart }) {
    return (
        <FlatList
            data={cart}
            renderItem={({ item }) => (
                <View>
                    <Text>{item.name}</Text>
                </View>
            )}
            keyExtractor={item => item.id}
        />
    );
}