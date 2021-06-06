import React, { Component } from 'react'
import { Text, View, SafeAreaView } from 'react-native'
import { connect } from 'react-redux';
import GenereateInputsType from '../components/GenereateInputsType';
import GenereateCardsTypes from '../components/GenereateCardsTypes';
import tailwind from 'tailwind-rn';

type AddCardType = {
    id:string,
};

class AddCard extends Component<AddCardType> {
    state = {
        selectedType:'',
        data:null,
    };

    render() {
        const { id } = this.props;
        const { selectedType } = this.state;
        return (
            <SafeAreaView style={tailwind('flex-1 justify-around')}>
                <GenereateCardsTypes onTypeSelected={(type:string) => this.setState({selectedType:type})}/>

                {
                    selectedType !== null 
                    && 
                    <GenereateInputsType deckID={id} selectedType={selectedType} />
                }
                
            </SafeAreaView>
        )
    }
}



function mapStateToProps(store:any,props:any){
    console.log(props)
    const id = props.route.params.id;

    return {
        id
    }
}


export default connect(mapStateToProps)(AddCard);