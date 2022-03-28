# 🏘 자취방 양도 플랫폼

## 🔎프로젝트 개요

- 코로나19 때문에 늘어나는 빈 자취방
- 하지만 매월 지불해야하는 아까운 월세
- 방학 때 단기간 양도가 필요한 학생
- 안전하지 못한 자취방 양도

## 와이어프레임

### 인증 화면

![1](https://user-images.githubusercontent.com/40492343/160358578-dea6920a-d6fe-47fe-9460-567424d5ca01.png)

### 메인화면1

![2](https://user-images.githubusercontent.com/40492343/160358594-1efd3f70-e2a7-4151-9a6c-448cff7fb156.png)

### 메인화면2

![3](https://user-images.githubusercontent.com/40492343/160358619-eb162941-919d-4b39-af1f-135280ec41e3.png)

## 🚩기술스택

### 프론트엔드

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![Sass](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white)
![ts](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)

### 백엔드

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Seuelize](https://img.shields.io/badge/-Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white)
![db](https://img.shields.io/badge/MySql-000000?style=flat-square&logo=MySQL&logoColor=white)

### 협업

![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
![Slack](https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=slack&logoColor=white)
![Notion](https://img.shields.io/badge/Notion-%23000000.svg?style=for-the-badge&logo=notion&logoColor=white)

## CI/CD

![aws](https://img.shields.io/badge/AWS-FF9900?style=for-the-badge&logo=Amazon-AWSa&logoColor=white)
![pm2](https://img.shields.io/badge/pm2-000000?style=for-the-badge&logo=aws&logoColor=white)

## 📚 라우팅 구조

```bash
├── Main
│   ├── main : 맵 (:/modal => address: 주소검색 , list: 이지역 매물)
│   ├── detail : 매물 상세 페이지
│   └── realty
|   |   └── contact : 내가 문의한 매물
|   |   └── enrollment : 내가 등록한 매물
|   |   └── write : 매물 등록하기 (:/modal? preview :등록전 미리보기)
|   |   └── modify : 매물 수정하기
|   |   └── like : 찜한 매물
│   └── mypage
|   |   └── index : 마이페이지
|   |   └── update
|   |       └── name: 이름 변경
|   |       └── password: 패스워드 변경
|   |       └── phone_number: 핸드폰번호 변경
|   |   └── drop : 회원탈퇴
│   └── event
│   |   └── index : 이벤트 리스트
|   |   └── detail : 이벤트 상세보기
│
│
├── Auth
│   ├── login : 로그인 안내창
│   ├── signin: 이메일 로그인
│   ├── signup : 회원가입
│   └── signup_complete : 회원가입 완료
│   └── find
│  |   └── index : 이메일/ 비밀번호 찾기
│  |   └── email : 이메일 찾기
│  │   └── email_complete : 이메일 찾기 완료
│  │   └── password : 비밀번호 찾기
│  |   └── password_complete : 비밀번호 찾기 완료
└──
```

## 📁 디렉토리 구조

```bash
├── src
│   ├── api : # API 호출 모음
│   ├── components : # component
│   └── containers : # container
│   └── core : # lib 나 util 파일 모음
│       └── lib : # 정규식, 날짜 계산 등 라이브러리 모음
│       └── util : # 라우터 경로, 헤더 타이틀 등 모음
│   └── hooks # custom hooks 모음
│   └── pages # 라우팅 페이지 구성
│   └── static # 정적 이미지 모음 svg, img file
│   └── store # redux, redux-saga , reducer 등 전역 상태관리
│   └── styles # 전역 스타일링 모음
│   └── types # 타입선언에 대한 모음
└──
```

## 개발 화면

## TodoList

- 마이페이지 ✅
- 아이디 비밀번호 찾기✅
- 정규식 적용 ✅
- 지도 최적화 (지역별 클러스터링)
- 필터링 ✅
- 스와이퍼 ✅
- 매물 등록시 옵션 및 날짜 디테일 잡기 ✅
- 매물 수정 및 삭제✅
- 매물 문의시 POST 작업 ✅
- 서브 페이지 (이벤트, 공지사항)
