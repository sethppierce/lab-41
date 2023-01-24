import React, { useState } from 'react';
import { ActivityIndicator, View, TextInput, Image, TouchableOpacity, Button, Text, StyleSheet, ScrollView } from 'react-native';
import * as SMS from 'expo-sms';
import axios from 'axios';
const MyApp = () => {
  const [input, setInput] = useState('');
  const [apiKey, setApiKey] = useState('')
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false)
  const defaultImages = [
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
  ]

  const generateImages = async () => {
    setLoading(true)
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/images/generations',
        {
          prompt: input,
          model: 'image-alpha-001',
          n: 4,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          }
        }
      );
      setInput('')
      setImages(response.data.data);
      setLoading(false)
    } catch (error) {
      console.log(error.message);
      setLoading(false)

    }
  };


  const shortenUrl = async (longUrl) => {
    let accessToken = 'db809f9bc20fa10740fa19149ed506b8ca441dc0'
    try {
      const response = await axios.post(
        'https://api-ssl.bitly.com/v4/shorten',
        {
          long_url: longUrl,
        },
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data.link;
    } catch (error) {
      console.log(error);
    }
  };

  const onShare = async (imageUrl) => {
    try {
      let url = await shortenUrl(imageUrl)
      const isAvailable = await SMS.isAvailableAsync();
      if (isAvailable) {
        await SMS.sendSMSAsync([], `Check this out! ${url}`);
      }

    } catch (error) {
      console.log(error)
    }

  };

  return (
    <View style={styles.container}>
      <View style={styles.rect}>
        <Text style={styles.imageGenerator}>Image Generator</Text>
      </View>
      <TextInput
        style={styles.placeholder}
        onChangeText={text => setApiKey(text)}
        value={apiKey}
        placeholder='Enter your api key here'
      />
      <TextInput
        style={styles.placeholder}
        onChangeText={text => setInput(text)}
        value={input}
        placeholder='Enter your text here'
      />
      <TouchableOpacity style={styles.button} onPress={generateImages}>
        <Text style={styles.generateImages}>Generate Images!</Text>
      </TouchableOpacity>
      <View style={styles.scrollArea}>
        <ScrollView
          horizontal={true}
        >
          {loading ? 
          <ActivityIndicator size='large' color='green' style={{alignSelf:'center', marginLeft: 190}}/> 
          : images.map((image, index) => (
            <View key={index} style={{marginRight: 5}}>
              <TouchableOpacity onPress={() => onShare(image.url)}>
                <Image source={{ uri: image.url }} style={{ width: 400, height: 400, borderRadius: 12}} />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(116,243,244,1)"
  },
  rect: {
    width: 330,
    height: 90,
    backgroundColor: "#7EEBA6",
    shadowColor: "rgba(117,228,143,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 0.5,
    shadowRadius: 0,
    borderWidth: 0,
    borderColor: "#000000",
    borderRadius: 20,
    marginTop: 98,
    alignSelf: "center"
  },
  imageGenerator: {
    color: "rgba(255,255,255,1)",
    fontSize: 40,
    marginTop: 21,
    marginLeft: 13,
    alignSelf: "center"
  },
  placeholder: {
    fontSize:30,
    color: "#121212",
    height: 45,
    width: 360,
    backgroundColor: "rgba(255,255,255,1)",
    letterSpacing: 1,
    borderWidth: 0,
    borderColor: "#000000",
    borderRadius: 48,
    textAlign: "center",
    marginTop: 51,
    alignSelf: "center"
  },
  button: {
    width: 175,
    height: 40,
    backgroundColor: "rgba(0,122,255,1)",
    borderWidth: 0,
    borderColor: "#000000",
    borderRadius: 15,
    marginTop: 18,
    alignSelf: "center",
    justifyContent: 'center',
    alignItems: 'center'
  },
  generateImages: {
    fontSize:20,
    color: "rgba(255,255,255,1)",
    marginTop: 6,
    marginLeft: 8
  },
  scrollArea: {
    width: 400,
    height: 400,
    backgroundColor: "rgba(255,255,255,1)",
    borderWidth: 1,
    borderColor: "rgba(117,228,143,1)",
    borderRadius: 12,
    shadowColor: "rgba(117,228,143,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 0.4,
    shadowRadius: 0,
    marginTop: 46,
    alignSelf: "center"
  },
});

export default MyApp
