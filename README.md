# 졸작

### 1. 라우팅 구조

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
|   |   └── index : 이벤트 리스트
|   |   └── detail : 이벤트 상세보기
|
|
├── Auth
│   ├── login : 로그인 안내창
│   ├── signin: 이메일 로그인
│   ├── signup : 회원가입
│   └── signup_complete : 회원가입 완료
│   └── find 
|   |   └── index : 이메일/ 비밀번호 찾기
|   |   └── email : 이메일 찾기
|   |   └── email_complete : 이메일 찾기 완료
|   |   └── password : 비밀번호 찾기
|   |   └── password_complete : 비밀번호 찾기 완료
└── 
``` 


2. 디렉토리 구조

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
|
└── 
``` 

### 2. TodoList

- 마이페이지
- 아이디 비밀번호 찾기
- 정규식 적용
- 지도 최적화 (지역별 클러스터링)
- 필터링
- 스와이퍼
- 매물 등록시 옵션 및 날짜 디테일 잡기
- 매물 수정 및 삭제
- 매물 문의시 POST 작업
- 서브 페이지 (이벤트, 공지사항)

