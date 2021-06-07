import React, { Component } from 'react'
import { Text, View, SafeAreaView, TextInput, TouchableOpacity } from 'react-native'
import tailwind from 'tailwind-rn';
import { RadioButton, Button } from 'react-native-paper';
import { connect } from 'react-redux';
import { createCard } from '../actions/Cards';
import { generateID } from '../Helpers';
import { CardInterface } from '../interfaces';
import { addCardToDeck } from '../actions/Shared';
import { addCardST } from '../Helpers/storage';


type GenereateInputsTypeType = {
    selectedType:string,
    dispatch:Function,
    deckID:string,
    navigation:any,
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
        },
        errorsMutli:{
            validStyle:'border border-gray-300',
            errorStyle:'border border-red-300',
            title:false,
            1:false,
            2:false,
            3:false,
            4:false,
            raido:true
        },
        errorsTrueOrFalse:{
            validStyle:'border border-gray-300',
            errorStyle:'border border-red-300',
            text:false,
            condition:true
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

    updTtitle = (value:string) => {
        if(value === ''){
            this.setState(prev => ({
                ...prev,
                errorsMutli:{
                    ...prev.errorsMutli,
                    title:true
                }
            }));
        }else{
            this.setState(prev => ({
                ...prev,
                errorsMutli:{
                    ...prev.errorsMutli,
                    title:false
                }
            }));
        }

        this.updateTitle(value);

    }

    updChoice = (id:Number,value:string) => {
        if(value === ''){
            this.setState(prev => ({
                ...prev,
                errorsMutli:{
                    ...prev.errorsMutli,
                    [id]:true
                }
            }));
        }else{
            this.setState(prev => ({
                ...prev,
                errorsMutli:{
                    ...prev.errorsMutli,
                    [id]:false
                }
            }));
        }

        this.updateChoice(id,value);
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

    setTrueChoice = (id:Number) => {
        this.setState(prev => ({
            ...prev,
            MultipleChoices:{
                ...prev.MultipleChoices,
                trueChoice:id
            }
        }))

        this.setState(prev => ({
            ...prev,
            errorsMutli:{
                ...prev.errorsMutli,
                raido:false
            }
        }));
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

    aTextValue = (text:string) => {
        if(text === ''){
            this.setState(prev => ({
                ...prev,
                errorsTrueOrFalse:{
                    ...prev.errorsTrueOrFalse,
                    text:true
                }
            }));
        }else{
            this.setState(prev => ({
                ...prev,
                errorsTrueOrFalse:{
                    ...prev.errorsTrueOrFalse,
                    text:false
                }
            }));
        }

        this.addTextValue(text);
    };

    updateTrueOrFalse = (trueOrFalse:boolean) => {
        this.setState(prev => ({
            ...prev,
            TrueOrFalse:{
                ...prev.TrueOrFalse,
                condition:trueOrFalse,
            }
        }))

        this.setState(prev => ({
            ...prev,
            errorsTrueOrFalse:{
                ...prev.errorsTrueOrFalse,
                condition:false
            }
        }));
    }

    checkErrors = () => {
        const { errorsMutli, MultipleChoices } = this.state;

        if(errorsMutli.title || errorsMutli[1] || errorsMutli[2] || errorsMutli[3] || errorsMutli[4] || errorsMutli.raido){
            return true;
        }

        return false;
    }

    checkErrorsTrueOrFalse = () => {
        const { errorsTrueOrFalse, TrueOrFalse } = this.state;

        if(errorsTrueOrFalse.text || errorsTrueOrFalse.condition){
            return true;
        }

        return false;
    }

    submit = () => {
        if(!this.checkErrors() || !this.checkErrorsTrueOrFalse()){
            const { dispatch, deckID, selectedType } = this.props;
            let card:CardInterface = {
                id:generateID(),
                deckID,
                type:selectedType,
                data:this.state[this.props.selectedType]
            };
            dispatch(addCardToDeck(card))
            this.props.navigation.goBack()
        }
    }

    render() {
        const { selectedType } = this.props;
        return (
            <View style={tailwind('mt-6')}>
                <Text style={tailwind('text-center text-lg mb-4')}> {selectedType} </Text>
                {
                    selectedType === 'MultipleChoices' &&
                    <RenderMultipleChoices
                        submit={this.submit}
                        setTrueChoice={this.setTrueChoice}
                        updTtitle={this.updTtitle}
                        updChoice={this.updChoice}
                        checkErrors={this.checkErrors}
                        errorsMutli={this.state.errorsMutli}
                        />
                         
                }

                {
                    selectedType === 'TrueOrFalse' &&
                    <RenderTrueOrFalse 
                        submit={this.submit} 
                        updateTrueOrFalse={this.updateTrueOrFalse}
                        errorsTrueOrFalse={this.state.errorsTrueOrFalse}
                        checkErrorsTrueOrFalse={this.checkErrorsTrueOrFalse}
                        aTextValue={this.aTextValue} />
                }
            </View>
        )
    }
}


type RenderMultipleChoicesType = {
    updTtitle:Function,
    updChoice:Function,
    setTrueChoice:Function,
    submit:Function,
    checkErrors:Function,
    errorsMutli:any
};


class RenderMultipleChoices extends Component<RenderMultipleChoicesType> {

    state = {
        trueChoice:null
    };

    setTrueChoice = (optionID:Number) => {
        this.props.setTrueChoice(optionID)
        this.setState({
            trueChoice:optionID
        })
    }

    render() {
        const { trueChoice } = this.state;
        const { errorsMutli } = this.props;
        console.log(this.props.checkErrors())
        return (
            <View style={tailwind('w-full')}>
                <View style={tailwind('w-full mx-4')}>
                    <SafeAreaView>
                        <SafeAreaView style={tailwind('my-1 flex flex-row')}>
                                <TextInput 
                                    onChangeText={(value) => this.props.updTtitle(value)}
                                    style={tailwind(`w-5/6 ${errorsMutli.title ? errorsMutli.errorStyle:errorsMutli.validStyle} p-1 text-black rounded`)}
                                    placeholderTextColor={'gray'} 
                                    placeholder={'Card Title'}/>
                        </SafeAreaView>
                        <SafeAreaView style={tailwind('my-1 flex flex-row')}>
                            <TextInput 
                                onChangeText={(value) => this.props.updChoice(1,value)}
                                style={tailwind(`w-5/6 ${errorsMutli[1] ? errorsMutli.errorStyle:errorsMutli.validStyle} p-1 text-black rounded`)}
                                placeholderTextColor={'gray'} 
                                placeholder={'Option 1'}/>
                            <RadioButton
                                value="1"
                                status={ trueChoice === 1 ? 'checked' : 'unchecked' }
                                onPress={() => this.setTrueChoice(1)}
                            />
                        </SafeAreaView>
                        <SafeAreaView style={tailwind('my-1 flex flex-row')}>
                            <TextInput 
                                onChangeText={(value) => this.props.updChoice(2,value)}
                                style={tailwind(`w-5/6 ${errorsMutli[2] ? errorsMutli.errorStyle:errorsMutli.validStyle} p-1 text-black rounded`)}
                                placeholderTextColor={'gray'} 
                                placeholder={'Option 2'}/>
                            <RadioButton
                                value="2"
                                status={ trueChoice === 2 ? 'checked' : 'unchecked' }
                                onPress={() => this.setTrueChoice(2)}
                            />
                        </SafeAreaView>
                        <SafeAreaView style={tailwind('my-1 flex flex-row')}>
                            <TextInput 
                                onChangeText={(value) => this.props.updChoice(3,value)}
                                style={tailwind(`w-5/6 ${errorsMutli[3] ? errorsMutli.errorStyle:errorsMutli.validStyle} p-1 text-black rounded`)}
                                placeholderTextColor={'gray'} 
                                placeholder={'Option 3'}/>

                            <RadioButton
                                value="3"
                                status={ trueChoice === 3 ? 'checked' : 'unchecked' }
                                onPress={() => this.setTrueChoice(3)}
                            />
                        </SafeAreaView>
                        <SafeAreaView style={tailwind('my-1 flex flex-row')}>
                            <TextInput 
                                onChangeText={(value) => this.props.updChoice(4,value)}
                                style={tailwind(`w-5/6 ${errorsMutli[4] ? errorsMutli.errorStyle:errorsMutli.validStyle} p-1 text-black rounded`)}
                                placeholderTextColor={'gray'} 
                                placeholder={'Option 4'}/>

                            <RadioButton
                                value="4"
                                status={ trueChoice === 4 ? 'checked' : 'unchecked' }
                                onPress={() => this.setTrueChoice(4)}
                            />
                        </SafeAreaView>
                    </SafeAreaView>
                </View>
                <TouchableOpacity onPress={() => this.props.submit()} 
                    style={tailwind(`self-center mt-4 w-1/2 py-2 ${this.props.checkErrors() ? 'bg-gray-200':'bg-black'} rounded-md`)} disabled={this.props.checkErrors()}>
                    <Text style={tailwind(`text-center ${this.props.checkErrors() ? 'text-gray-300':'text-white'} text-lg`)}>Create</Text>
                </TouchableOpacity>
    
            </View>
        )
    }
}


type RenderTrueOrFalseType = {
    aTextValue:Function,
    errorsTrueOrFalse:any,
    updateTrueOrFalse:Function,
    submit:Function,
    checkErrorsTrueOrFalse:Function
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
            this.props.aTextValue(value)   
        }else{
            this.props.updateTrueOrFalse(value)
        }


    };

    render() {
        const { trueOrFalse } = this.state
        const { errorsTrueOrFalse } = this.props;
        console.log(this.props.checkErrorsTrueOrFalse())
        return (
            <View>
                <View style={tailwind('w-full mb-4')}>
                    <TextInput 
                        style={tailwind(`self-center w-5/6 ${errorsTrueOrFalse.text ? errorsTrueOrFalse.errorStyle:errorsTrueOrFalse.validStyle} p-1 text-black rounded`)}
                        placeholderTextColor={'gray'}
                        onChangeText={(text) => this.onChange("cardText",text)}
                        placeholder={'Card Text'}/>
                </View>
                <View style={tailwind('flex flex-row justify-center')}>
                    <View style={tailwind('flex flex-row items-center')}>
                        <Text style={tailwind('text-lg')}>True</Text>
                        <RadioButton
                            value="true"
                            status={ trueOrFalse === true ? 'checked' : 'unchecked' }
                            onPress={() => this.onChange("trueOrFalse",true)}
                        />
                    </View>
                    
                    <View style={tailwind('flex flex-row items-center')}>
                        <Text style={tailwind('text-lg')}>False</Text>
                        <RadioButton
                            value="false"
                            status={ trueOrFalse === false ? 'checked' : 'unchecked' }
                            onPress={() => this.onChange("trueOrFalse",false)}
                        />
                    </View>
                </View>
                <TouchableOpacity onPress={() => this.props.submit()} 
                    style={tailwind(`self-center mt-4 w-1/2 py-2 ${this.props.checkErrorsTrueOrFalse() ? 'bg-gray-200':'bg-black'} rounded-md`)} disabled={this.props.checkErrorsTrueOrFalse()}>
                    <Text style={tailwind(`text-center ${this.props.checkErrorsTrueOrFalse() ? 'text-gray-300':'text-white'} text-lg`)}>Create</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default connect()(GenereateInputsType)