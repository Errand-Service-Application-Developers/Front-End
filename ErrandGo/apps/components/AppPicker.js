import React, { useState } from 'react';
import { StyleSheet,View, TouchableWithoutFeedback, Modal, FlatList } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'



import Screen from '../screens/Screen';
import defaultStyles from '../config/styles';
import AppText from './AppText';
import PickerItem from './PickerItem';




function AppPicker({icon, selectedItem, onSelectItem,items,placeholder,}) {
    const [modalVisible,setModalVisible] = useState(false)



    return (
        <>
        
        <TouchableWithoutFeedback onPress={()=> setModalVisible(true)}>

        <View style={styles.container}> 

        {icon && <MaterialCommunityIcons style={styles.icon} name={icon} size={20} color={defaultStyles.colors.grey} />}


        {selectedItem ? 
        <AppText>{selectedItem.label}</AppText> : 
        <AppText style={styles.placeholder}>{placeholder}</AppText>}

        

        <MaterialCommunityIcons name='chevron-down' size={20} color={defaultStyles.colors.grey} />


        </View>

        </TouchableWithoutFeedback>
        <Modal visible={modalVisible}  animationType='slide'>
            <Screen>
                <View style={{justifyContent:'center',alignItems:'center'}}>
                 
                 <MaterialCommunityIcons name='close' size={25} onPress={()=>setModalVisible(false)}/>

                </View>

            <FlatList 
            data={items}
            keyExtractor={item => item.value.toString()}
            renderItem={({item}) => <PickerItem label={item.label} 
            onPress={()=> { setModalVisible(false); onSelectItem(item); }}/>} />

            </Screen>

        </Modal>
        
        </>

        
        
    );
}



const styles = StyleSheet.create({
    container:{
        width:'100%',
        backgroundColor:defaultStyles.colors.light,
        padding: 15,
        borderRadius:25,
        flexDirection:'row',
        marginVertical: 10,
        
    },

    icon:{
        marginRight:10,

    },
    placeholder:{
        color: defaultStyles.colors.grey,
        flex: 1,
    },
    text:{
        color:defaultStyles.colors.grey,
        flex:1,
    }
    

})


export default AppPicker;
