import AsyncStorageLib from '@react-native-async-storage/async-storage'
import { useNavigation } from "@react-navigation/native"
import { Button, Layout, useTheme } from "@ui-kitten/components"
import React, { useState } from "react"
import { Dimensions, KeyboardAvoidingView, StyleSheet, TextInput, Platform, StatusBar, View } from "react-native"
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
//DESIGN AND ADD TEMPLATES
export function CreateNoteScreen() {
    const theme = useTheme()
    const styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        textAreas: {
            flex: 6,
        },

        title: {
            flex: 1,
            backgroundColor: theme['background-basic-color-2'],
            paddingVertical: 5,
            paddingHorizontal: 15,
            marginTop: 15,
            marginHorizontal: 10,
            borderRadius: 20,
            color: 'white',
            fontWeight: 'bold',
            fontFamily: 'Roboto',
            fontSize: 20,
        },
        note: {
            flex: 8,
            textAlignVertical: 'top',
            backgroundColor: theme['background-basic-color-2'],
            padding: 15,
            marginTop: 15,
            marginHorizontal: 10,
            borderRadius: 20,
            color: 'white',
            fontWeight: 'bold',
            fontFamily: 'Roboto',
            fontSize: 18,
        },

        button: {
            flex: 1,
            marginBottom: 10,
            justifyContent: 'flex-end',
            alignItems: 'center',
        },
        add: {
            width: 80,
            height: 80,
            borderRadius: 50,
        },
    })

    const [note, setNote] = useState("")
    const [title, setTitle] = useState("Title")
    const navigation = useNavigation()

    const saveNote = async () => {
        const value = await AsyncStorageLib.getItem("NOTES")
        const n = value ? JSON.parse(value) : []
        n.push({ title: title, note: note })
        await AsyncStorageLib.setItem("NOTES", JSON.stringify(n)).then(() => navigation.navigate("List"))
        setNote("")
    }

    return (
        <Layout style={styles.container}>
            <View style={styles.textAreas}>
                <TextInput
                    value={title}
                    onChangeText={setTitle}
                    style={styles.title}
                />
                <TextInput
                    value={note}
                    onChangeText={setNote}
                    style={styles.note}
                    multiline
                />
            </View>
            <View style={styles.button}>
                <Button style={styles.add} onPress={saveNote}>
                    <FontAwesomeIcon size={24} icon={faPlus} />
                </Button>
            </View>

            {/* <TextInput
                value={title}
                onChangeText={setTitle}
                style={{ flex: 1, backgroundColor: 'red', justifyContent: 'center', alignItems: 'center', fontSize: 22 }}
                multiline={true}
                autoFocus
                selectionColor="#fff"
            />
            <TextInput
                value={note}
                onChangeText={setNote}
                style={{ flex: 1, backgroundColor: 'pink', justifyContent: 'center', alignItems: 'center', fontSize: 22 }}
                multiline={true}
                autoFocus
                selectionColor="#fff"
            />
            <Button style={StyleSheet.button} appearance="filled" onPress={saveNote}>
                Create Note
            </Button> */}
        </Layout>
    )
}