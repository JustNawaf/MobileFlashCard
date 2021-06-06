export interface DeckInterface {
    id:string,
    title:string,
    cardsIds:[] | Array<string>
};



export interface CardInterface {
    id: string,
    deckID:string,
    // type: 'TrueOrFalse' | 'MultipleChoices',
    cardsIds:Array<string>,
    type:string,
    data:TrueOrFalse | MultipleChoices
}

export interface QuizInterface {
    id: string,
    deckID:string,
    questions:Question
    completed:boolean,
}


type TrueOrFalse = {
    id: string,
    text:string,
    condition:boolean 
};

type MultipleChoices = {
    id: string,
    choices: Array<Choice>,
    trueChoice: Number
};

type Choice = {
    id:Number,
    value:string,
}


type Question = {
    [key:string]:{
        cardID:string,
        answer:any,
        mark:Number
    }
};