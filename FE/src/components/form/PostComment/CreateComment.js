import { Avatar, Button, Form, Input, List } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import { Comment } from '@ant-design/compatible';
import { useDispatch } from 'react-redux';
import { createCommentAsync } from '~/slices/user';
const { TextArea } = Input;
const CommentList = ({ comments }) => (
    <List
        dataSource={comments}
        header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
        itemLayout="horizontal"
        renderItem={(props) => <Comment {...props} />}
    />
);
const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <>
        <Form.Item>
            <TextArea rows={4} onChange={onChange} value={value} />
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                Tạo comment
            </Button>
        </Form.Item>
    </>
);
const CreateComment = ({ fatherComment }) => {
    const [comments, setComments] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const [value, setValue] = useState('');
    const dispatch = useDispatch()
    console.log(fatherComment)
    const handleSubmit = () => {
        if (!value) return;
        setSubmitting(true);
        setTimeout(() => {
            setSubmitting(false);
        }, 1000);
        dispatch(createCommentAsync({ content: value, postId: fatherComment.postId, parentId: fatherComment.id }))
            .unwrap()
            .then(async data => {
                console.log(data)
                return data ? data : [];
            })
            .catch(e => {
                console.log(e);
            })

    };
    const handleChange = (e) => {
        setValue(e.target.value);
    };
    return (
        <>
            {/* {comments.length > 0 && <CommentList comments={comments} />} */}
            <Comment
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
                content={
                    <Editor
                        onChange={handleChange}
                        onSubmit={handleSubmit}
                        submitting={submitting}
                        value={value}
                    />
                }
            />
        </>
    );
};
export default CreateComment;
