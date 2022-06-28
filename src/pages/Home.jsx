
import styled from "styled-components"
import TextField from "@mui/material/TextField"
import rosette from "../assets/rosette.svg"
import Categories from "../data/categoryData"
import MenuItem from '@mui/material/MenuItem';
import { Button } from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const HomeContainer = styled.div`
    width: 100%;
    padding: 0 25px;
    height: 100%;
`
const HomeWrapper = styled.div`
    max-width: 1100px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
`

const FormContainer = styled.div`
    width: 100%;
    height: auto;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media screen and (max-width: 768px) {
        flex-direction: column-reverse;
        margin-bottom: 80px;
    }
`

const Form = styled.form`
    background-color: rgb(216, 237, 237);
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    width: 50% !important;

    @media screen and (max-width: 768px) {
        width: 80% !important;

    }
    h1{
        text-align: center;
        margin-bottom: 30px;
      
    }
    

`
const Img = styled.img`
    width: 30% !important;
    @media screen and (max-width: 768px) {
        width: 35% !important;
        margin: 60px;
    }

`
const Home = ({ name, setName, fetchQuestions }) => {

    const navigate = useNavigate()

    const [category, setCategory] = useState("")
    const [difficulty, setDifficulty] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!category || !difficulty || !name) {
            toast.error("Please add all fields")
            return;
        }
        else {
            fetchQuestions(category, difficulty);
            navigate("/quiz");
        }
    }
    return (
        <HomeContainer>
            <HomeWrapper>
                <FormContainer>
                    <Form onSubmit={handleSubmit}>
                        <h1>Welcome to the Quiz</h1>
                        <TextField
                            style={{ marginBottom: 30 }}
                            label="Enter Your Name"
                            variant="outlined"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <TextField
                            select
                            label="Select Category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            variant="outlined"
                            style={{ marginBottom: 30 }}
                        >
                            {Categories.map((cat) => (
                                <MenuItem key={cat.category} value={cat.value}>
                                    {cat.category}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            select
                            label="Select Difficulty"
                            value={difficulty}
                            onChange={(e) => setDifficulty(e.target.value)}
                            variant="outlined"
                            style={{ marginBottom: 30 }}
                        >
                            <MenuItem key="Easy" value="easy">
                                Easy
                            </MenuItem>
                            <MenuItem key="Medium" value="medium">
                                Medium
                            </MenuItem>
                            <MenuItem key="Hard" value="hard">
                                Hard
                            </MenuItem>
                        </TextField>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            type="submit"
                        >
                            Start Quiz
                        </Button>
                    </Form>
                    <Img src={rosette} alt="" />
                </FormContainer>
            </HomeWrapper>
        </HomeContainer>
    )
}

export default Home