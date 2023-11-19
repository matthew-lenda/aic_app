import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import { useRoute, useNavigation, useTheme } from "@react-navigation/native";
import HeartButton from "../components/HeartButton";

const AuthorDetailsScreen = () => {
  const route = useRoute();
  const { item } = route.params;
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const [page, setPage] = useState(1)
  const { colors } = useTheme();
  useEffect(() => {
    fetchArtworksByArtist();
  }, [item.artist_title]);

  const fetchArtworksByArtist = async () => {
    try {
      const response = await fetch(
        `https://api.artic.edu/api/v1/artworks/search?q=${item.artist_title}&page=${page}&fields=title,image_id,description,id,artist_title`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (page === 1) {
        setArtworks(data.data);
      } else {
        setArtworks((prevData) => [...prevData, ...data.data]);
      }
      setPage(page+1);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching artworks:", error);
      setLoading(false);
    }
  };

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
        <HeartButton id={item.id} />
      </View>
    </TouchableOpacity>
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.primary,
      paddingTop: 20,
      alignItems: "center",
    },
    authorName: {
      fontSize: 24,
      color: "#2272FF",
      marginBottom: 10,
      fontWeight: "bold",
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
  });

  return (
    <View style={styles.container}>
      <Text style={styles.authorName}>{item.artist_title}</Text>
      {loading ? (
        <ActivityIndicator color="#2272FF" />
      ) : (
        <FlatList
          data={artworks}
          renderItem={renderItem}
          style={{ flex: 1, width: "100%" }}
          onEndReached={fetchArtworksByArtist}
          onEndReachedThreshold={0.1}
          ListFooterComponent={ <ActivityIndicator />}
        />
      )}
    </View>
  );
};



export default AuthorDetailsScreen;
