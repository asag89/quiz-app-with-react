
import Question from "../components/Question";
import Loading from "../components/Loading"

import styled from "styled-components"
import { useState, useEffect } from "react";

const QuizContainer = styled.div`
    width: 100%;
    padding: 0 25px;
    height: 100%;
`

const QuizWrapper = styled.div`
    max-width: 1100px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const QuizHeader = styled.div`
    width: 100%;
    min-height: 90px;
    border: solid #646FD4;
    border-radius: 15px;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media screen and (max-width: 768px) {
            flex-direction: column;
            justify-content: center;
            padding: 20px 0;
            gap: 10px;
    }

    p{
        font-weight: 500;
        font-size: 1.2rem;
        text-transform: capitalize;

        @media screen and (max-width: 768px) {
            font-size: 1rem;
            
        }
    }
`

const QuestionMarker = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 20px;
`

const Mark = styled.div`
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: ${({ bg }) => bg === true ? "green" : bg === false ? "red" : "grey"};
`

const Quiz = ({
    name,
    questions,
    score,
    setScore,
    setQuestions,
    marker,
    setMarker }) => {

    const [options, setOptions] = useState([]);
    const [currQues, setCurrQues] = useState(0);

    useEffect(() => {
        setOptions(
            questions &&
            handleShuffle([
                questions[currQues]?.correct_answer,
                ...questions[currQues]?.incorrect_answers,
            ])
        );
    }, [currQues, questions]);

    const handleShuffle = (options) => {
        return options.sort(() => Math.random() - 0.5);
    };

    return (
        <QuizContainer>
            <QuizWrapper>
                {questions ?
                    <>
                        <QuizHeader>
                            <p>{name}</p>
                            <p>Category: {(questions[currQues]?.category).split(":")[1] ? (questions[currQues]?.category).split(":")[1] : questions[currQues]?.category}</p>
                            <p>Difficulty: {(questions[currQues]?.difficulty)}</p>
                        </QuizHeader>
                        <Question
                            currQues={currQues}
                            setCurrQues={setCurrQues}
                            questions={questions}
                            options={options}
                            correct={questions[currQues]?.correct_answer}
                            score={score}
                            setScore={setScore}
                            setQuestions={setQuestions}
                            marker={marker}
                            setMarker={setMarker}
                        />
                        <QuestionMarker>
                            {marker && marker.map((q, i) => (
                                <Mark bg={q} key={i}></Mark>
                            ))}
                        </QuestionMarker></>
                    : <Loading />}
            </QuizWrapper>
        </QuizContainer>
    )
}

export default Quiz