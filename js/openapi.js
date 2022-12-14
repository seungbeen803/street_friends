// 서울시 유기동물 조회api -> //https://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic?upr_cd=6110000&numOfRows=1000&pageNo=1&serviceKey=yBfIqoxQlERKqS%2BInfyI0%2BFFwfTBCLykO5xVDHRa5bH6Y4oklhcJxRlVfphIDcONn%2FuVbbEBRNorIdzVfSLWtg%3D%3D&_type=json
// 시도코드 upr_cd -> 6110000
// 페이지당 보여줄 개수 numOfRows=1000
// 페이지 번호 pageNo=1
// 서비스키 serviceKey=yBfIqoxQlERKqS%2BInfyI0%2BFFwfTBCLykO5xVDHRa5bH6Y4oklhcJxRlVfphIDcONn%2FuVbbEBRNorIdzVfSLWtg%3D%3D
// 보여줄 타입 _type=json

const link = "https://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic?upr_cd=6110000&numOfRows=1000&pageNo=1&serviceKey=yBfIqoxQlERKqS%2BInfyI0%2BFFwfTBCLykO5xVDHRa5bH6Y4oklhcJxRlVfphIDcONn%2FuVbbEBRNorIdzVfSLWtg%3D%3D&_type=json";

// 비동기로 호출하자
fetch(link).then((response) => response.json()).then((json) => console.log(json));

let getMenuByAPI = (link)=>{
    // XMLHttpRequest 만들자
    let xhr = new XMLHttpRequest();
    
    // callback
    xhr.onreadystatechange = () => {
        if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
            //리퀘스트가 다 끝나서 응답이 왔다면
            console.log("성공!");
            // console.log(xhr.response);
            show(xhr.response); // json 파싱함수 호출
        }else{
            //실패
        }
    }

    // 요청을 보낼 방식, link, 비동기여부 설정하자
    xhr.open("GET", link, true);

    // 요청 전송
    xhr.send();
}

getMenuByAPI(link);

const show = (jsonString) => {
    let json = JSON.parse(jsonString);
    let totalCount = json["response"]["body"]["totalCount"];
    let kinds = [];
    let sexs = [];
    let imgs = [];
    let specialMark = [];
    let careNm = [];
    let neuterYn = [];

    
    let finalCount = 0;
    
    for(let i = 0; i < totalCount; i++){
        let parse = json["response"]["body"]["items"]["item"][i];
        if (parse["processState"] == "보호중") {
            kinds[finalCount] = parse["kindCd"];
            sexs[finalCount] = parse["sexCd"];
            imgs[finalCount] = parse["popfile"];
            specialMark[finalCount] = parse["specialMark"];
            careNm[finalCount] = parse["careNm"];
            neuterYn[finalCount] = parse["neuterYn"];

            finalCount++;
        }
    }


    for(let i = 0; i<totalCount; i++){
        if(sexs[i] == "F"){
            sexs[i] = "암컷";
        }
        else if(sexs[i] == "M") {
            sexs[i] = "수컷";
        }
        else {
            sexs[i] = "성별 모름";
        }
    }

    for(let i = 0; i<totalCount; i++) {
        if(neuterYn[i] == "Y") {
            neuterYn[i] = "O";
        }
        else if(neuterYn[i] == "N"){
            neuterYn[i] = "X";
        }
        else if(neuterYn[i] == "U"){
            neuterYn[i] = "미상";
        }
    }

     
    //totakCount 반복 index 반복
    //div 생성, class
    //imgbox
    //imgboxDiv.innerHTML = a태그 src=kinkds[index]
    //kindbox
    //genderbox


    for(let i = 0; i < finalCount; i++){
        let temp = document.createElement("div");
        temp.classList.add("card");
        temp.innerHTML = `
        <div class="card-description">
            <img class="img" src="${imgs[i]}"/>
            <p class="identity">품종 : ${kinds[i]}</p>
            <p class="identity">성별 : ${sexs[i]}</p>
            <p class="identity">특징 : ${specialMark[i]}</p>
            <p class="identity">중성화 : ${neuterYn[i]}</p>
            <p class="identity" class="identity-last">보호소 : ${careNm[i]}</p>
        </div>`;
        document.querySelector("#home-card").append(temp);

    }

    // for(0~160){
    //     div추가
    //     class주고
    //     kinds[i]
    //     sexs[0]

    // }
    
}

