import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Autocomplete from "react-native-autocomplete-input";

export default class Home1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      DataList: [
        {
          id: 1,
          name: "JavaScript",
        },
        {
          id: 2,
          name: "Java",
        },
        {
          id: 3,
          name: "Ruby",
        },
        {
          id: 4,
          name: "React Native",
        },
        {
          id: 5,
          name: "PHP",
        },
        {
          id: 6,
          name: "Python",
        },
        {
          id: 7,
          name: "Go",
        },
        {
          id: 8,
          name: "Swift",
        },
      ],
      query: "",
    };
  }

  findData(query) {
    if (query === "") {
      return [];
    }
    const { DataList } = this.state;
    const regex = new RegExp(`${query}`, "i");
    return DataList.filter((data) => data.name.search(regex) >= 0);
  }

  render() {
    const { query } = this.state;
    const DataList = this.findData(query);

    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

    return (
      <View style={styles.container}>
        <Autocomplete
          autoCapitalize="none"
          autoCorrect={false}
          containerStyle={styles.autocompleteContainer}
          data={
            DataList.length === 1 && comp(query, DataList[0].name)
              ? []
              : DataList
          }
          defaultValue={query}
          onChangeText={(text) => this.setState({ query: text })}
          placeholder="Enter Name"
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => this.setState({ query: item.name })}
            >
              <Text style={styles.itemText}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
  },
  itemText: {
    padding: 16,
  },
});
