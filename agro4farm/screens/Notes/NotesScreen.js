import AsyncStorageLib from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { Divider, List, ListItem, Text } from "@ui-kitten/components"
import React, { useState } from "react"
import { StyleSheet, Platform, StatusBar, View } from "react-native"

export function NotesScreen() {
  const [notes, setNotes] = useState([])

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

  const renderItem = ({ item }) => (
    <ListItem
      title={<Text category="h5">{item}</Text>}
      onPress={() =>
        navigation.navigate("Note", {
          singleNote: item
        })}
    />
  )

  return (
    <View style={{ flex: 1, paddingTop: Platform.OS === "android" ? StatusBar.currentHeight: 0 }}>
        <List
          style={styles.container}
          data={notes}
          ItemSeparatorComponent={Divider}
          renderItem={renderItem}
        />
    </View>
  )
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})