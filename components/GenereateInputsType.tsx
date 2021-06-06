import React, { Component } from 'react'
import { Text, View, ScrollView, TextInput } from 'react-native'
import tailwind from 'tailwind-rn';
import { RadioButton,Button } from 'react-native-paper';
import { connect } from 'react-redux';
import { createCard } from '../actions/Cards';
import { generateID } from '../Helpers';
import { CardInterface } from '../interfaces';
import { addCardToDeck } from '../actions/Shared';
import { addCardST } from '../Helpers/storage';


type GenereateInputsTypeType = {
    selectedType:string,
    dispatch:Function,
    deckID:string
}
class GenereateInputsType extends Component<GenereateInputsTypeType> {
    state = {
        MultipleChoices:{
            title:'',
            choices:[
                {
                    id:1,
                    value:''
                },
                {
                    id:2,
                    value:''
                },
                {
                    id:3,
                    value:''
                },
                {
                    id:4,
                    value:''
                }
            ],
            trueChoice:null
        },
        TrueOrFalse:{
            text:'',
            condition:null
        }
    };

    updateTitle = (title:string) => {
        this.setState(prev => ({
            ...prev,
            MultipleChoices:{
                ...prev.MultipleChoices,
                title
            }
        }))
    }

    updateChoice = (id:Number,value:string) => {
        let index = this.state.MultipleChoices.choices.findIndex((ch) => ch.id === id)
        var newChoices = this.state.MultipleChoices.choices;
        newChoices[index].value = value

        this.setState(prev => ({
            ...prev,
            MultipleChoices:{
                ...prev.MultipleChoices,
                choices:newChoices
            }
        }))
    };
    
    deleteChoice = () => {

    };

    setTrueChoice = (id:Number) => {
        this.setState(prev => ({
            ...prev,
            MultipleChoices:{
                ...prev.MultipleChoices,
                trueChoice:id
            }
        }))
    };

    addTextValue = (text:string) => {
        this.setState(prev => ({
            ...prev,
            TrueOrFalse:{
                ...prev.TrueOrFalse,
                text:text,
            }
        }))
    };

    UpdateTrueOrFalse = (trueOrFalse:boolean) => {
        this.setState(prev => ({
            ...prev,
            TrueOrFalse:{
                ...prev.TrueOrFalse,
                condition:trueOrFalse,
            }
        }))
    }

    submit = () => {
        const { dispatch, deckID, selectedType } = this.props;
        let card:CardInterface = {
            id:generateID(),
            deckID,
            type:selectedType,
            data:this.state[this.props.selectedType]
        };
        dispatch(addCardToDeck(card))
        // addCardST(card);
    }

    render() {
        const { selectedType } = this.props;
        return (
            <View>
                <Text> {selectedType} </Text>
                {
                    selectedType === 'MultipleChoices' &&
                    <RenderMultipleChoices
                        submit={this.submit}
                        setTrueChoice={this.setTrueChoice}
                        updateTitle={this.updateTitle}
                        updateChoice={this.updateChoice}
                        deleteChoice={this.deleteChoice} />
                }

                {
                    selectedType === 'TrueOrFalse' &&
                    <RenderTrueOrFalse 
                        submit={this.submit} 
                        UpdateTrueOrFalse={this.UpdateTrueOrFalse} 
                        addTextValue={this.addTextValue} />
                }
            </View>
        )
    }
}


type RenderMultipleChoicesType = {
    updateTitle:Function,
    updateChoice:Function,
    deleteChoice:Function,
    setTrueChoice:Function,
    submit:Function
};


class RenderMultipleChoices extends Component<RenderMultipleChoicesType> {

    state = {
        trueChoice:null,
    };

    setTrueChoice = (optionID:Number) => {
        this.props.setTrueChoice(optionID)
        this.setState({
            trueChoice:optionID
        })
    }

