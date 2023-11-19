import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
  Modal,
  TouchableOpacity,
} from "react-native";
import { useRoute, useNavigation, useTheme } from "@react-navigation/native";
import RenderHtml from "react-native-render-html";
import HeartButton from "../components/HeartButton";

const ImageDetailsScreen = () => {
  const route = useRoute();
  const { item } = route.params;
  const htmlContent = `<div style="color: #2272FF;">${item.description}</div>`;
  const { width, height } = useWindowDimensions();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const { colors } = useTheme();
  const navigateToDetails = (item) => {
    navigation.navigate("AuthorDetails", { item });
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.primary,
      paddingTop: 20,
      alignItems: "center",
    },
    imageContainer: {
      width: 200,
      height: 200,
      marginBottom: 4
    },
    image: {
      width: "100%",
      height: "100%",
    },
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.primary,
    },
    fullImage: {
      width: "100%",
      height: "100%",
      resizeMode: "contain",
    },
    closeButton: {
      position: "absolute",
      top: 50,
      right: 20,
      zIndex: 1,
    },
    closeText: {
      color: "#2272FF",
      fontSize: 18,
    },
    textContainer: {
      flex: 1,
      width: "100%",
      paddingHorizontal: 20,
    },
    title: {
      fontSize: 24,
      color: "#2272FF",
      fontWeight: "bold",
      marginBottom: 10,
      textAlign: "center",
    },
    name: {
      fontSize: 22,
      color: "#2272FF",
      fontWeight: "bold",
      marginBottom: 10,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
      width: "50%",
      marginBottom: 10,
    },
    textLike: {
      color: "red",
      fontSize: 20,
    },
    textGray: {
      color: "gray",
      fontSize: 10,
      marginBottom:10
    }
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{
              uri: `https://www.artic.edu/iiif/2/${item.image_id}/full/843,/0/default.jpg`,
            }}
          />
        </View>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
          <Image
            style={styles.fullImage}
            source={{
              uri: `https://www.artic.edu/iiif/2/${item.image_id}/full/full/0/default.jpg`,
            }}
          />
        </View>
      </Modal>
      <Text style={styles.textGray}>Click to view full image</Text>
      <View style={styles.row}>
        <HeartButton id={item.id} />
        <Text style={styles.textLike}>Add to Favorites</Text>
      </View>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.name} onPress={() => navigateToDetails(item)}>
        {item.artist_title}
      </Text>
      <ScrollView style={styles.textContainer}>
        {item.description ? (
          <RenderHtml source={{ html: htmlContent }} contentWidth={width} />
        ) : null}
      </ScrollView>
    </View>
  );
};



export default ImageDetailsScreen;
