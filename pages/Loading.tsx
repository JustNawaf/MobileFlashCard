import React, { Component } from 'react'
import { Text, View } from 'react-native'
import tailwind from 'tailwind-rn'

export default class Loading extends Component {
    render() {
        return (
            <View style={tailwind('w-full h-full bg-black justify-center items-center')}>
                <Text style={tailwind('text-2xl')}> Loading </Text>
            </View>
        )
    }
}
