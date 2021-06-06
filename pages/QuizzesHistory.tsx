import React, { Component } from 'react'
import { QuizInterface } from '../interfaces';
import { FlatList, Text, View } from 'react-native'
import { connect } from 'react-redux';
import tailwind from 'tailwind-rn';;


type QuizzesType = {
    quizzes:Array<QuizInterface>
};

class Quizzes extends Component<QuizzesType> {
    

    renderDeck = (render:any) => {
        const { item } = render;
        return (
            <View style={tailwind('w-full my-2 bg-blue-400 flex justify-center items-center h-36 z-10 text-center rounded-md')}>
                <Text style={tailwind('text-3xl text-white')}>{item.deckID}</Text> 
                <Text style={tailwind('text-3xl text-white')}>Completed : {item.completed ? 'Yes' : 'No'}</Text>    
            </View> 
        )
            
    }

    render() {
        const { quizzes } = this.props;
        return (
            <View style={tailwind('bg-white w-full h-full flex justify-center items-center')}>
                {
                    quizzes.length !== 0 && 
                    <FlatList
                        style={tailwind('flex w-full')}
                        data={quizzes}
                        renderItem={this.renderDeck}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
                    />
                }
                {
                    quizzes.length === 0 && 
                    <View style={tailwind('w-full h-full justify-center items-center')}>
                        <Text style={tailwind('bg-red-100 text-red-300 py-1 px-2 rounded-md')}>You dont have any quizzes yet !</Text>
                    </View>
                }
            </View>
        )
    }
}


function mapStateToProps(store:any, props:QuizzesType){
    const { quizzes } = store;

    return {
        quizzes:Object.keys(quizzes).length !== 0 ? Object.values(quizzes):[]
    };
}

export default connect(mapStateToProps)(Quizzes)

