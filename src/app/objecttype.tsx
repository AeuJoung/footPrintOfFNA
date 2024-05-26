export interface Lawmaker {
    code : string; //의원 코드
    name : string; 
    gender : string;
    img : string;
    party : {  //정당 정보
        name : string;
        color : string;
    }
    stCommit : string; //상임위
    session : number[]; //국회 회기 리스트
    curSession : number; //현재 회기

    userCheck : boolean;
}

export interface SelectBoxLawmaker {
    code : string;
    imgSrc : string;
}

export interface NumOfGenderBySess {
    male : number;
    female : number;
}