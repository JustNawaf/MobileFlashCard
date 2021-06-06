import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'
import tailwind from 'tailwind-rn'
import { QuizInterface } from '../interfaces'

type QuizResultType = {
    id:string,
    quiz:QuizInterface,
    marks:Number,
    total:Number
}

class QuizResult extends Component<QuizResultType> {
    render() {
        const { quiz, marks, total } = this.props;
        return (
            <View style={tailwind('flex-1 justify-evenly items-center')}>
                <Text style={tailwind('text-2xl')}>Quiz Result</Text>
                <View style={tailwind(`w-1/2 h-1/4 rounded-md bg-green-300 justify-evenly items-center`)}>
                    <Text style={tailwind('text-2xl text-white')}>{ marks }</Text>
                    <View style={tailwind('w-1/2 h-1 bg-white')}></View>
                    <Text style={tailwind('text-2xl text-white')}>{ total }</Text>
                </View>
            </View>
        )
    }
}


function mapStateToProps(store:any,props:QuizResultType){
    const id = props.route.params.id;
    const quiz:QuizInterface = store.quizzes[id];
    const total = Object.keys(quiz.questions).length;
    let marks = 0;
    Object.keys(quiz.questions).forEach((index) => {
        const question = quiz.questions[index];
        marks += question.mark
    });
    return {
        quiz,
        marks,
        total
    }
}

export default connect(mapStateToProps)(QuizResult);