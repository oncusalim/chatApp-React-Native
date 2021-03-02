import React from 'react';
import { Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';




const Button = (props) => {
    return (
        <TouchableOpacity style={styles.container}
            onPress={() => props.passChat()}
        >
            <Text style={styles.text}>Enter</Text>
        </TouchableOpacity>


    )
}

export { Button }

const styles = StyleSheet.create({
    container: {
        padding: 7,
        margin: 20,
        borderRadius: 8,
        width: Dimensions.get("window").width / 3,
        alignSelf: 'center',
        backgroundColor: '#ffe0b2'

    },
    text: {
        fontSize: 25,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: '#fb8c00'
    }
})