    render() {
        const { trueChoice } = this.state;

        return (
            <View style={tailwind('w-full')}>
                <View style={tailwind('w-full mx-4')}>
                    <ScrollView>
                        <View style={tailwind('my-1 flex flex-row')}>
                                <TextInput 
                                    onChangeText={(value) => this.props.updateTitle(value)}
                                    style={tailwind('w-5/6 border border-gray-200 p-1')} 
                                    placeholder={'Card Title'}/>
                        </View>
                        <View style={tailwind('my-1 flex flex-row')}>
                            <TextInput 
                                onChangeText={(value) => this.props.updateChoice(1,value)}
                                style={tailwind('w-5/6 border border-gray-200 p-1')} 
                                placeholder={'Option 1'}/>
                            <RadioButton
                                value="1"
                                status={ trueChoice === 1 ? 'checked' : 'unchecked' }
                                onPress={() => this.setTrueChoice(1)}
                            />
                        </View>
                        <View style={tailwind('my-1 flex flex-row')}>
                            <TextInput 
                                onChangeText={(value) => this.props.updateChoice(2,value)}
                                style={tailwind('w-5/6 border border-gray-200 p-1')} 
                                placeholder={'Option 2'}/>
                            <RadioButton
                                value="2"
                                status={ trueChoice === 2 ? 'checked' : 'unchecked' }
                                onPress={() => this.setTrueChoice(2)}
                            />
                        </View>
                        <View style={tailwind('my-1 flex flex-row')}>
                            <TextInput 
                                onChangeText={(value) => this.props.updateChoice(3,value)}
                                style={tailwind('w-5/6 border border-gray-200 p-1')} 
                                placeholder={'Option 3'}/>

                            <RadioButton
                                value="3"
                                status={ trueChoice === 3 ? 'checked' : 'unchecked' }
                                onPress={() => this.setTrueChoice(3)}
                            />
                        </View>
                        <View style={tailwind('my-1 flex flex-row')}>
                            <TextInput 
                                onChangeText={(value) => this.props.updateChoice(4,value)}
                                style={tailwind('w-5/6 border border-gray-200 p-1')} 
                                placeholder={'Option 4'}/>

                            <RadioButton
                                value="4"
                                status={ trueChoice === 4 ? 'checked' : 'unchecked' }
                                onPress={() => this.setTrueChoice(4)}
                            />
                        </View>
                    </ScrollView>
                </View>
                <Button 
                    onPress={() => this.props.submit()}
                    style={tailwind('bg-black mx-6 mt-4')}
                    mode="contained">
                        Submit
                </Button>
            </View>
        )
    }
}


type RenderTrueOrFalseType = {
    addTextValue:Function,
    UpdateTrueOrFalse:Function,
    submit:Function
};
class RenderTrueOrFalse extends Component<RenderTrueOrFalseType> {
    state = {
        cardText:'',
        trueOrFalse:null
    };
    
    onChange = (name:string,value:any) => {
        this.setState({
            [name]:value
        })

        if(name === 'cardText'){
            this.props.addTextValue(value)   
        }else{
            this.props.UpdateTrueOrFalse(value)
        }


    };

    render() {
        const { trueOrFalse } = this.state
        return (
            <View>
                <View style={tailwind('w-full px-6')}>
                    <Text>Card Text</Text>
                    <TextInput 
                        onChangeText={(value) => this.onChange("cardText",value)}
                        style={tailwind('border border-gray-200 mt-2 p-1')} 
                        placeholder={'Card Text'}/>
                </View>
                <View style={tailwind('flex flex-row justify-center')}>
                    <View style={tailwind('flex flex-row items-center')}>
                        <Text>True</Text>
                        <RadioButton
                            value="true"
                            status={ trueOrFalse === true ? 'checked' : 'unchecked' }
                            onPress={() => this.onChange("trueOrFalse",true)}
                        />
                    </View>
                    
                    <View style={tailwind('flex flex-row items-center')}>
                        <Text>False</Text>
                        <RadioButton
                            value="false"
                            status={ trueOrFalse === false ? 'checked' : 'unchecked' }
                            onPress={() => this.onChange("trueOrFalse",false)}
                        />
                    </View>
                </View>
                <Button 
                    onPress={() => this.props.submit()}
                    style={tailwind('bg-black mx-6 mt-4')}
                    mode="contained">
                        Submit
                </Button>
            </View>
        )
    }
}

export default connect()(GenereateInputsType)