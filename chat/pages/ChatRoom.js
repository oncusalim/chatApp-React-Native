import React from 'react';
import moment from 'moment';
import {
    SafeAreaView,
    View, Text,
    FlatList, TextInput,
    KeyboardAvoidingView,
    ScrollView, StyleSheet, Dimensions
} from 'react-native';
import database from '@react-native-firebase/database';

import { Input } from '../components'


const ChatRoom = (props) => {

    const name = props.route.params.payload.name;
    const [message, setMessage] = React.useState("");
    const [finalMessage, setFinalMessage] = React.useState("");
    const [messageData, setMessageData] = React.useState([]);

    const fetchData = () => {
        database()
            .ref('chat_database')
            .on('value', snapshot => {
                const data = snapshot.val();
                let formattedData = [];

                Object.keys(data).forEach((key) => {
                    formattedData.push(data[key]);


                });
                formattedData.sort((a, b) => {
                    return new Date(b.time) - new Date(a.time);
                });
                setMessageData(formattedData);

            }

            )
    }

    const renderMessage = (item) => {

        return (
            <View>
                <Text style={{ fontSize: 12, alignSelf: `${item.nickName == name ? 'flex-start' : 'flex-end'}` }}>{moment
                    .duration(
                        moment(item.time).diff(moment(new Date()), 'seconds'),
                        'seconds',
                    )
                    .humanize(true)}</Text>
                <View style={item.nickName == name ? { alignSelf: 'flex-start' } : { alignSelf: 'flex-end' }}>
                    <View style={styles.messageContainer}>
                        <View style={item.nickName == name ? styles.messageSender : [styles.messageSender, { backgroundColor: 'powderblue' }]}>
                            <Text style={{ fontWeight: 'bold' }}>{item.nickName} </Text>
                        </View>
                        <View style={item.nickName == name ? styles.messageText : [styles.messageText, { backgroundColor: 'powderblue' }]}>
                            <Text>{item.postMessage} </Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }





    function handleKeyPress() {
        setFinalMessage(message);
        const postData = {
            nickName: name,
            postMessage: message,
            time: moment().toISOString(),
        }
        database().ref('chat_database').push(postData)

    }
    const getMessage = (value) => {
        setMessage(value)
    }

    React.useEffect(() => {
        fetchData();
    }, [])
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={{ flex: 1 }}>
                    <View style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                    }}>
                        <View>

                            <FlatList
                                data={messageData}
                                renderItem={({ item }) => renderMessage(item)}
                            />

                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                clearTextOnFocus={true} //only ios
                                placeholder="Type your message..."
                                onChangeText={(value) => getMessage(value)}
                                onSubmitEditing={() => handleKeyPress()}
                                multiline={true}

                            />
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export { ChatRoom }

const styles = StyleSheet.create({

    inputContainer: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 12,
        margin: 8,
    },
    messageContainer: {
        flexDirection: 'row',
    },
    messageSender: {

        backgroundColor: 'lightgray',
        borderRadius: 8,
        padding: 3,
        margin: 10,
        justifyContent: 'center',
    },
    messageText: {
        backgroundColor: 'lightgray',
        borderRadius: 8,
        marginLeft: 5,
        justifyContent: 'center',
        margin: 10,
        padding: 8,

    }
})