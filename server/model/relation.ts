import Article from "./Article";
import Comment from "./Comment";
import SubComment from "./SubComment";

// 1：M 一个文章可以有多个评论
Article.hasMany(Comment,{foreignKey:"articleId"});

// 1：M 一个评论可以有多个子评论
Comment.hasMany(SubComment, { foreignKey: 'replyId',as:"SubComments" });

