import React from 'react';
import { Modal, View, Text, StyleSheet, FlatList } from 'react-native';
import { COLOR, commonStyles, hp, TEXT_STYLE, wp } from '../../enums/StyleGuide';
import { CustomIcon, Label, Pressable } from '../reuseables';
import { useDispatch, useSelector } from 'react-redux';
import { addLocation, removeLocation } from '../../redux/action/Action';


const AllLocationModal = ({ visible, setVisible }) => {
  const pinLocations = useSelector(({ locationReducer }) => locationReducer);
  const dispatch = useDispatch()

  const closeModal = () => {
    setVisible(false);
  };

  const handleRemoveLocation = (item) => {
    dispatch(removeLocation(item?.id))
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={closeModal}
    >
      <View style={[styles.modalView, { pointerEvents: visible ? 'auto' : 'none' }]}>
        <View style={styles.modalContent}>
          <Pressable style={styles.iconContainer} onPress={closeModal}>
            <CustomIcon name={"squared-cross"} family='Entypo' color={COLOR.red} size={hp(3)} />
          </Pressable>
          <Text style={styles.modalText}>All Locations</Text>

          <FlatList
            data={pinLocations}
            ListEmptyComponent={<Label>No location found....</Label>}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.flatlistContent}
            renderItem={({ item, }) => (
              <View key={item?.id} style={styles.locationCard}>
                <Label style={styles.locationName}>{item?.title}</Label>
                <Pressable onPress={() => handleRemoveLocation(item)}>
                  <CustomIcon name={"cross"} family='Entypo' color={COLOR.red} size={hp(3)} />
                </Pressable>
              </View>
            )}
          />
        </View>
      </View>
    </Modal>
  );
};

export default AllLocationModal;

const styles = StyleSheet.create({
  modalView: {
    maxHeight: hp(50),
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: "5%",
    borderTopLeftRadius: hp(3),
    borderTopRightRadius: hp(3),
    shadowColor: COLOR.black,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalContent: {},
  modalText: {
    ...TEXT_STYLE.smallTitleBold,
    marginVertical: hp(1),
    textAlign: 'center',
    color: COLOR.red
  },
  iconContainer: {
    alignSelf: 'flex-end',
  },
  locationCard: {
    ...commonStyles.justifyView_m1,
    paddingHorizontal: wp(2)
  },
  locationName: {
    ...TEXT_STYLE.bigTextSemiBold
  },
  flatlistContent: {
    paddingVertical: hp(2)
  }
});
