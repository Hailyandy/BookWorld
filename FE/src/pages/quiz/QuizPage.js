import React from 'react';
import PropTypes from 'prop-types';
import { Quiz } from '~/components';
import { useState } from 'react';
function QuizPage(props) {
    const [quizState, setQuizState] = useState({
        counter: 0,
        questionId: 1,
        question: '',
        answerOptions: [],
        answer: '',
        answersCount: {},
        result: ''
    })
    return (
        <Quiz ></Quiz>
    );
}



export default QuizPage;
