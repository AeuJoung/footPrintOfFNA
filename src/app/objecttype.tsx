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

export interface NumOfGenderBySess {
    male : number;
    female : number;
}

export interface LawmakerDetail {
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

    //디테일
    electedRegion : string,   // 당선지역
    englishName : string,     // 영어이름
    birthDate : Date,       // 출생일
    phoneNumber : string,     // 전화번호
    email : string,           // 이메일
    term : number[],            // 임기  (=session)
    mainCareer : string,      // 주요약력
    committee : string[]
    // 소속 상임위 (=stCommit (stCommit은 배열이 아니라 단일))
}