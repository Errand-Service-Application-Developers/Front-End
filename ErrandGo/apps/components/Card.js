import React from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'react-native-expo-image-cache';
import moment from 'moment';
import colors from '../config/colors';
import AppText from './AppText';

function Card({ title, subtitle, imageUrl, onPress, postTime, rating = 4, isFavorite = false, category }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        <ImageBackground source={{ uri: imageUrl }} style={styles.image} imageStyle={styles.imageStyle}>
          <TouchableOpacity style={styles.favoriteIcon}>
            <MaterialCommunityIcons name={isFavorite ? 'heart' : 'heart-outline'} size={28} color={isFavorite ? colors.primary : colors.white} />
          </TouchableOpacity>
          <View style={styles.gradientOverlay} />
        </ImageBackground>
        <View style={styles.detailscontainer}>
          <AppText style={styles.title}>{title}</AppText>
          {category && <View style={styles.chip}><Text style={styles.chipText}>{category}</Text></View>}
          <View style={styles.ratingRow}>
            {[...Array(5)].map((_, i) => (
              <MaterialCommunityIcons
                key={i}
                name="star"
                size={18}
                color={i < rating ? colors.gold : colors.light}
                style={{ marginRight: 2 }}
              />
            ))}
          </View>
          <View style={styles.priceRow}>
            <AppText style={styles.subtitle}>{subtitle}</AppText>
            <View style={styles.timeRow}>
              <MaterialCommunityIcons name="timelapse" color={colors.grey} size={16} />
              <Text style={styles.postTime}>{moment(postTime).format('ddd, HH:mm a')}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default Card;

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 14,
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
    padding: 6,
  },
  image: {
    width: '100%',
    height: 140,
    justifyContent: 'flex-start',
  },
  imageStyle: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  gradientOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 50,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.08)',
  },
  favoriteIcon: {
    position: 'absolute',
    top: 12,
    right: 16,
    zIndex: 2,
    backgroundColor: 'rgba(0,0,0,0.18)',
    borderRadius: 20,
    padding: 4,
  },
  detailscontainer: {
    padding: 12,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
    color: colors.dark,
  },
  chip: {
    alignSelf: 'flex-start',
    backgroundColor: colors.light,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginBottom: 6,
  },
  chipText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '600',
  },
  ratingRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  subtitle: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 17,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  postTime: {
    paddingLeft: 4,
    fontSize: 13,
    color: colors.grey,
  },
});