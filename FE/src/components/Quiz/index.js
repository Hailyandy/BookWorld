import React from 'react';
import PropTypes from 'prop-types';
import {
    Question, QuestionCount,
    AnswerOption
} from '~/components';

function Quiz(props) {
    const renderAnswerOptions = (key) => {

        return (
            <AnswerOption
                key={key.id}
                answerContent={key.options_text}
                answerType={key.options_text}
                answer={props.answer}
                questionId={props.questionId}
                onAnswerSelected={props.onAnswerSelected}
                answerId={key.id}
            />
        );
    }
    return (
        <div className="quiz">
            <QuestionCount
                counter={props.questionId}
                total={props.questionTotal}
            />
            <Question content={props.question} />
            <ul className="answerOptions">
                {props.answerOptions?.map(renderAnswerOptions)}
            </ul>
        </div>
    );
}

Quiz.propTypes = {
    answer: PropTypes.string.isRequired,
    answerOptions: PropTypes.array.isRequired,
    counter: PropTypes.number.isRequired,
    question: PropTypes.string.isRequired,
    questionId: PropTypes.number.isRequired,
    questionTotal: PropTypes.number.isRequired,
    onAnswerSelected: PropTypes.func.isRequired
};

export default Quiz;
