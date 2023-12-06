import CommentItem from './commentItem/CommentItem';
const NestedComments = ({ comments, type }) => (
    <div>
        {comments.map(comment => (
            <CommentItem comment={comment} type={type}
            >
                {comment.children?.length > 0 && (
                    <div className="nested-comments">
                        <NestedComments comments={comment.children} type={type} />
                    </div>
                )}
            </CommentItem>
        ))}
    </div>
);
export default NestedComments

// const MyComponent = () => {

//     const comments = [
//         {
//             id: 1,
//             author: 'John Doe',
//             avatar: '...',
//             text: 'Great post!',
//             children: []
//         },
//         // other comments...
//     ]

//     return (
//         <div className="comment-thread">
//             <NestedComments comments={comments} />
//         </div>
//     );

// }
