import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, ScrollView, TouchableOpacity, Text, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';


import Screen from './Screen';
import Card from '../components/Card';
import colors from '../config/colors';
import route from '../navigation/route';
import listingApi from '../api/listings';
import AppText from '../components/AppText';
import AppButtons from '../components/AppButtons';
import ActivityIndicator from '../components/ActivityIndicator';
import SkeletonLoader from '../components/SkeletonLoader';





function ListingScreen({navigation}) {


const [listings, setListings] = useState([]);
const [error, setError] = useState(false);
const [loading, setLoading] = useState(false);
const [refreshing, setRefreshing] = useState(false);
const [categories, setCategories] = useState([]);
const [selectedCategory, setSelectedCategory] = useState(null);
const [sortOption, setSortOption] = useState('date');
const [search, setSearch] = useState('');

useEffect(() => {
  loadListings();
  loadCategories();
}, []);

const loadListings = async () => {
  setLoading(true);
  const response = await listingApi.getListings();
  setLoading(false);
  if (!response.ok) return setError(true);
  setError(false);
  setListings(response.data);
};

const loadCategories = async () => {
  const response = await listingApi.getCategories();
  if (response.ok) setCategories(response.data);
};

const handleCategorySelect = (category) => {
  setSelectedCategory(category);
};

const handleSortChange = (option) => {
  setSortOption(option);
};

const getFilteredSortedListings = () => {
  let filtered = selectedCategory
    ? listings.filter((l) => l.category === selectedCategory.id)
    : listings;
  if (search.trim()) {
    filtered = filtered.filter((l) => l.title.toLowerCase().includes(search.trim().toLowerCase()));
  }
  if (sortOption === 'price') {
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  } else {
    filtered = [...filtered].sort((a, b) => new Date(b.date_created) - new Date(a.date_created));
  }
  return filtered;
};

  return (
    <>
      <ActivityIndicator visible={loading} />
      <Screen style={styles.screen}>
        {/* Search Bar */}
        <View style={styles.searchBarContainer}>
          <TextInput
            style={styles.searchBar}
            placeholder="Search listings..."
            value={search}
            onChangeText={setSearch}
            placeholderTextColor={colors.grey}
          />
        </View>
        {/* Filter/Sort Bar */}
        <View style={styles.filterSortBar}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
            <TouchableOpacity
              style={[styles.filterChip, !selectedCategory && styles.selectedChip]}
              onPress={() => handleCategorySelect(null)}
            >
              <Text style={[styles.filterText, !selectedCategory && styles.selectedText]}>All</Text>
            </TouchableOpacity>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                style={[styles.filterChip, selectedCategory?.id === cat.id && styles.selectedChip]}
                onPress={() => handleCategorySelect(cat)}
              >
                <Text style={[styles.filterText, selectedCategory?.id === cat.id && styles.selectedText]}>{cat.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <View style={styles.sortBar}>
            <TouchableOpacity
              style={[styles.sortChip, sortOption === 'date' && styles.selectedChip]}
              onPress={() => handleSortChange('date')}
            >
              <MaterialCommunityIcons name="sort-clock-descending" size={18} color={sortOption === 'date' ? colors.white : colors.dark} />
              <Text style={[styles.filterText, sortOption === 'date' && styles.selectedText]}>Newest</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.sortChip, sortOption === 'price' && styles.selectedChip]}
              onPress={() => handleSortChange('price')}
            >
              <MaterialCommunityIcons name="sort-numeric-descending" size={18} color={sortOption === 'price' ? colors.white : colors.dark} />
              <Text style={[styles.filterText, sortOption === 'price' && styles.selectedText]}>Price</Text>
            </TouchableOpacity>
          </View>
        </View>
        {loading ? (
          <SkeletonLoader count={5} />
        ) : (
          <>
            {error && (
              <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                <AppText>Couldn't retrieve posts from server</AppText>
                <View style={{ padding: 10 }}>
                  <AppButtons title="Retry" onPress={loadListings} color="primary" />
                </View>
              </View>
            )}
            <FlatList
              data={getFilteredSortedListings()}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <Card
                  title={item.title}
                  subtitle={'Ghc ' + item.price}
                  imageUrl={item.image_url}
                  postTime={item.date_created}
                  category={item.category_name || categories.find(c => c.id === item.category)?.name}
                  rating={item.rating || 4}
                  isFavorite={item.isFavorite || false}
                  onPress={() => navigation.navigate(route.LISTING_DETAILS, item)}
                />
              )}
              refreshing={refreshing}
              onRefresh={() => {
                loadListings();
              }}
            />
          </>
        )}
      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('Add')}
        activeOpacity={0.8}
      >
        <MaterialCommunityIcons name="plus" size={32} color={colors.white} />
      </TouchableOpacity>
    </Screen>
    </>
  );
}



const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
    padding: 0,
  },
  searchBarContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 4,
    backgroundColor: colors.white,
  },
  searchBar: {
    backgroundColor: colors.light,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    color: colors.dark,
    borderWidth: 1,
    borderColor: colors.light,
  },
  filterSortBar: {
    flexDirection: 'column',
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.light,
    paddingBottom: 8,
    paddingHorizontal: 10,
  },
  filterScroll: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },
  filterChip: {
    backgroundColor: colors.light,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginRight: 8,
  },
  selectedChip: {
    backgroundColor: colors.primary,
  },
  filterText: {
    fontSize: 14,
    color: colors.dark,
    fontWeight: '500',
  },
  selectedText: {
    color: colors.white,
    fontWeight: '700',
  },
  sortBar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortChip: {
    backgroundColor: colors.light,
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginLeft: 6,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    backgroundColor: colors.primary,
    borderRadius: 32,
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 10,
  },
});

export default ListingScreen;


