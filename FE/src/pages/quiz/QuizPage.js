import { useState, useEffect } from 'react';
// import funQuiz from '~/components/Quiz/funQuiz';
import { Quiz } from '~/components';
import Result from '~/components/Quiz/Result';
import './quizpage.css'
import { useLoaderData } from 'react-router-dom';
import { checkAnswerAndGetPointAsync } from '~/slices/user';
import { useDispatch } from 'react-redux';

function QuizPage() {
    const dispatch = useDispatch()
    const [counter, setCounter] = useState(0);
    const [questionId, setQuestionId] = useState(1);
    const [question, setQuestion] = useState('');
    const [answerOptions, setAnswerOptions] = useState([]);
    const [answer, setAnswer] = useState('');
    const [answersCount, setAnswersCount] = useState({});
    const [result, setResult] = useState('');
    const [score, setScore] = useState(0);
    const [questionUuId, setQuestionUuId] = useState('');
    const [idBook, setIdBook] = useState('');
    const [resultAfterAnswerAllQuiz, setResultAfterAnswerAllQuiz] = useState([])
    const [answerFromBe, setanswerFromBe] = useState('')

    const funQuiz = useLoaderData()
    console.log(funQuiz)

    useEffect(() => {
        const shuffledAnswers = funQuiz.map(q =>
            shuffleArray(q.optionDtos)
        );
        setAnswerOptions(shuffledAnswers[0]);
        setQuestion(funQuiz[0].questionsText);
        setScore(funQuiz[0].scoring)
        setIdBook(funQuiz[0].idBook)
        setQuestionUuId(funQuiz[0].id)
    }, []);

    function shuffleArray(array) {
        var currentIndex = array.length,
            temporaryValue,
            randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    function handleAnswerSelected(answer, idAnswer) {
        setUserAnswer(answer.target.value);

        let answerSelected = {
            score: score,
            questionId: questionUuId,
            idAnswer: idAnswer,
            answer: answer.target.value
        }
        // console.log(answerSelected)
        setResultAfterAnswerAllQuiz([...resultAfterAnswerAllQuiz, answerSelected])

        if (questionId < funQuiz.length) {
            setTimeout(() => nextQuestion(), 300);
        } else {
            setTimeout(() => setResults(getResults()), 300);
        }
    }

    function setUserAnswer(answer) {
        setAnswer(answer);
        setAnswersCount({
            ...answersCount,
            [answer]: (answersCount[answer] || 0) + 1
        })
    }

    function nextQuestion() {
        setCounter(counter + 1);
        setQuestionId(questionId + 1);

        setQuestion(funQuiz[counter].questionsText);
        setAnswerOptions(funQuiz[counter].optionDtos);
        setScore(funQuiz[counter].scoring)
        setQuestionUuId(funQuiz[counter].id)
        setAnswer('');
    }

    function getResults() {
        const answersCountComponent = answersCount;
        const answersCountKeys = Object.keys(answersCountComponent);
        const answersCountValues = answersCountKeys.map(key => answersCountComponent[key]);
        const maxAnswerCount = Math.max.apply(null, answersCountValues);
        return answersCountKeys.filter(key => answersCountComponent[key] === maxAnswerCount);
    }

    function setResults(result) {
        setResult(result.length === 1 ? result[0] : 'Undetermined');
    }
    useEffect(() => {
        if (questionId == funQuiz.length) {
            console.log('finisn test')
            console.log(resultAfterAnswerAllQuiz)
            var finalResult = {
                idBook: idBook,
                listAnswer: [
                    ...resultAfterAnswerAllQuiz
                ]
            }
            dispatch(checkAnswerAndGetPointAsync(finalResult))
                .unwrap()
                .then(async data => {
                    console.log(data)
                    setanswerFromBe(data)

                })
                .catch(e => {
                    console.log(e);
                })
        }
    }, [result])
    return (
        <div className="quiz-page">
            {result ? (
                <Result quizResult={answerFromBe.score} answerFromBe={answerFromBe.checkQuestionDtos} />
            ) : (
                <Quiz
                    answer={answer}
                    answerOptions={answerOptions}
                    question={question}
                    onAnswerSelected={handleAnswerSelected}
                    questionId={questionId}
                    questionTotal={funQuiz.length}
                />
            )}
        </div>
    );
}

export default QuizPage;
