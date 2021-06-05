import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux';
import GenereateInputsType from '../components/GenereateInputsType';
import GenereateCardsTypes from '../components/GenereateCardsTypes';

type AddCardType = {
    id:string,
};

class AddCard extends Component<AddCardType> {
    state = {
        selectedType:null,
    };

    render() {
        const { id } = this.props;
        const { selectedType } = this.state;
        return (
            <View>
                <Text> AddCard {id} </Text>
                <GenereateCardsTypes onTypeSelected={(type:string) => this.setState({selectedType:type})}/>
                {
                    selectedType !== null && <GenereateInputsType />
                }
                
            </View>
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