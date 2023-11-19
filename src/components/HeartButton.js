import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

function HeartButton({ id }) {
  const [imageIsFavorite, setImageIsFavorite] = useState(false);
  useEffect(() => {

    const checkFavoriteStatus = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem("favorites");
        if (storedFavorites !== null) {
          const favorites = JSON.parse(storedFavorites);
          const exists = favorites.some((item) => item.id === id);
          setImageIsFavorite(exists);
        }
      } catch (error) {
        console.error("Error checking favorite status:", error);
      }
    };
    
    checkFavoriteStatus();
  }, [id]);

  const addToFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem("favorites");
      let favorites = [];
      if (storedFavorites !== null) {
        favorites = JSON.parse(storedFavorites);
      }

      const exists = favorites.some((item) => item.id === id);
      if (!exists) {
        favorites.push({ id });
        await AsyncStorage.setItem("favorites", JSON.stringify(favorites));
        setImageIsFavorite(true);
      }
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  const removeFromFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem("favorites");
      let favorites = [];
      if (storedFavorites !== null) {
        favorites = JSON.parse(storedFavorites);
      }

      const updatedFavorites = favorites.filter((item) => item.id !== id);

      await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setImageIsFavorite(false);
    } catch (error) {
      console.error("Error removing from favorites:", error);
    }
  };

  const changeFavoriteStatusHandler = () => {
    if (imageIsFavorite) {
      removeFromFavorites();
    } else {
      addToFavorites();
    }
  };

  return (
    <View>
      <AntDesign
        name={imageIsFavorite ? "heart" : "hearto"}
        size={24}
        color="red"
        onPress={changeFavoriteStatusHandler}
      />
    </View>
  );
}

export default HeartButton;
