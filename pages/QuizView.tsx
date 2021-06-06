import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { CardInterface, QuizInterface } from '../interfaces'
import RenderQuestion from '../components/RenderQuestion';
import { addAnswerMultipleChoices, addAnswerTrueOrFalse, setCompleted } from '../actions/Quizzes';

type QuizViewType = {
    id:string,
    quiz:QuizInterface,
    current:any,
    total:any,
    question:any,
    dispatch:Function
}

class QuizView extends Component<QuizViewType> {

    state = {
        showAnswer:false
    };

    toQuestion = () => {
        const { current, total, quiz, dispatch } = this.props;
        
        if(current === total){
            dispatch(setCompleted(quiz.id))
            this.props.navigation.navigate('QuizResult', {
                id:quiz.id
             });
        }else{
            this.props.navigation.navigate('QuizView', {
                current:current + 1,
                total:total, 
                id:quiz.id
             });
        }

    };

    onAnswerTrueOrFalse = (answer:boolean,mark:0|1) => {
        const { dispatch, question, quiz } = this.props;
        dispatch(addAnswerTrueOrFalse(quiz.id,question.cardID,answer,mark));
        this.toQuestion();
    };

    onAnswerMultipleChoices = (answer:Number,mark:0|1) => {
        const { dispatch, question, quiz } = this.props;
        dispatch(addAnswerMultipleChoices(quiz.id,question.cardID,answer,mark));
        this.toQuestion();
    };

    render() {
        const { quiz, current, question } = this.props;
        return (
            <View>
                <RenderQuestion onAnswerTrueOrFalse={this.onAnswerTrueOrFalse} onAnswerMultipleChoices={this.onAnswerMultipleChoices} cardID={question.cardID}/>
                <TouchableOpacity onPress={() => this.answerQuestion() }>
                    <Text>To Question</Text>
                </TouchableOpacity>
            </View>
        )
    }
}


function mapStateToProps(store:any,props:QuizViewType){
    const id = props.route.params.id;
    const current = props.route.params.current;
    const total = props.route.params.total;
    const quiz = store.quizzes[id];
    const question = quiz.questions[Object.keys(quiz.questions)[current - 1]]
    return {
        quiz,
        current,
        total,
        question
    }
}

export default connect(mapStateToProps)(QuizView);
