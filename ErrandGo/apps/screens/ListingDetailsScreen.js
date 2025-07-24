import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, FlatList, Dimensions } from 'react-native';
import { Image } from 'react-native-expo-image-cache';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Constants from 'expo-constants';

import AppText from '../components/AppText';
import colors from '../config/colors';
import ListItem from '../components/ListItem';
import useCurrentUser from '../hooks/useCurrentUser';
import screenRoute from '../navigation/route';
import TaskAcceptButton from '../components/TaskAcceptButton';
import TaskStatusButton from '../components/TaskStatusButton';
import listingsApi from '../api/listings';
import useAuth from '../hooks/useAuth';

const { width } = Dimensions.get('window');

function ListingDetailsScreen({ navigation, route }) {
    const { user } = useAuth();
    const [request, setRequest] = useState(" ACCEPT ");
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    
    const listing = route.params;
    const poster = useCurrentUser(listing.user_id);
    const status = listing.task_status;
    const images = listing.images || [];

    const handleRequest = async () => {
        if (status === 'COMPLETED') return;
        else if (status === 'IN PROGRESS') return;

        await listingsApi.makeRequest(listing.id, listing.user_id);
        setRequest("REQUEST SENT");
    };

    const renderThumbnail = ({ item, index }) => (
        <TouchableOpacity
            style={[
                styles.thumbnailContainer,
                selectedImageIndex === index && styles.selectedThumbnail
            ]}
            onPress={() => setSelectedImageIndex(index)}
        >
            <Image
                style={styles.thumbnail}
                uri={item.image_url}
            />
            {selectedImageIndex === index && (
                <View style={styles.selectedOverlay}>
                    <MaterialCommunityIcons name="check-circle" size={20} color={colors.primary} />
                </View>
            )}
        </TouchableOpacity>
    );

    return (
        <ScrollView style={styles.screen}>
            {/* Main Image Display */}
            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    uri={images.length > 0 ? images[selectedImageIndex]?.image_url : null}
                />
                {images.length > 1 && (
                    <View style={styles.imageCounter}>
                        <Text style={styles.counterText}>
                            {selectedImageIndex + 1} / {images.length}
                        </Text>
                    </View>
                )}
            </View>

            {/* Image Thumbnails */}
            {images.length > 1 && (
                <View style={styles.thumbnailSection}>
                    <Text style={styles.thumbnailTitle}>Images ({images.length})</Text>
                    <FlatList
                        data={images}
                        renderItem={renderThumbnail}
                        keyExtractor={(item, index) => index.toString()}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.thumbnailList}
                    />
                </View>
            )}

            <View style={styles.detailscontainer}>
                <View style={styles.headerRow}>
                    <View style={{ flex: 1 }}>
                        <AppText style={styles.title}>{listing.title}</AppText>
                    </View>
                    <AppText style={styles.price}>Ghc {listing.price}</AppText>
                </View>
                
                <Text style={styles.description}>{listing.description}</Text>

                <View style={styles.statusContainer}>
                    <TaskStatusButton title={status} />
                </View>

                <View style={styles.actionRow}>
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity onPress={() => navigation.navigate(screenRoute.MESSAGES, { 'reviews': listing.reviews, 'item_id': listing.id })}>
                            <Text style={styles.reviewsLink}>Reviews</Text>
                        </TouchableOpacity>
                    </View>

                    {user.user_id !== poster.id && (
                        <View style={styles.AcceptButton}>
                            <TaskAcceptButton title={request} onPress={() => handleRequest()} />
                        </View>
                    )}
                </View>
            </View>

            <View style={styles.itemcontainer}>
                <ListItem
                    image={require('../assets/profile.jpg')}
                    title={poster.username}
                    subtitle={poster.post_count + " tasks"}
                    showChevrons
                    style={styles.style}
                    onPress={() => navigation.navigate(screenRoute.USER_HISTORY, poster)}
                />
            </View>
        </ScrollView>
    );
}
export default ListingDetailsScreen;

const styles = StyleSheet.create({
    screen: {
        backgroundColor: colors.light,
        flex: 1,
    },
    imageContainer: {
        position: 'relative',
    },
    image: {
        width: '100%',
        height: width * 0.8, // Make it more square/modern
        backgroundColor: colors.light,
    },
    imageCounter: {
        position: 'absolute',
        top: 16,
        right: 16,
        backgroundColor: 'rgba(0,0,0,0.6)',
        borderRadius: 12,
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    counterText: {
        color: colors.white,
        fontSize: 12,
        fontWeight: '600',
    },
    thumbnailSection: {
        backgroundColor: colors.white,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.light,
    },
    thumbnailTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.dark,
        marginBottom: 12,
        paddingHorizontal: 16,
    },
    thumbnailList: {
        paddingHorizontal: 12,
    },
    thumbnailContainer: {
        marginHorizontal: 4,
        borderRadius: 8,
        overflow: 'hidden',
        position: 'relative',
    },
    thumbnail: {
        width: 60,
        height: 60,
        borderRadius: 8,
    },
    selectedThumbnail: {
        borderWidth: 2,
        borderColor: colors.primary,
    },
    selectedOverlay: {
        position: 'absolute',
        top: 2,
        right: 2,
        backgroundColor: colors.white,
        borderRadius: 10,
    },
    detailscontainer: {
        backgroundColor: colors.white,
        padding: 16,
        marginTop: 8,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.dark,
        lineHeight: 24,
    },
    price: {
        fontSize: 18,
        color: colors.primary,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 15,
        color: colors.grey,
        lineHeight: 22,
        marginBottom: 16,
    },
    statusContainer: {
        marginBottom: 16,
    },
    actionRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    reviewsLink: {
        fontSize: 16,
        color: colors.primary,
        fontWeight: '500',
        paddingLeft: 5,
    },
    AcceptButton: {
        width: '50%',
    },
    itemcontainer: {
        backgroundColor: colors.white,
        marginTop: 8,
        paddingVertical: 8,
    },
    style: {
        borderRadius: 0,
    },
});