import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
  Dimensions,
} from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import HeartButton from "./HeartButton";

const List = ({ data, loading, fetchData, refreshing, onRefresh }) => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const navigateToDetails = (item) => {
    navigation.navigate("ImageDetails", { item });
  };

  const numColumns = 2; 
  const screenWidth = Dimensions.get("window").width; 

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigateToDetails(item)}>
      <View style={styles.item}>
        <View>
          <Image
            style={styles.image}
            source={{
              uri: `https://www.artic.edu/iiif/2/${item.image_id}/full/843,/0/default.jpg`,
            }}
          />
        </View>
        <View style={styles.rowBottom}>
          <Text style={styles.text}>{item.title}</Text>
          <HeartButton id={item.id} />
        </View>
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
      alignItems: "center",
      height: 250,
      width: (screenWidth - 24) / numColumns, 
    },
    image: { width: 165, height: 165, borderRadius: 10 },
    text: { maxWidth: 140, textAlign: "center", color: "white", paddingRight:10 },
    rowBottom: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 10,
      height: 60,
    },
    
  });

  return (
    <FlatList
      data={data}
      onEndReached={fetchData}
      onEndReachedThreshold={0.1}
      ListFooterComponent={loading && <ActivityIndicator />}
      renderItem={renderItem}
      refreshControl={
        <RefreshControl
          onRefresh={onRefresh}
          refreshing={refreshing}
          colors={["#2272FF"]}
          tintColor={"#2272FF"}
        />
      }
      numColumns={numColumns}
    />
  );
};

export default List;
