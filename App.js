import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Text, View, StyleSheet, ScrollView } from 'react-native';

export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://api.nasa.gov/planetary/apod?api_key={KEY}')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);
  var url = data.url;
  return (
    <View style={{ flex: 1}}>
      <ScrollView>
      <View style={{padding: 40, backgroundColor:"coral"}}><Text style={{textAlign:'center', fontSize:20, fontWeight:'bold', color:'white'}}>APOD</Text></View>
      {isLoading ? <ActivityIndicator/> : (
        <View style={{alignItems:'center'}}>
        <Text style={styles.title}>{data.title}</Text>
        <Image source={{uri: url}}
       style={{width: 300, height: 300}} />
       <View style={{padding:10,}}>
       <Text style={{textAlign: 'justify'}}>{data.explanation}</Text>
       </View>
      </View>
      )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  title:{
    fontSize:30,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});
