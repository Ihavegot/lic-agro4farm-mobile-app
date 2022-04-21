import AsyncStorageLib from "@react-native-async-storage/async-storage"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { Button, Divider, Layout, StyleService, Text } from "@ui-kitten/components"
import React, { useState } from "react"
import { StyleSheet, View } from "react-native"

export function DetailsNoteScreen({ route }) {
  const [notes, setNotes] = useState([])
  const { singleNote } = route.params
  const navigation = useNavigation()

  useFocusEffect(
    React.useCallback(() => {
      getNotes()
    }, [])
  )
  const getNotes = () => {
    AsyncStorageLib.getItem("NOTES").then((notes) => {
      setNotes(JSON.parse(notes))
    })
  }
  const deleteNote = async () => {
    const newNotes = await notes.filter((note) => note !== singleNote)
    await AsyncStorageLib.setItem("NOTES", JSON.stringify(newNotes)).then(() => navigation.navigate("List"))
  }
  return (
    <Layout style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title} category="h1">
          Notes
        </Text>
        <Text style={{ fontSize: 22, margin: 20 }}>{singleNote}</Text>
        <View style={styles.bottom}>
          <Button onPress={deleteNote} style={styles.button}>
            Delete
          </Button>
        </View>
      </View>
    </Layout>
  )
}

const styles = StyleService.create({
  layout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})