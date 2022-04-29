import AsyncStorageLib from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Divider, Layout, List, ListItem, Text, useTheme } from "@ui-kitten/components";
import React, { useState } from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";

export function NotesScreen() {
	const theme = useTheme()
	const styles = StyleSheet.create({
		layout: {
			flex: 1,
		},
		container: {
			backgroundColor: theme['background-basic-color-1']
		},
		listItem: {
			marginTop: 15,
			marginHorizontal: 5,
			padding: 5,
			borderRadius: 25,
			backgroundColor: theme['background-basic-color-2']
		},
	})

	const [notes, setNotes] = useState([])
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

	const renderItem = ({ item }) => (
		<ListItem
			style={styles.listItem}
			title={<Text>{item.title}</Text>}
			onPress={() =>
				navigation.navigate("Detail", {
					singleNote: item
				})}
		/>

	)

	return (
		<Layout style={styles.layout}>
			<List
				style={styles.container}
				data={notes}
				ItemSeparatorComponent={Divider}
				renderItem={renderItem}
			/>
		</Layout>
	)
}