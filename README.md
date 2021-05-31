# 졸작

1. 라우팅 구조

```bash
├── Main
│   ├── main : 맵 (:/modal => address: 주소검색 , list: 이지역 매물)
│   ├── detail : 매물 상세 페이지
│   └── realty
|   |   └── contact : 내가 문의한 매물
|   |   └── enrollment : 내가 등록한 매물           
|   |   └── write : 매물 등록하기 (:/modal? preview :등록전 미리보기)          
|   |   └── modify : 매물 수정하기
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
│   └── like : 찜한 매물
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