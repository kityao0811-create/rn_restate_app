import icons from '@/constants/icons';
import images from '@/constants/images';
import { getPropertyById } from '@/lib/appwrite';
import { useAppwrite } from '@/lib/useAppwrite';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Image, Platform, ScrollView, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';

const Property = () => {
    const { height, width } = useWindowDimensions();
    const { id } = useLocalSearchParams<{ id: string }>();

    const { data: property } = useAppwrite({
        fn: getPropertyById,
        params: {
            id: id!
        }
    })

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerClassName='pb-32 bg-white'>
            <View className='relative w-full' style={{ height: height / 2 }}>
                <Image
                    source={{ uri: property?.image }}
                    className='size-full'
                    resizeMode='cover' />

                <Image source={images.whiteGradient} className='absolute top-0 w-full z-40' />

                <View className='z-50 absolute inset-x-7'
                    style={{
                        top: Platform.OS === 'ios' ? 70 : 20
                    }}>
                    <View className='flex flex-row items-center w-full justify-between'>
                        <TouchableOpacity
                            onPress={() => router.back()}
                            className='flex flex-row justify-center items-center bg-primary-200 rounded-full size-11'>
                            <Image source={icons.backArrow} className='size-5' />
                        </TouchableOpacity>

                        <View className='flex flex-row items-center gap-3'>
                            <Image source={icons.heart} className='size-7' tintColor={'#191D31'} />
                            <Image source={icons.send} className='size-7' />
                        </View>
                    </View>
                </View>
            </View>

            <View className='px-5 mt-7 flex gap-2'>
                <Text className="text-2xl font-rubik-extrabold">
                    {property?.name}
                </Text>

                <View className='fkex flex-row items-center gap-3'>
                    <View className='flex flex-row items-center px-4 py-2 bg-primary-100 rounded-full'>
                        <Text className='text-black-200 text-sm mt-1 font-rubik-meidum'>{property?.type}</Text>
                    </View>
                    <View className='flex flex-row items-center gap-2'>
                        <Image source={icons.star} className='size-5' />
                        <Text className='text-black-200 text-sm mt-1 font-medium'>
                            {property?.rating} ({property?.reviews?.length} reviews)
                        </Text>
                    </View>
                </View>
            </View>

            <View className='flex flex-row items-center mt-5 px-5'>
                <View className='flex flex-row items-center justify-center bg-primary-100 rounded-full size-10'>
                    <Image source={icons.bed} className='size-4' />
                </View>
                <Text className='text-black-300 text-sm font-rubik-meidum ml-2'>
                    {property?.bedrooms} Beds
                </Text>

                <View className='flex flex-row items-center justify-center bg-primary-100 rounded-full size-10'>
                    <Image source={icons.bath} className='size-4' />
                </View>
                <Text className='text-black-300 text-sm font-rubik-meidum ml-2'>
                    {property?.bathrooms} Baths
                </Text>

                <View className='flex flex-row items-center justify-center bg-primary-100 rounded-full size-10'>
                    <Image source={icons.area} className='size-4' />
                </View>
                <Text className='text-black-300 text-sm font-rubik-meidum ml-2'>
                    {property?.area} sqft
                </Text>
            </View>
        </ScrollView>
    )
}

export default Property