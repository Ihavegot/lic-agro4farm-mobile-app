import * as eva from '@eva-design/eva'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ApplicationNav } from './navigation/ApplicationNav'


export default function App() {
  return (
    <ApplicationProvider {...eva} theme={{ ...eva.dark }}>
      <IconRegistry icons={EvaIconsPack} />
      <SafeAreaProvider>
        <ApplicationNav />
      </SafeAreaProvider>
    </ApplicationProvider>
  )
}