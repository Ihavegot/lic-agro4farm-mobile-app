import { Divider, Layout, StyleService, Text } from '@ui-kitten/components'
import React from 'react'

export function DetailsNoteScreen(){
  return (
    <Layout style={{ flex: 1 }}>
      <Divider />
      <Layout style={styles.layout}>
        <Text category='h1'>details</Text>
      </Layout>
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