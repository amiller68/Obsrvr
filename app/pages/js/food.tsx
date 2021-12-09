import * as React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import { CheckBox } from 'react-native-elements';
import { useChecklist } from 'react-checklist';


const Food = (props: any) => {
    let updateRouterData = props.update//: (item_name: string, item_value: any) => void
    const data = [
        { key: 1, label: 'doughnut', selected: false },
        { key: 2, label: 'dumpling', selected: false },
        { key: 3, label: 'hamburger', selected: false },
        { key: 4, label: 'meat_spaghetti', selected: false },
        { key: 5, label: 'ramen_meat', selected: false },
        { key: 6, label: 'ramen_vegetable', selected: false },
        { key: 7, label: 'seafood_spaghetti', selected: false },
        { key: 8, label: 'pizza', selected: false },
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

const food = (updateFunc: any) => {
    return (
        <Food update={updateFunc}></Food>
    )
};

export default food;

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
