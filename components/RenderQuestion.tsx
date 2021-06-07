import React, { Component, useState } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux';
import tailwind from 'tailwind-rn';
import { CardInterface } from '../interfaces';

type RenderQuestionType = {
    cardID:string,
    card:CardInterface,
    onAnswerTrueOrFalse:Function,
    onAnswerMultipleChoices:Function
};

class RenderQuestion extends Component<RenderQuestionType> {

    state = {
        viewAnswer:false
    }


    setViewAnswer = (view:boolean) => {
        this.setState({
            viewAnswer:view
        })
    }

    render() {
        const { card, onAnswerTrueOrFalse, onAnswerMultipleChoices } = this.props;
        const { viewAnswer } = this.state;

        return (
            <View style={tailwind('w-full h-full px-4 py-2  items-center')}>
                
                {
                    card && card.type === 'TrueOrFalse' && 
                    (
                        <View style={tailwind('h-1/2 justify-between items-center')}>
                            <TouchableOpacity onPress={() => this.setViewAnswer(!viewAnswer)} style={tailwind(`p-1 rounded-md ${viewAnswer ? 'bg-green-400':'bg-gray-400'}`)}>
                                <Text style={tailwind('text-white')}>View Answer</Text>
                            </TouchableOpacity>
                            <Text style={tailwind('mt-4 text-2xl')}> { card.data.text } </Text>
                            <View style={tailwind('flex flex-row justify-between')}>
                                <TouchableOpacity onPress={() => onAnswerTrueOrFalse(true,card.data.condition === true ? 1:0)}
                                 style={tailwind(`px-4 py-2 ${viewAnswer ? (card.data.condition === true ? 'bg-green-400':'bg-red-400'):'bg-gray-400'} mx-4 rounded-md`)}>
                                    <Text style={tailwind('text-gray-200 text-lg')}>True</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => onAnswerTrueOrFalse(false,card.data.condition === false ? 1:0)}
                                 style={tailwind(`px-4 py-2 ${viewAnswer ? (card.data.condition === false ? 'bg-green-400':'bg-red-400'):'bg-gray-400'} mx-4 rounded-md`)}>
                                    <Text style={tailwind('text-gray-200 text-lg')}>False</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                }
                
                {
                    card && card.type === 'MultipleChoices' && 
                    <View style={tailwind('w-full h-1/2 justify-between items-center')}>
                        <TouchableOpacity onPress={() => this.setViewAnswer(!viewAnswer)} style={tailwind(`p-1 rounded-md ${viewAnswer ? 'bg-green-400':'bg-gray-400'}`)}>
                            <Text style={tailwind('text-white')}>View Answer</Text>
                        </TouchableOpacity>
                        <Text style={tailwind('mt-4 text-2xl')}> { card.data.title } </Text>
                        <View style={tailwind('w-full h-full mt-12 justify-between')}>
                            {
                                card.data.choices.map((choice) => (
                                    <TouchableOpacity key={choice.id} 
                                    onPress={() => onAnswerMultipleChoices(choice.id,card.data.trueChoice === choice.id ? 1:0)} 
                                    style={tailwind(`w-full px-4 py-2 ${viewAnswer ? (choice.id,card.data.trueChoice === choice.id ? 'bg-green-400':'bg-red-400'):'bg-gray-400'} rounded-md`)}>
                                        <Text style={tailwind('text-gray-200 text-lg')}>{ choice.value }</Text>
                                    </TouchableOpacity>
                                ))
                            }
                            
                        </View>
                    </View>
                }

            </View>
        )
    }
}


function mapStateToProps(store:any,props:RenderQuestionType){
    const card = store.cards[props.cardID];
    return {
        card
    }
}


export default connect(mapStateToProps)(RenderQuestion)