import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image, Dimensions } from 'react-native';

import { Input, Button } from '../components';

const HomeScreen = (props) => {

    const [name, setName] = React.useState("");

    function getNickName(value) {
        setName(value);
    }


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Image
                    style={styles.images}
                    source={require('../images/chat.png')}
                />
                <Text style={styles.text}>React Native Chat</Text>
                <Input
                    InputProps={{
                        placeholder: 'Type Your NickName',
                        keyboardType: 'default'
                    }}
                    onType={getNickName}
                />
                <Button
                    passChat={() => props.navigation.navigate("ChatRoom", { payload: { 'name': name } })}
                />
            </View>
        </SafeAreaView>
    )
}

export { HomeScreen }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
        margin: 5,
        borderRadius: 8,
        alignSelf: 'center',
        justifyContent: 'flex-start'


    },
    text: {
        fontSize: 25,
        alignSelf: 'center',
        color: '#fb8c00',
        fontWeight: 'bold',
        margin: 25
    },
    images: {
        width: 250,
        height: 250,
        alignSelf: 'center',
        margin: 20
    }
})