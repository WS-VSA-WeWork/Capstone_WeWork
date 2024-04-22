# 2023 Capstone Design Project

<div>
  <img width="800" alt="image" src="https://github.com/WS-VSA-WeWork/Capstone_WeWork/assets/122766043/b63821fd-8c30-46c0-9739-8ea028c24cbb">
</div>
<br>

## 서비스 개요
대학교 술집 단체 대관 진행 시 전화를 돌리거나 확인해야하는 번거로움을 가지고있다. 본 팀은 이 문제점을 인지하고 개선하기 위해 대학교 술집 단체 대관 서비스 '끼리끼리'를 개발하였다. 사용자 입장에서 시간과 인원을 선택하면 식당이 자동 필터링되며 chatGPT를 이용해서 리뷰를 요약하는 서비스를 제공한다. 사장님에게는 예약내역뿐만 아니라 관련 인사이트를 보여주며 편의를 제공한다.  
<br>

## 팀 소개
<p>팀명 : weWork</p>
<p>프로젝트 기간 : 2023.09 ~ 2023.12</p>

|    소속    |          전공           |  이름  |
| :--------: | :---------------------: | :----: |
| 동국대학교 | 정보통산공학과 | 이상민 |
| 동국대학교 | 통계학과 | 김동완 |
| 동국대학교 | 정보통신공학과 | 박수련 |
| 동국대학교 | 컴퓨터공학과 | 안도영 |
<br>

## 기술스택
<h3>Environment</h3>
<div style="display:flex; flex-direction:column;">
  <div style="flex-direction:column; width:50%; ">
    <div style="display:flex;">
      <img style="margin-right:5px;" 		src="https://img.shields.io/badge/visual studio code-007ACC.svg?style=for-the-badge&logo=visual studio code&logoColor=white" />
      <img style="margin-right:5px;" src="https://img.shields.io/badge/expo-000020.svg?style=for-the-badge&logo=expo&logoColor=white" />
      <img style="margin-right:5px;" src="https://img.shields.io/badge/git-F05032.svg?style=for-the-badge&logo=git&logoColor=white" />
      <img style="margin-right:5px;" src="https://img.shields.io/badge/github-181717.svg?style=for-the-badge&logo=github&logoColor=white" />
  </div>
  <h3>Development</h3>
  <div style="display:flex;">
    <img src="https://img.shields.io/badge/react native-20232a.svg?style=for-the-badge&logo=react&logoColor=61DAFB" />
    <img style="margin-right:5px;" src="https://img.shields.io/badge/javascript-F7DF1E.svg?style=for-the-badge&logo=javascript&logoColor=black" />
    <img style="margin-right:5px;" src="https://img.shields.io/badge/redux-691A99.svg?style=for-the-badge&logo=redux&logoColor=white" />
    <img style="margin-right:5px;" src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white" />
  </div>
    <h3>Communication</h3>
  <div style="display:flex;">
    <img style="margin-right:5px;" src="https://img.shields.io/badge/Notion-F3F3F3.svg?style=for-the-badge&logo=notion&logoColor=black" />
    <img style="margin-right:5px;" src="https://img.shields.io/badge/google meet-00897B.svg?style=for-the-badge&logo=google meet&logoColor=white" />
  </div>
</div>

<br>


## 주요 기능
### 🍺 주점 검색

- 메인페이지에서 날짜와 인원을 선택하면 단체 예약이 가능한 주점의 목록을 조회할 수 있으며, 카드를 클릭하면 주점의 상세페이지로 이동한다.
- 상세페이지에는 가게 정보, AI가 정리한 후기, 예약 가능한 시간의 타임테이블 등을 확인할 수 있다. 예약 시간 선택 후, 예약하기 버튼을 누르면 예약 페이지로 넘어간다.
- 1차, 2차로 나뉘는 단체 예약 특성상 타임테이블에서 최대 2시간까지만 선택할 수 있도록 제한했다.

