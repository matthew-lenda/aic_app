import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation, useTheme } from "@react-navigation/native";
import HeartButton from "../components/HeartButton";

const FavoritesScreen = () => {
  const [favorites, setFavorites] = useState([]);
  const [ImageDetails, setImageDetails] = useState({});
  const navigation = useNavigation();
  const { colors } = useTheme();
  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem("favorites");
      if (storedFavorites !== null) {
        const parsedFavorites = JSON.parse(storedFavorites);
        setFavorites(parsedFavorites);
        fetchImageDetails(parsedFavorites);
      }
    } catch (error) {
      console.error("Error loading favorites:", error);
    }
  };

  const fetchImageDetails = async (items) => {
    try {
      const updatedImageDetails = {};
      await Promise.all(
        items.map(async (item) => {
          try {
            const response = await fetch(
              `https://api.artic.edu/api/v1/artworks/${item.id}`
            );
            if (response.ok) {
              const data = await response.json();
              updatedImageDetails[item.id] = {
                id: item.id,
                title: data?.data?.title || "Untitled",
                image_id: data?.data?.image_id || null,
                description: data?.data?.description || null,
                artist_id: data?.data?.artist_id || null,
                artist_title: data?.data?.artist_title || null,
                artist_display: data?.data?.artist_display || null,
              };
            } else {
              throw new Error("Failed to fetch artwork details");
            }
          } catch (error) {
            console.error("Error fetching artwork details:", error);
          }
        })
      );
      setImageDetails(updatedImageDetails);
    } catch (error) {
      console.error("Error fetching artwork details:", error);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      loadFavorites();
    }, [])
  );

  const navigateToDetails = (item) => {
    navigation.navigate("ImageDetails", { item });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigateToDetails(ImageDetails[item.id])}>
      <View style={styles.item}>
        <Image
          style={styles.image}
          source={{
            uri: `https://www.artic.edu/iiif/2/${ImageDetails[item.id]?.image_id}/full/843,/0/default.jpg`,
          }}
        />
        <Text style={styles.text}>{ImageDetails[item.id]?.title}</Text>
        <HeartButton id={item.id} />
      </View>
    </TouchableOpacity>
  );

  const styles = StyleSheet.create({
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
    container: { backgroundColor: colors.primary, flex: 1, paddingTop: 5 },
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item?.id?.toString() || ""}
        renderItem={renderItem}
      />
    </View>
  );
};



export default FavoritesScreen;
