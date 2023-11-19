import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  FlatList,
  StyleSheet,
  Touchable,
} from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import HeartButton from "../components/HeartButton";
import { TouchableOpacity } from "react-native-gesture-handler";

const ExploreScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [artworks, setArtworks] = useState([]);
  const navigation = useNavigation();
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false);
  const { colors } = useTheme();
  useEffect(() => {
    fetchArtworks();
}, [searchQuery]);

  const fetchArtworks = async () => {
    if (!loading)
      try {
        setLoading(true)
        let apiUrl = `https://api.artic.edu/api/v1/artworks/search?q=${searchQuery}&page=${page}&fields=title,image_id`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (page === 1) {
          setArtworks(data.data);
        } else {
          setArtworks((prevData) => [...prevData, ...data.data]);
        }
        setPage(page+1);
      } catch (error) {
        console.error("Error fetching artworks: ", error);
      } finally {
        setLoading(false);
      }
  };

  const handleSearch = (query) => {
    setArtworks([]);
    setPage(1);
    setSearchQuery(query)
  }

  const navigateToDetails = (item) => {
    navigation.navigate("ImageDetails", { item });
  };

  const renderItem = ({ item }) => (
      <TouchableOpacity onPress={() => navigateToDetails(item)}>
        <View style={styles.item}>
          <Image
            style={styles.image}
            source={{
              uri: `https://www.artic.edu/iiif/2/${item.image_id}/full/843,/0/default.jpg`,
            }}
          />
          <Text style={styles.text}>{item.title}</Text>
          <HeartButton id={item.id}/>
        </View>
      </TouchableOpacity>
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      backgroundColor: colors.primary,
    },
    item: {
      backgroundColor: colors.listItemColor,
      padding: 5,
      paddingHorizontal: 20,
      margin: 3,
      borderRadius: 10,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      height: 70,
    },
    image: { width: 60, height: 60, borderRadius: 10 },
    text: { maxWidth: 200, textAlign: "center", color: "white" },
    input: {
      backgroundColor: "gray",
      padding: 10,
      borderRadius: 8,
      width: "80%",
      marginBottom: 10,
      marginTop: 10,
      color: "white",
    },
  });

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search artworks..."
        value={searchQuery}
        onChangeText={handleSearch}
        style={styles.input}
      />
      <FlatList
        data={artworks}
        renderItem={renderItem}
        style={{ flex: 1, width: "100%" }}
        onEndReached={fetchArtworks}
      />
    </View>
  );
};



export default ExploreScreen;
