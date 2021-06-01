export const RoutePaths={
    index:'/',
    main:{
        index: '/map',
        detail:'/detail',
        realty :{
            index :'/realty',
            contact :'/realty/contact',
            write :'/realty/write',
            modify :'/realty/modify',
            enrollment:'/realty/enrollment',
        },
        mypage:{
            index:'/mypage',
            update:{
                index:'/mypage/update',
                name:'/mypage/update/name',
                password:'/mypage/update/password',
                phone_number:'/mypage/update/phone_number',
            }
        },
        event:{
            index:'/event_list',
            detail:'/event'
        },
        like: '/like'
    },
    auth: {
        index: '/auth',
        login: '/auth/login',
        signin: '/auth/signin',
        signup: '/auth/signup',
        sign_complete: '/auth/sign_complete',
        find: {
            index: '/auth/find',
            email: '/auth/find/email',
            password: '/auth/find/password',
            email_complete: '/auth/find/email_complete',
            password_complete: '/auth/find/password_complete',
        },
    },
}


export const RouteTitle  ={
    index:'',
    main:{
        index: '',
        detail:'',
        realty :{
            index :'/realty',
            contact :'문의한 매물',
            write :'매물 등록',
            modify :'매물 수정',
            enrollment:'등록한 매물',
        },
        mypage:{
            index:'마이페이지',
            update:{
                index:'',
                name:'이름변경',
                password:'비밀번호 변경',
                phone_number:'핸드폰번호 변경',
            }
        },
        event:{
            index:'이벤트',
            detail:'이벤트'
        },
        like: '내가 찜한 매물'
    },
    auth: {
        index: '',
        login: '로그인 안내',
        signin: '로그인',
        signup: '회원가입',
        sign_complete: '회원가입 완료',
        find: {
            index: '이메일/비밀번호 찾기',
            email: '이메일 찾기',
            password: '비밀번호 찾기',
            email_complete: '이메일 찾기 완료',
            password_complete: '비밀번호 찾기 완료',
        },
    },
}