<div>
  <img width="200" alt="image" src="https://github.com/WS-VSA-WeWork/Capstone_WeWork/assets/83868210/c8a5458e-474a-4ddb-8710-6b8f1473ab2b">
  <img width="200" alt="image" src="https://github.com/WS-VSA-WeWork/Capstone_WeWork/assets/83868210/8808d879-1c8d-4da5-85e1-12e14adbe3fb">
  <img width="200" alt="image" src="https://github.com/WS-VSA-WeWork/Capstone_WeWork/assets/83868210/955474d3-44ae-4324-912f-3f700f124a5a">
  <img width="200" alt="image" src="https://github.com/WS-VSA-WeWork/Capstone_WeWork/assets/83868210/e8b6bc0b-62cb-4556-b7f3-77726e7b49f2">
  <img width="200" alt="image" src="https://github.com/WS-VSA-WeWork/Capstone_WeWork/assets/83868210/0568aaac-6b30-4118-9b19-5431175c7c2d">
</div>
<br>


### 🍺 주점 예약

- 메인페이지와 상세페이지에서 선택한 것을 기반으로 예약이 진행되며, 예약금을 결제하면 예약이 확정된다.
<div>
  <img width="200" alt="image" src="https://github.com/WS-VSA-WeWork/Capstone_WeWork/assets/83868210/3c52ae1c-3a39-4dbc-bc30-0430ceee4dc2">
  <img width="220" alt="image" src="https://github.com/WS-VSA-WeWork/Capstone_WeWork/assets/83868210/f7cc99c0-53ef-42ed-bece-cd1aea1cd923">
</div>
<br>


### 🍺 사장님의 식당 관리
- 달력에서 식당의 날짜별 예약건수, 주간 예약건수 그래프, 예약 리스트, 리뷰 등을 확인할 수 있다. 
<div>
  <img width="200" alt="image" src="https://github.com/WS-VSA-WeWork/Capstone_WeWork/assets/83868210/bd1d5617-e7e3-496e-baac-492b8a9e1c41">
  <img width="200" alt="image" src="https://github.com/WS-VSA-WeWork/Capstone_WeWork/assets/83868210/5fbcd25a-c23c-4913-86f7-d7cc9af310c1">
  <img width="200" alt="image" src="https://github.com/WS-VSA-WeWork/Capstone_WeWork/assets/83868210/6bf0a25c-9040-404a-9043-4ff8c4646121">
  <img width="200" alt="image" src="https://github.com/WS-VSA-WeWork/Capstone_WeWork/assets/83868210/27ae1b6e-1b12-453e-846a-8b6fe6fcdbef">
</div>
<br>

### 🍺 그 외 페이지 
- 이용자의 마이페이지에서 예약 일정 목록을 확인할 수 있으며 지난 예약 내역에 대한 리뷰을 작성할 수 있다.
<div>
  <img width="200" alt="image" src="https://github.com/WS-VSA-WeWork/Capstone_WeWork/assets/83868210/bd61fb44-8f3b-4b4b-afda-14be627ef4d5">
  <img width="200" alt="image" src="https://github.com/WS-VSA-WeWork/Capstone_WeWork/assets/83868210/931e10ed-8bb1-455a-89d3-01d7f44875b0">
  <img width="200" alt="image" src="https://github.com/WS-VSA-WeWork/Capstone_WeWork/assets/83868210/0a83ba84-6310-4668-ad5d-60e7f5388eda">
</div>

<br>



<br>

## 실행방법
expo 앱의 디바이스와 실행 컴퓨터를 **같은 네트워크**에 접속해주세요.
```
git clone https://github.com/WS-VSA-WeWork/Capstone_WeWork.git
cd Front
npm i
npm install -g expo-cli
npx expo login
npm start
```
expo 앱에서 실행 터미널의 QR코드를 스캔하거나 앱에 url을 입력하면 서비스가 실행됩니다. 





