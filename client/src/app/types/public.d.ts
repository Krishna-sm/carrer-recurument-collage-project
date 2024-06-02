export interface Post{
            title:string;
            id:string;
            slug:string;
            user:{
                id:string;
                name:string;
            };
            image:string;
}


export interface SinglePost extends Post{
    short_desc:string;
    desc:string;
    extend_date:string;
    created_at:string;
    skills:string;
}

export interface CompanyProfile {
    name:string;
    email:string;
    id:string;
}