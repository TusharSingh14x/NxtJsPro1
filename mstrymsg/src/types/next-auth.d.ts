import "next-auth";

declare module 'next-auth' {
    interface User {
        _id?: string;
        isverified?: boolean;
        isAcceptingMessages?: boolean;  
        username?: string
    }
    interface Session{
user:{
    _id:?string;
    isverified?: boolean;
        isAcceptingMessages?: boolean;
        username?: string
} & DefaultSeccion['user']
    }
}

declare module 'next-auth/jwt'{
    interface JWT{
        _id:?string;
    isverified?: boolean;
        isAcceptingMessages?: boolean;
        username?: string
    }
}