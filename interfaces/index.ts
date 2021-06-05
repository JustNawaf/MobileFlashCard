export interface DeckInterface {
    id:string,
    title:string,
    cards:[] | Array<CardInterface>
};



export interface CardInterface {
    id:string,
}


export interface Card {
    id: string,
    type: TrueOrFalse | MultipleChoices | MultipleChoicesSum | Fill
}



type TrueOrFalse = {
    id: string,
    trueAnswer: string,
    falseAnswer: string    
};

type MultipleChoices = {
    id: string,
    choices: Array<String>,
    trueChoice: string
};

type MultipleChoicesSum = {
    id: string,
    choices: Array<String>,
    trueChoices: Array<String>

};

type Fill = {
    id: string,
    fill: string
};  
