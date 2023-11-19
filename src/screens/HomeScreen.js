import React, { useState, useEffect, useCallback } from 'react';
import { View, RefreshControl } from 'react-native';
import List from '../components/List';
import { useTheme } from '@react-navigation/native';
const HomeScreen = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const { colors } = useTheme();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    if (!loading)
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.artic.edu/api/v1/artworks?limit=15&page=${page}&fields=id,title,api_link,image_id,description,artist_id,artist_title,artist_display`
        );
        const responseData = await response.json();
        const newData = responseData.data;
        setData((prevData) => {
          if (prevData) {
            return [...prevData, ...newData];
          } else {
            return [...newData];
          }
        });
        setPage((prevPage) => prevPage + 1);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
  };

  const handleRefresh = () => {
    setRefreshing(true)
    setData([])
    setPage(0)
    fetchData()
    setRefreshing(false)
  };

  if (data) {
    return (
      <View style={{backgroundColor: colors.primary, flex: 1, paddingTop: 5}}>
        <List data={data} loading={loading} fetchData={fetchData}  refreshing={refreshing} onRefresh={handleRefresh}/>
      </View>
    );
  }
};

export default HomeScreen;