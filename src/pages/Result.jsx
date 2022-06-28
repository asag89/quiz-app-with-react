
import styled from "styled-components"

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ResultContainer = styled.div`
    width: 100vw;
    padding: 0 25px;
    height: 100vh;
`

const ResultWrapper = styled.div`
    max-width: 1100px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const ResultHeader = styled.div`
    width: 100%;
    margin-bottom: 30px;

    h1{
        text-align: center;
    }
`
const ResultBackBtn = styled.button`
    background-color: #ba0092;
    color: #fff;
    border-radius: 15px;
    width: 40%;
    padding: 10px;
    text-align: center;
    text-decoration: none;
    border: none;
    outline: none;
    cursor: pointer;
`

const Result = ({ name, score, setMarker }) => {

    const navigate = useNavigate()

    useEffect(() => {
        if (!name) {
            navigate("/");
        }
    }, [name, navigate]);

    const handleBack = () => {
        setMarker([])
        navigate("/")
    }

    return (
        <ResultContainer>
            <ResultWrapper>
                <ResultHeader>
                    <h1>Your score {score}</h1>
                </ResultHeader>
                <ResultBackBtn onClick={handleBack}>Back to Homepage</ResultBackBtn>
            </ResultWrapper>
        </ResultContainer>
    )
}
export default Result