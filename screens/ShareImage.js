import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text, Image } from "react-native";
import EntypoIcon from "react-native-vector-icons/Entypo";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import * as SMS from 'expo-sms';
import axios from 'axios';
import {OPENAI_API_KEY, BITLY_API_KEY} from '@env'


function ShareImage({ route, navigation }) {
  const {selectedImage} = route.params
  const shortenUrl = async (longUrl) => {
    try {
      const response = await axios.post(
        'https://api-ssl.bitly.com/v4/shorten',
        {
          long_url: longUrl,
        },
        {
          headers: {
            'Authorization': `Bearer ${BITLY_API_KEY}`,
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
      <Image style={styles.image} source={{uri: selectedImage}}/>
      <View style={styles.rect2}>
        <Text style={styles.imageGenerator1}>Image Generator</Text>
      </View>
      <View style={styles.rect3}>
      <TouchableOpacity onPress={() => onShare(selectedImage)}>
        <Text style={styles.share}>SHARE</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(116,243,244,1)"
  },
  image: {
    width: 400,
    height: 454,
    backgroundColor: "rgba(255,255,255,1)",
    borderWidth: 0,
    borderColor: "#000000",
    borderRadius: 16,
    marginTop: 208,
    alignSelf: 'center'
  },
  rect2: {
    width: 450,
    height: 160,
    backgroundColor: "rgba(126,235,166,1)",
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
    marginTop: -684,
    alignSelf: 'center'
  },
  imageGenerator1: {
    color: "rgba(255,255,255,1)",
    fontSize: 50,
    marginTop: 50,
    alignSelf: 'center'
  },
  rect3: {
    width: 140,
    height: 63,
    backgroundColor: "rgba(126,235,166,1)",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,1)",
    borderRadius: 26,
    marginTop: 553,
    alignSelf: 'center'
  },
  share: {
    color: "rgba(255,255,255,1)",
    fontSize: 29,
    marginTop: 14,
    alignSelf: 'center'
  }
});

export default ShareImage;
