export const RoutePaths ={
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