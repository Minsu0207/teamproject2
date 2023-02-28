"proxy": "http://localhost:8081",
"proxy": "http://3.37.27.133:8081",

{ 터미널 }
npx create - react - app 프로젝트명    리액트 웹 앱 생성
npm install react - router - dom    3페이지 구성을 위해 설치

import styled from 'styled-components';
let Box = styled.div`
  padding : 20px;
`;

{ 사용 함수 }
onclick
Route
BrowserRouter
// URL과 UI를 새로고침 없이 동기화
useState
let [cnt, count] = useState(0)
ex) <span onClick={() => { count(cnt + 1) }}></span>
//함수형 컨포넌트 상태관리가능
useEffect
//앱을 실행했을때 처음 작동하기 위한
useNavigate
// 이벤트 발생시(ex 클릭) url을 조작
Link
//<Link to="/path"></Link>
useParams
//let { id } = useParams();
//url 파라미터에 입력한값 = id로 출력

// for(let [k,v] of Object.entries(item))

probs
//부모 자식 관계를 지정해줘서 state들을 상속받아서 사용가능 ex)probs.db.car_num[0]
redux
//컴포넌트들이 props없이 state공유 가능 외부라이브러리 개편함
//  let name = useSelector((state) => { return state })
// 뒤에 리턴뒤에 필요한것 쓸수있음 retern.abc state는 전부다
{ 진행 과정 }
리액트 웹 생성
페이지 구성


//Link


import axios from 'axios'
import { useState } from 'react'
import { useParams } from 'react-router-dom'



  로컬이 아닌 서버로부터 JSON 파일을 받기 위해서는 Axios, Fetch, XMLHttpRequest를 이용해야 합니다.

  import

let obj = {};
console.log('object 생성 확인 =>', obj)
let obglist = {
  "key1": value1,
  "key2": value2,
  "key3": value3,
}
for (let k in obglist) {
  console.log(k, objlist[k])
  if (k === "filevalue") break
}

for (let [k, v] of Object.entries(objlist)) {
  console.log(k, v);
  if (k === 'filevalue') break
}

let lis = [];
for (let [k, v] of Object.entries(mv)) {
  lis.push(
    <li key={k}>
      <span className='mvLiK'>{k}</span>
      <span className='mvLiV'>{v}</span>
    </li>);
}


      <li>{db[0]?.x_gps}</li>
      <li>{db[0] && db[0].x_gps}</li>

dbname[0]?.filename
1==1 && dbname[0].filename
//백 프론트연결

백

프론트


import axios 

axios
.get(/url)  / / url or port 불러오기
  .then(response => { })  //stats에 담기 뭘할꺼냐
  .catch((error) => { console.error(error) }) //안될때


setProxy.js 파일을 생성
  (필요한진 모르겠음)

오브젝트 타입 읽기
JSON.stringify("파일명")

  


  * 오답 노트
첫 랜더링시 빈값이면 아예 다 리딩을안해버려서,
  state 변수에 빈[] 배열로 해놓고 해결함.


  // let test = [1, 2, 3, 4]
  // let test2 = []

  // let abc = test.map((a) => {
  //   if (a > 2) {
  //     test2.push(a);
  //   }
  // })



const result = Object.values(data.reduce((acc, [userId, lat, lon, recordTime]) => {
  if (!acc[userId] || acc[userId].recordTime < recordTime) {
    acc[userId] = { userId, lat, lon, recordTime };
  }
  return acc;
}, {}));

console.log(result);
// Output: 
// [
//   { userId: '1001', lat: '35.16915512084961', lon: '129.14007568359375', recordTime: '2023-02-27 23:33:26' },
//   { userId: '1002', lat: '35.16895294189453', lon: '129.14085388183594', recordTime: '2023-02-27 23:33:13' }
// ]
