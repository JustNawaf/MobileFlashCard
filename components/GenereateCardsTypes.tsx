import React, { Component } from 'react'
import { ScrollView, Text, View, TouchableOpacity } from 'react-native'
import tailwind from 'tailwind-rn';



type GenereateCardsTypesType = {
    onTypeSelected:Function,
};



export default class GenereateCardsTypes extends Component<GenereateCardsTypesType> {

    state = {
        type:'',
    };

    getColor = (type:string) => {
        if(this.state.type === type){
            return 'bg-green-300 ';
        }
        return 'bg-gray-200';
    };

    setCheck = (type:string) => {
        this.props.onTypeSelected(type);
        this.setState({
            type
        })
    };

    render() {
        const types = [
            'MultipleChoices',
            'TrueOrFalse'
        ];
        return (
            <View style={tailwind('px-2 py-1')}>
                <Text style={tailwind('text-center')}>Select from those types</Text>
                <ScrollView style={tailwind('self-center w-5/6 mt-4')}
                    showsVerticalScrollIndicator={true}
                    persistentScrollbar={true} 
                    contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} horizontal={true}>
                    {
                        types.map((type,index) => (
                            <TouchableOpacity
                                key={index} 
                                onPress={() => this.setCheck(type)}
                                style={tailwind(`${this.getColor(type)} mx-2 px-4 py-2 rounded-md`)}>
                                <Text style={tailwind('text-gray-600')}>{ type }</Text>
                            </TouchableOpacity>
                        ))
                    }
                </ScrollView>
            </View>
        )
    }
}
