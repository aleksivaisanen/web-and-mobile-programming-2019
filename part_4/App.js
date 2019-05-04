import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, Alert, AsyncStorage } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

class NoteList extends React.Component {
  static navigationOptions = {
    title: 'My Notes!'
  }

  constructor(props) {
    super(props);
    this.state = {
      notes: [],
    }
  }

  retrieveData = async () => {
    try {
      const storedNotes = await AsyncStorage.getItem('notes');
      if (storedNotes !== null) {
        this.setState({
          notes: JSON.parse(storedNotes)
        })
      }
    } catch (error) {
      console.error(error)
    }
  }

  componentDidMount = () => {
    this.focusListener = this.props.navigation.addListener(
      'didFocus',
      () => {
        this.retrieveData()
      }
    )
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollViewContainer}>
          {this.state.notes.map(note =>
            <Text
              key={note}
              style={styles.text}>
              {note}
            </Text>
          )}
        </ScrollView>
        <View>
          <Button
            title={"Add note"}
            color='#ff5bf0'
            onPress={() => this.props.navigation.navigate('AddNote', {
              notes: this.state.notes
            })}
          />
        </View>
      </View>
    );
  }
}

class AddNote extends React.Component {
  static navigationOptions = {
    title: "Add a note"
  }

  constructor(props) {
    super(props);
    this.state = {
      notes: this.props.navigation.getParam('notes', ""),
      newNote: ""
    }
  }

  validateInput = () => {
    const duplicate = this.state.notes.filter(note => note === this.state.newNote);
    if (this.state.newNote === "") {
      Alert.alert(
        'Note is empty!'
      )
    }
    else if (duplicate.length > 0) {
      Alert.alert(
        'Note already exists!'
      )
    } else {
      this.storeData()
    }
  }

  storeData = async () => {
    const newNotes = JSON.stringify([...this.state.notes, this.state.newNote]);
    try {
      await AsyncStorage.setItem('notes', newNotes)
      this.setState({
        notes:[...this.state.notes, this.state.newNote],
        newNote: ""
      })
    } catch (error) {
      console.alert(error)
    }
  }

  render() {
    return (
      <View style={styles.addNoteContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => this.setState({ newNote: text })}
            value={this.state.newNote}
            placeholder={"Write the note here"}
          />
          <Button
            title={"Add note"}
            color='#ff5bf0'
            onPress={this.validateInput}
          />
        </View>
      </View>
    )
  }
}

const AppNavigator = createStackNavigator(
  {
    Notes: NoteList,
    AddNote: AddNote
  }, {
    InitialRouteName: "Notes"
  }
)

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    backgroundColor: '#c4daff',
  },
  addNoteContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: '#c4daff'
  },
  inputWrapper: {
    height: 150,
    padding: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#ffc9fa'
  },
  scrollViewContainer: {
    padding: 10,
  },
  textInput: {
    backgroundColor: '#fff',
    fontSize: 24,
    paddingHorizontal: 10,
  },
  text: {
    backgroundColor: '#ffc9fa',
    margin: 10,
    padding: 10,
    fontSize: 24,
  },

});
