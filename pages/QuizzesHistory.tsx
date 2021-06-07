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
                // <View style={tailwind('h-32 my-1 px-4 py-2 border-b border-gray-100')}>
                //     <Text style={tailwind('text-gray-600 text-center text-2xl bg-gray-200 rounded-md')}>{item.title}</Text>
                //     <View style={tailwind('flex flex-row justify-between items-center mt-4')}>
                //         <View style={tailwind('bg-green-200 w-1/3 mx-2 rounded-md')}>
                //             <Text style={tailwind('text-center text-lg text-white')}>{item.cardsIds.length}</Text>
                //             <Text style={tailwind('text-center text-lg text-white')}>Cards</Text>
                //         </View>
                //         <View style={tailwind('bg-blue-200 w-1/3 mx-2 rounded-md')}>
                //             <Text style={tailwind('text-center text-lg text-white')}>{item.cardsIds.length}</Text>
                //             <Text style={tailwind('text-center text-lg text-white')}>Quizzes</Text>
                //         </View>
                //     </View> 
                // </View>
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
                        // contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
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

