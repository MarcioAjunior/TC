type Commentt = {
    id: string;
    at_insta : string;
    comment_text : string;
    classification : string;
    verified_class : boolean;
    is_correct_class : boolean;
    correct_class : string;
    post_id : string;
  };

type Posts = {
    id : string;
    at_insta : string;
    post_url : string;
    thumb_url : string;
    post_text : string;
    user_id : string;
    comments?: Array<Commentt>;
  }
  
  type User = {
    id: string;
    username: string;
    user_fullname: string;
    user_picture: string;
    is_training: boolean;
    updated_at: string;
    posts : Array<Posts>;
    count_posts: number;
    count_comments : number;
  };
  
  interface PostCardProps {
    id: string;
    at_insta: string;
    post_url: string;
    thumb_url: string;
    post_text: string;
  }

  interface PostContainerProps {
    posts: Posts[];
  }

  interface PostCardCommentProps {
    id? : string;
    post_url? : string;
    thumb_url? : string;
    post_text? : string;
    at_insta? : string;
  }

  interface CommentCardProps {
    id : string;
    at_insta: string;
    comment_text: string;
    classification: string;
  }