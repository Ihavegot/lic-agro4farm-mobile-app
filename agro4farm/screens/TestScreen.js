import { Divider, Layout, StyleService, Text, useTheme, Button } from '@ui-kitten/components';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { StyleSheet, TextInput, View, ScrollView, Linking } from 'react-native'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

export const TestScreen = () => {
  const theme = useTheme()
  const styles = StyleSheet.create({
    layout: {
      flex: 1,
    },
    inputs: {
      flex: 3,
      padding: 10,
    },
    search: {
      flex: 1,
      maxHeight: 190,
      minHeight: 190,
    },
    in: {
      flex: 1,
      backgroundColor: theme['background-basic-color-2'],
      paddingVertical: 10,
      paddingHorizontal: 10,
      marginTop: 15,
      marginHorizontal: 10,
      borderRadius: 20,
      maxHeight: 50,
      minHeight: 50,
      color: theme['color-primary-500'],
    },
    output: {
      flex: 2,
      marginTop: 20,
    },
    button: {
      marginVertical: 25,
      borderRadius: 30,
      height: 60,
      width: 60,
      marginTop: 40
    },
    btn: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },

    outputBox: {
      flex: 1,
      flexDirection: 'row',
      margin: 10,
      backgroundColor: theme['background-basic-color-2'],
      borderRadius: 25,
    },
    name: {
      flex: 1,
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
      borderRightWidth: 2,
      borderRightColor: theme["background-basic-color-1"],
    },
    info: {
      flex: 2,
      flexDirection: 'column',
    },
    substance: {
      padding: 5,
      borderBottomWidth: 2,
      borderBottomColor: theme["background-basic-color-1"],
    },
    crop: {
      padding: 5,
      borderBottomWidth: 2,
      borderBottomColor: theme["background-basic-color-1"],
    },
    agrofag: {
      padding: 5,
    },
    radio: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 20,
    },
    radioButtonActive: {
      padding: 5,
      marginHorizontal: 5,
      backgroundColor: theme['color-primary-500'],
    },
    radioButtonInactive: {
      padding: 5,
      marginHorizontal: 5,
      backgroundColor: theme['color-primary-200'],
    }
  })

  const [search, setSearch] = useState('')
  const [data, setData] = useState(null)
  const [findName, setFindName] = useState(true)
  const [findCrop, setFindCrop] = useState(false)
  const [findAgrofag, setFindAgrofag] = useState(false)
  const [pchl, setPchl] = useState('Szukaj po nazwie nawozu')

  const searchData = () => {
    if (findName) {
      axios.get(`http://192.168.1.11:3000/api/findName?name=${search}`).then((res) => {
        setData(res)
      })
    } else if (findCrop) {
      axios.get(`http://192.168.1.11:3000/api/findCrop?name=${search}`).then((res) => {
        setData(res)
      })
    } else {
      axios.get(`http://192.168.1.11:3000/api/findAgrofag?name=${search}`).then((res) => {
        setData(res)
      })
    }
  }

  if (data) {
    return (
      <Layout style={styles.layout}>
        <View style={styles.search}>
          <TextInput style={styles.in} value={search} onChangeText={setSearch} placeholder={pchl} />
          <View style={styles.radio}>
            <Button style={findName ? styles.radioButtonActive : styles.radioButtonInactive} onPress={() => {
              setFindName(true)
              setFindCrop(false)
              setFindAgrofag(false)
              setPchl('Szukaj po nazwie nawozu')
            }}>Nazwa środku</Button>
            <Button style={findCrop ? styles.radioButtonActive : styles.radioButtonInactive} onPress={() => {
              setFindName(false)
              setFindCrop(true)
              setFindAgrofag(false)
              setPchl('Szukaj po nazwie uprawy')
            }}>Uprawa</Button>
            <Button style={findAgrofag ? styles.radioButtonActive : styles.radioButtonInactive} onPress={() => {
              setFindName(false)
              setFindCrop(false)
              setFindAgrofag(true)
              setPchl('Szukaj po nazwie choroby/szkodnika')
            }}>Choroba/szkodnik</Button>
          </View>
          <View style={styles.btn}>
            <Button style={styles.button} onPress={searchData}>
              <FontAwesomeIcon icon={faSearch} />
            </Button>
          </View>
        </View>
        <View style={styles.output}>
          <ScrollView>
            {
              data.data.map((index, key) => {
                return (
                  <View key={key} style={styles.outputBox}>
                    <View style={styles.name}>
                      <Text onPress={() => {
                        Linking.openURL(`https://www.google.com/search?q=${index.nazwa}`)
                      }}>{index.nazwa}</Text>
                    </View>
                    <View style={styles.info}>
                      <View style={styles.substance}>
                        <Text>{index.substancja_czynna}</Text>
                      </View>
                      <View style={styles.crop}>
                        <Text>{index.uprawa}</Text>
                      </View>
                      <View style={styles.agrofag}>
                        <Text>{index.agrofag}</Text>
                      </View>
                    </View>
                  </View>
                )
              })
            }
          </ScrollView>
        </View>
      </Layout>
    );
  }
  return (
    <Layout style={styles.layout}>
        <View style={styles.search}>
          <TextInput style={styles.in} value={search} onChangeText={setSearch} placeholder={pchl} />
          <View style={styles.radio}>
            <Button style={findName ? styles.radioButtonActive : styles.radioButtonInactive} onPress={() => {
              setFindName(true)
              setFindCrop(false)
              setFindAgrofag(false)
              setPchl('Szukaj po nazwie nawozu')
            }}>Nazwa środku</Button>
            <Button style={findCrop ? styles.radioButtonActive : styles.radioButtonInactive} onPress={() => {
              setFindName(false)
              setFindCrop(true)
              setFindAgrofag(false)
              setPchl('Szukaj po nazwie uprawy')
            }}>Uprawa</Button>
            <Button style={findAgrofag ? styles.radioButtonActive : styles.radioButtonInactive} onPress={() => {
              setFindName(false)
              setFindCrop(false)
              setFindAgrofag(true)
              setPchl('Szukaj po nazwie choroby/szkodnika')
            }}>Choroba/szkodnik</Button>
          </View>
          <View style={styles.btn}>
            <Button style={styles.button} onPress={searchData}>
              <FontAwesomeIcon icon={faSearch} />
            </Button>
          </View>
        </View>
        <View style={styles.output}>
          
        </View>
      </Layout>
  );
};

const styles = StyleService.create({
  layout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});