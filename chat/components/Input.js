import React from 'react';
import { View, TextInput, StyleSheet, Dimensions } from 'react-native';



const Input = (props) => {

    return (

        <View style={styles.container}>
            <TextInput
                {...props.InputProps}
                onChangeText={value => props.onType(value)}
            />
        </View>

    )
}

export { Input }

const styles = StyleSheet.create({
    container: {
        padding: 12,
        margin: 5,
        borderRadius: 8,
        width: Dimensions.get("window").width * 0.90,
        alignSelf: 'center',
        backgroundColor: '#ffe0b2'

    }
})