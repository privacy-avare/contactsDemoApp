/**
 * Contacts Demo App
 *
 */

import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, PermissionsAndroid, Platform } from 'react-native';
import Contacts from 'react-native-contacts';

export default class App extends Component {
  state = {
    contacts: null
  }

  componentDidMount() {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: 'Contacts',
          message: 'This app would like to view your contacts.'
        }
      ).then(() => {
        Contacts.getAll((err, contacts) => {
          if (err === 'denied') {
            // error
          } else {
            // contacts returned in Array
            this.setState({ contacts })
          }
        })
      })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.contacts}
          renderItem={({ item }) => (
          <View style={styles.item}>
              <Text >
                {item.givenName} {item.familyName} 
              </Text>
              {item.phoneNumbers.map(phone => (
                <Text>{phone.label} : {phone.number}</Text>
              ))}
            </View>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 56,
  },
})
