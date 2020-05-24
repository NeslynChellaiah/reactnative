import React ,{ useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList, Image, Linking } from 'react-native';

export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://newsapi.org/v2/top-headlines?country=in&apiKey=KEY')
      .then((response) => response.json())
      .then((json) => setData(json.articles))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={{ flex: 1, paddingTop: 30 }}>
     

      <Text style={styles.header}>THE NEWS APP</Text>
      {isLoading ? <ActivityIndicator/> : (
        <FlatList
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          horizontal
          data={data}
          keyExtractor={ item => item.url}
          renderItem={({ item }) => (
            <View style={{width: 360}}>
              <View style={styles.block}>
              <Text style={styles.heading}>{item.title}</Text>
              <Image source={{uri: item.urlToImage}} style={{width: 350, height: 200, marginBottom: 20}} />
              <Text style={styles.heading}>Description:</Text>
              <Text style={{textAlign: 'justify'}}>{item.description}</Text>
              <Text style={{marginTop: 15}}>Source :{item.source.name}  </Text>
              <Text>Dated :{item.publishedAt}</Text>
              <Text style={{color: 'blue'}} onPress={() => Linking.openURL(item.url)}>Read more</Text>
              </View>
            </View>
          )}  
        />
      )}
      <Text style={{textAlign:'center', padding:20}}>SWIPE FOR MORE</Text>
    </View>
  );

}


const styles = StyleSheet.create({
  
  block:{
    width: 350,
    borderBottomColor: 'black',
    borderBottomWidth: 3,
    backgroundColor: '#eee',
    marginHorizontal: 5,    
  },
  heading:{
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'justify',
    paddingVertical: 20
  },
  header:{
    backgroundColor: 'skyblue',
    height: 60,
    textAlign: 'center',
    padding: 15,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20
  }
});

