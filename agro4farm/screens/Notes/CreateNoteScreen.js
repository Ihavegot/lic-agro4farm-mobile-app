import AsyncStorageLib from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native"
import { Button, Layout } from "@ui-kitten/components"
import React, { useState } from "react"
import { Dimensions, KeyboardAvoidingView, StyleSheet, TextInput, Platform, StatusBar, View } from "react-native"

export function CreateNoteScreen() {
    const [note, setNote] = useState("")

    const saveNote = async () => {
        const value = await AsyncStorageLib.getItem("NOTES")
        const n = value ? JSON.parse(value) : []
        n.push(note)
        await AsyncStorageLib.setItem("NOTES", JSON.stringify(n)).then(() => navigation.navigate("AllNotes"))
        setNote("")
    }
    return (
        <Layout style={{ flex: 1, paddingTop: Platform.OS === "android" ? StatusBar.currentHeight: 0 }}>
            <TextInput
                value={note}
                onChangeText={setNote}
                style={{ color: "#fff", fontSize: 22, backgroundColor: '#ffeedd' }}
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
		backgroundColor: "#222B45",
		color: "white",
		padding: 30,
		paddingTop: 80,

		width: Dimensions.get("window").width
	},
	bottom: {
		flex: 1,
		justifyContent: "flex-end",
		marginBottom: 36
	},
	button: {
		marginBottom: 30
	}
})