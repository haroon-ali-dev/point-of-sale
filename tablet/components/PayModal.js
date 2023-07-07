import { Modal, StyleSheet, View, Text, Pressable } from "react-native";
import { AntDesign } from '@expo/vector-icons';

export default function PayModal({ showPayModal, setShowPayModal, amount }) {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={showPayModal}
        >
            <View style={styles.containerModal}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.heading}>Payment</Text>
                        <Pressable onPress={() => setShowPayModal(false)}>
                            <AntDesign name="closecircle" size={30} color="black" />
                        </Pressable>
                    </View>
                    <View style={styles.divider}></View>
                    <View style={styles.body}>
                        
                    <Text style={styles.amount}>£{amount}</Text>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    containerModal: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        width: "50%",
        height: "50%",
        backgroundColor: 'white',
        borderWidth: 1,
        padding: 20
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10
    },
    heading: {
        fontSize: 25
    },
    divider: {
        backgroundColor: 'black',
        height: 1,
        marginTop: 15
    },
    body: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    amount: {
        fontSize: 50
    }
});