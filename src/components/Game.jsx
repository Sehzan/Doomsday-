import React from "react"

export default function Game(props)
{


    const letters = [...props.currWord.toUpperCase()];
    const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const alphabetsArray = [...alphabets] 
    


    const letterBox = ((props.isGameOver) ?  letters.map((letter, index) => <span 
                                                    key={index} 
                                                    className={((props.userGuess.includes(letter) && props.currWord.includes(letter))? " " : " text-red-500 ")+"inline-block align-middle mt-1 m-0.5 p-1.5 w-12 h-13 border-b-2 bg-[#2d3735]"}>
                                                        {letter}
                                                    </span>)
                                                    
                                                    : letters.map((letter, index) => <span 
                                                    key={index} 
                                                    className="inline-block align-middle mt-1 m-0.5 p-1.5 w-12 h-13 border-b-2 bg-[#2d3735]">
                                                        {(props.userGuess.includes(letter) && props.currWord.includes(letter))? letter : ""}
                                                    </span>))

    const keyboard = alphabetsArray.map((key) => 
                        {
                            const isGuessed = props.userGuess.includes(key);
                            const isCorrect = props.currWord.includes(key);
                            return <button 
                                        disabled={isGuessed || props.isGameOver}
                                        onClick={() => props.registerInput(key)} 
                                        aria-label={`Letter ${key}`}
                                        aria-disabled={props.userGuess.includes(key)}
                                        key={key} 
                                        className={((props.isGameOver) ? " bg-[#005341] cursor-not-allowed opacity-75 text-gray-300": " cursor-pointer " ) + ((isGuessed)? (((isCorrect)? " bg-green-700 " : " bg-red-950 ") + " cursor-not-allowed ") : (!props.isGameOver && " bg-[#005341] hover:bg-[#02896c] active:bg-[#00ffc8] active:text-black focus:bg-[#02896c]")) + " m-1 p-2 rounded-lg w-16 h-16 "}>
                                            {key}
                                    </button>
                        })

    return(
        <div className="text-white text-4xl text-center max-w-137.5 mt-12 " >
            {letterBox}
        <section aria-live="polite" role="status" className="sr-only">
            <p>Current word: {props.currWord.split("").map(letter =>
                                                props.userGuess.includes(letter) ? letter + ".": "blank.").join(" ")}</p>
            <p>
                {
                    props.currWord.includes(props.lastGuessedLetter) ?
                    `Correct! The letter ${props.lastGuessedLetter} is in the word`:
                    `Oops! The letter ${props.lastGuessedLetter} is not in the word`
                }
                You have {props.numGuess} attempts left!
            </p>
        </section>
            <br />
            <div className=" mt-15 mb-4 max-w-137.5">{keyboard}</div>
        </div>
    )
}