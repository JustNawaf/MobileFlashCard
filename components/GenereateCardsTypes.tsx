import React, { Component } from 'react'
import { Text, View, RadioButton } from 'react-native'
import { RadioButton } from 'react-native-paper';



type GenereateCardsTypesType = {
    onTypeSelected:Function,
};

export default class GenereateCardsTypes extends Component<GenereateCardsTypesType> {
    render() {
        return (
            <View>
                <Text> GenereateCardsTypes </Text>
                {/* <RadioButton
                    value="first"
                    status={ checked === 'first' ? 'checked' : 'unchecked' }
                    onPress={() => setChecked('first')}
                />
                <RadioButton
                    value="second"
                    status={ checked === 'second' ? 'checked' : 'unchecked' }
                    onPress={() => setChecked('second')}
                /> */}
            </View>
        )
    }
}
