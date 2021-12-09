import * as React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import { CheckBox } from 'react-native-elements';
import { useChecklist } from 'react-checklist';


const Social_media = (props: any) => {
    let updateRouterData = props.update//: (item_name: string, item_value: any) => void
    const data = [
        { key: 1, label: 'facebook', selected: false },
        { key: 2, label: 'snapchat', selected: false },
        { key: 3, label: 'twitter', selected: false },
        { key: 4, label: 'uber', selected: false },
        { key: 5, label: 'uber_eats', selected: false }
    ]

    const { handleCheck, isCheckedAll, checkedItems } = useChecklist(data, {
        key: 'key',
        keyType: 'string',
    });

    const check_val = (v: any) => {
        let ret = checkedItems.has(v.key);
        updateRouterData(v.label, ret);
        return ret
    }

    return (
        <View>
            <Text>What are you craving right now?</Text>
            <FlatList
                data={data}
                renderItem={
                    (item) => {
                        let i = item.item
                        return (
                            <View  style={styles.checkboxContainer}>
                                <CheckBox
                                    // value={i.selected}
                                    // onValueChange={handleCheck}
                                    onPress={() => updateRouterData(i.label, true)}
                                    style={styles.checkbox}
                                />
                                <Text style={styles.label}>{i.label}</Text>
                            </View>
                        )
                    }
                }
            >
            </FlatList>
        </View>
    )
}

const social_media = (updateFunc: any) => {
    return (
        <Social_media update={updateFunc}></Social_media>
    )
};

export default social_media;

const styles = StyleSheet.create({
    checkboxContainer: {
        flexDirection: "row",
    },
    checkbox: {
        alignSelf: "center",
    },
    label: {
        margin: 8,
    },
});
