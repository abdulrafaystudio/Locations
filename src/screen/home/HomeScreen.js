import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import MapView, { Marker } from 'react-native-maps';
import { addLocation } from '../../redux/action/Action';
import { AllLocationModal, CustomIcon, Pressable } from '../../components';
import { COLOR, hp } from '../../enums/StyleGuide';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const pinLocations = useSelector(({ locationReducer }) => locationReducer);
  const [showModal, setShowModal] = useState(false);



  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const handleMapPress = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    const randomId = (Math.floor(100000 + Math.random() * 900000)).toString();
    const data = {
      id: randomId,
      latitude,
      longitude,
      title: `Location ${pinLocations.length + 1}`,
    };

    dispatch(addLocation(data));
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        initialRegion={region}
        onPress={handleMapPress}
        onRegionChangeComplete={(region) => setRegion(region)}
      >
        {pinLocations.map((item) => (
          <Marker
            key={item?.id}
            coordinate={{
              latitude: item?.latitude,
              longitude: item?.longitude,
            }}
            title={item?.title}
          />
        ))}
      </MapView>

      <Pressable style={styles.iconContainer} onPress={handleShowModal}>
        <CustomIcon name={"magnifying-glass-location"} family='FontAwesome6' color={COLOR.white} size={hp(3)} />
      </Pressable>

      <AllLocationModal
        visible={showModal}
        setVisible={setShowModal}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconContainer: {
    position: 'absolute',
    top: "2%",
    right: "2%",
    zIndex: 1,
    backgroundColor: COLOR.red,
    padding: "2%",
    borderRadius: hp(4)
  },
});
