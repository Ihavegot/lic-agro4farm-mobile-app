import AsyncStorageLib from "@react-native-async-storage/async-storage"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { Button, Divider, Layout, StyleService, Text, Icon, useTheme } from "@ui-kitten/components"
import React, { useState } from "react"
import { StyleSheet, View } from "react-native"
import { NotesIcon } from "../../assets/icons"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faTrashCan } from "@fortawesome/free-solid-svg-icons"

export function DetailsNoteScreen({ route }) {
  const theme = useTheme()
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'stretch',
    },
    text: {
      flex: 6,
      justifyContent: 'flex-start',
      backgroundColor: theme['background-basic-color-2'],
      padding: 5,
      marginHorizontal: 15,
      marginVertical: 15,
      borderRadius: 25,
    },
    button: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 15,
    },
    delete: {
      width: 80,
      height: 80,
      borderRadius: 50,
    },
  })

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
    const newNotes = await notes.filter((note) => note.note !== singleNote.note)
    await AsyncStorageLib.setItem("NOTES", JSON.stringify(newNotes)).then(() => navigation.navigate("List"))
  }
  return (
    <Layout style={styles.container}>
      <View style={styles.text}>
        <Text style={styles.text}>{singleNote.note}</Text>
      </View>
      <View style={styles.button}>
        <Button onPress={deleteNote} style={styles.delete}>
          <FontAwesomeIcon size={24} icon={faTrashCan} />
        </Button>
      </View>
      {/* <Text style={{ fontSize: 22, margin: 20 }}>{singleNote.note}</Text>
        <View style={styles.bottom}>
          <Button onPress={deleteNote} style={styles.button}>
            Delete
          </Button>
        </View> */}
    </Layout>
  )
}