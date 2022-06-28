
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import axios from "axios";

import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result"

import styled from "styled-components";
import { useState } from "react";

const AppContainer = styled.div`
  background-color: rgb(216, 237, 237);
  width: 100vw;
  height: 100vh;

  @media screen and (max-width: 768px) {
    width: auto;
    height: auto;
  }
`

function App() {

  const [name, setName] = useState("")
  const [questions, setQuestions] = useState(null);
  const [score, setScore] = useState(0);
  const [marker, setMarker] = useState([])


  const fetchQuestions = async (category, difficulty) => {
    const { data } = await axios.get(
      `https://opentdb.com/api.php?amount=10${category && `&category=${category}`
      }${difficulty && `&difficulty=${difficulty}`}&type=multiple`
    );

    setQuestions(data.results);
  }

  return (
    <>
      <Router>
        <AppContainer>
          <Routes>
            <Route path="/" element={<Home name={name} setName={setName} fetchQuestions={fetchQuestions} />} />
            <Route path="/quiz" element={
              <Quiz
                name={name}
                questions={questions}
                score={score}
                setScore={setScore}
                setQuestions={setQuestions}
                marker={marker}
                setMarker={setMarker} />}
            />
            <Route path="/result" element={<Result name={name} score={score} setMarker={setMarker} />} />
          </Routes>
        </AppContainer>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
