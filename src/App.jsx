import Header from "./components/Header.jsx";
import Game from "./components/Game.jsx";
import Heroes from "./components/Heroes.jsx"
import React from "react";
import { heroes } from "../heroes.js";
import { words } from "../words.js";
import Confetti from "react-confetti";
import { doomsdayVictory } from "./doomsdayVictory.jsx";
import { doomsdayDefeat } from "./doomsdayDefeat.jsx";

export default function App()
{

    const [currWord, setCurrWord] = React.useState(() => words[Math.floor(Math.random() * words.length)].toUpperCase());
    const [userGuess, setUserGuess] = React.useState([]);
    const wrongGuess = userGuess.reduce((value, letter) => 
                                    {
                                        return (!currWord.includes(letter) ? value + 1 : value)              
                                    }, 0);
    const haveWon = [ ... currWord ].every((letter) => userGuess.includes(letter))
    const haveLost = wrongGuess >= heroes.length ;
    const isGameOver = haveLost || haveWon;
    const newGame = React.useRef(null);

    const lastGuessedLetter = userGuess[userGuess.length - 1]
    const isLastWrong = lastGuessedLetter != undefined && !currWord.includes(lastGuessedLetter)
    
    React.useEffect(() => 
        {
            if(isGameOver && newGame !== null)
                newGame.current.scrollIntoView({
                                                    behavior: "smooth",
                                                    block: "center"
                                                })
        }, [isGameOver])

    function registerInput(letter)
    {   
        setUserGuess((prevGuess)=>[...prevGuess, letter])
    }
    function startNew(setEleminatingSentence, allAlivePhrases, length)
    {
        setEleminatingSentence(allAlivePhrases[Math.floor(Math.random() * length)]);
        setCurrWord(words[Math.floor(Math.random() * words.length)].toUpperCase());
        setUserGuess([]);
    }

    return(
        <div className="bg-[#070e08] min-h-[calc(100vh-0.5rem)] m-1 rounded-2xl flex flex-col justify-center items-center bg-[url('/icon.png')] bg-no-repeat bg-center bg-blend-overlay">
            {/* {haveWon && <Confetti />} */}
            {haveWon && doomsdayVictory()}
            {haveLost && doomsdayDefeat()}
            <Header startNew={startNew} isGameOver={isGameOver} ref = {newGame} haveLost={haveLost} haveWon={haveWon} isLastWrong={isLastWrong} wrongGuess={wrongGuess}/>
            <Heroes wrongGuess={wrongGuess}/>
            <Game  registerInput={registerInput} currWord={currWord} userGuess={userGuess} isGameOver={isGameOver} numGuess={heroes.length - wrongGuess} lastGuessedLetter={lastGuessedLetter}/>
        </div>
    );
}