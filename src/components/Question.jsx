
import styled from "styled-components";
import { toast } from "react-toastify"

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const QuestionContainer = styled.div`
    margin-top: 30px;
    width: 100%;
    height: auto;
    border: solid #646FD4;
    border-radius: 15px;

    h1{
        text-align: center;
    }
`

const QuestionWrapper = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 20px;
`

const QuestionText = styled.div`
    font-size: 1.3rem;
    font-weight: 500;
    padding-bottom: 20px;

    @media screen and (max-width: 768px) {
        font-size: 1.1rem;
    }
`

const QuestionAnswers = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    height: auto;
    gap: 30px;

    @media screen and (max-width: 768px) {
        flex-direction: column;
        align-items: center;
    }
`

const QuestionAnswer = styled.div`
    width: 40%;
    min-height: 40px;
    border: 0.5px solid #555;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background-color: ${({ answer }) => answer === "select" ? "rgb(8, 217, 1)" : answer === "wrong" ? "rgb(219, 0, 0)" : "transparent"};
    color: ${({ answer }) => answer === "select" || answer === "wrong" ? "#fff" : "#000"};

    @media screen and (max-width: 768px) {
        width: 70%;
    }

    @media screen and (max-width: 600px) {
        width: 100%;
    }
`

const QuestionAnswerControl = styled.div`
    width: 100%;
    margin-top: 30px;
    display: flex;
    justify-content: center;
    gap: 30px;
`

const QuestionAnswerControlBtn = styled.button`
    background-color: #646FD4;
    color: #fff;
    font-size: 1.1rem;
    width: 20%;
    border-radius: 15px;
    height: 40px;
    border: none;
    outline: none;
    cursor: pointer;

    @media screen and (max-width: 768px) {
        width: 45%;
    }
`

const Question = ({
    currQues,
    setCurrQues,
    questions,
    options,
    correct,
    setScore,
    score,
    setQuestions,
    setMarker }) => {

    const navigate = useNavigate()

    const [selected, setSelected] = useState(null);

    const handleSelect = (i) => {
        if (selected === i && selected === correct) return "select";
        else if (selected === i && selected !== correct) return "wrong";
        else if (i === correct) return "select";
    }

    const handleCheck = (i) => {
        setSelected(i);
        if (i === correct) {
            setScore(score + 1);
            setMarker((prev) => [...prev, currQues = true])
        }
        if (i !== correct) {
            setMarker((prev) => [...prev, currQues = false])
        }
    }

    const handleNext = () => {
        if (currQues > 8) {
            navigate("/result");
        } else if (selected) {
            setCurrQues(currQues + 1);
            setSelected();
        }
        else {
            toast.error("Please select an option")
        }
    };

    const handleQuit = () => {
        setCurrQues(0);
        setQuestions();
        setMarker([])
        navigate("/")
    };

    return (
        <QuestionContainer>
            <QuestionWrapper>
                <QuestionText>Question {currQues + 1}: {questions[currQues].question}</QuestionText>
                <QuestionAnswers>
                    {options &&
                        options.map((i) => (
                            <QuestionAnswer
                                answer={selected && handleSelect(i)}
                                selected={selected}
                                key={i}
                                onClick={() => handleCheck(i)}
                                disabled={selected}
                            >
                                {i}
                            </QuestionAnswer>
                        ))}
                </QuestionAnswers>
                <QuestionAnswerControl>
                    <QuestionAnswerControlBtn onClick={() => handleQuit()} style={{ backgroundColor: "#d40b00" }}>
                        Quit
                    </QuestionAnswerControlBtn>
                    <QuestionAnswerControlBtn onClick={handleNext} style={{ backgroundColor: "#182efa" }}>
                        {currQues > 20 ? "Submit" : "Next Question"}
                    </QuestionAnswerControlBtn>
                </QuestionAnswerControl>
            </QuestionWrapper>
        </QuestionContainer>
    )
}

export default Question