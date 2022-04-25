import AsyncStorageLib from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native"
import { Button, Layout } from "@ui-kitten/components"
import React, { useState } from "react"
import { Dimensions, KeyboardAvoidingView, StyleSheet, TextInput, Platform, StatusBar, View } from "react-native"

export function CreateNoteScreen() {
    const [note, setNote] = useState("")
    const navigation = useNavigation()

    const saveNote = async () => {
        const value = await AsyncStorageLib.getItem("NOTES")
        const n = value ? JSON.parse(value) : []
        n.push(note)
        await AsyncStorageLib.setItem("NOTES", JSON.stringify(n)).then(() => navigation.navigate("List"))
        setNote("")
    }
    //TODO: REMODEL TEXTAREA AND FIX BUTTON HIDING !!!
    return (
        <Layout style={styles.container}>
            <TextInput
                value={note}
                onChangeText={setNote}
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center', fontSize: 22}}
                multiline={true}
                autoFocus
                selectionColor="#fff"
            />
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.bottom}>
                <Button style={StyleSheet.button} appearance="filled" onPress={saveNote}>
                    Create Note
                </Button>
            </KeyboardAvoidingView>
        </Layout>
    )
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		color: "white",
		padding: 30,
		paddingTop: Platform.OS === "android" ? StatusBar.currentHeight: 0,
	},
	bottom: {
		flex: 1,
		justifyContent: "flex-end",
		marginBottom: 34,
	},
	button: {
		marginBottom: 30
	}
})