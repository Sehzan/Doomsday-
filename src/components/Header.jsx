import { heroes } from "../../heroes";
import React from "react";

export default function Header(props)
{

    const winPhrases = [
        "Phew! You saved the timeline!",
        "Phew! Reality owes you one.",
        "You just stopped Doomsday.",
        "The multiverse survives because of you.",
        "One decision. Infinite worlds saved.",
        "You kept the universe intact.",
        "Crisis averted. The multiverse lives on.",
        "You prevented reality from collapsing.",
        "You held the multiverse together.",
        "Mission accomplished. Existence preserved.",
        "You saved every possible future.",
        "The Avengers couldn't have done it better.",
        "Doom has been defeated—for now.",
        "You rewrote destiny.",
        "Reality is safe... thanks to you.",
        "You turned the impossible into history.",
        "The end of everything? Not today.",
        "You gave the multiverse another chance.",
        "The final incursion has been stopped.",
        "Earth's mightiest salute you.",
        "Phew! Doom never stood a chance.",
        "You outplayed Doom.",
        "Even Doom couldn't rewrite your ending.",
        "The Doomsday protocol: Complete.",
        "Doom averted. Heroes prevail.",
        "One hero. Zero Doomsday.",
        "The multiverse chose wisely.",
        "You stopped the end before it began.",
        "Doom's plan ends here.",
        "The multiverse remains undefeated.",
        "Multiverse Saved!",
        "Doom Defeated!",
        "Timeline Secured!",
        "Reality Restored!",
        "Crisis Averted!",
        "Mission: Doomsday Complete!",
        "Universe Saved!",
        "Heroic Victory!",
        "Existence Preserved!",
        "You Did the Impossible!"
    ];
    const failPhrases = [
        "Uh-oh... The timeline fractured.",
        "Doom has won.",
        "The multiverse has fallen.",
        "Reality is unraveling.",
        "Mission failed. The multiverse couldn't be saved.",
        "The incursion couldn't be stopped.",
        "Too late... Doomsday has begun.",
        "The universe couldn't survive this one.",
        "Another timeline lost.",
        "The multiverse collapsed.",
        "Doom rewrote history.",
        "The Avengers couldn't reach you in time.",
        "Reality has been erased.",
        "The final incursion consumed everything.",
        "Hope faded with this timeline.",
        "The end of everything... happened.",
        "The universe has fallen into chaos.",
        "You were so close...",
        "The multiverse needed one more hero.",
        "Not this timeline.",
        "Doom's plan succeeded.",
        "The Sacred Timeline has been broken.",
        "A nexus event sealed your fate.",
        "Every possibility... gone.",
        "Even the Avengers couldn't undo this.",
        "The multiverse couldn't be saved today.",
        "The future has been erased.",
        "This universe wasn't meant to survive.",
        "Destiny took a darker path.",
        "Game over. Reality lost.",
        "Mission Failed!",
        "Timeline Lost!",
        "Multiverse Destroyed!",
        "Reality Collapsed!",
        "Doom Prevails!",
        "Incursion Complete!",
        "Universe Lost!",
        "Defeat.",
        "Better luck in the next timeline.",
        "Try again. The multiverse is counting on you."
    ];
    const allAlivePhrases = [
        "Every hero is still standing. The multiverse is holding strong!",
        "No casualties yet. Keep the streak alive!",
        "The Avengers are still at full strength!",
        "Dr. Doom hasn't claimed a single hero... yet.",
        "Every hero is ready for battle!",
        "The timeline is still intact.",
        "Your team remains undefeated!",
        "No heroes have fallen. Keep guessing!",
        "The multiverse is safe... for now.",
        "Every hero is still in the fight!",
        "Your squad is looking unstoppable!",
        "No sacrifices have been made yet.",
        "The battle has only just begun!",
        "All heroes report for duty!",
        "Hope is still alive!"
    ];
    function getEliminatedPhrase(hero)
    {
        const eliminatedPhrases = [
            `${hero} has fallen in battle!`,
            `Dr. Doom eliminated ${hero}!`,
            `${hero} couldn't survive this round.`,
            `${hero} has been erased from the timeline.`,
            `${hero} made the ultimate sacrifice.`,
            `${hero} has been defeated.`,
            `${hero} is out of the fight.`,
            `Another loss... Farewell, ${hero}.`,
            `${hero} couldn't stop Dr. Doom.`,
            `${hero} has vanished into the multiverse.`,
            `${hero} has been captured by Dr. Doom.`,
            `${hero} has fallen, but hope remains.`,
            `${hero}'s journey ends here.`,
            `${hero} has been knocked out of the battle.`,
            `The multiverse mourns the loss of ${hero}.`,
            `${hero} has been lost to the chaos.`,
            `${hero} fought bravely but was defeated.`,
            `${hero} is no longer among the heroes.`,
            `${hero} couldn't withstand Dr. Doom's power.`,
            `${hero} has fallen. Don't let the rest follow!`
        ];
        
        return eliminatedPhrases[Math.floor(Math.random() * eliminatedPhrases.length)]
    }

    const[eliminatingSentence, setEleminatingSentence] = React.useState(allAlivePhrases[Math.floor(Math.random() * allAlivePhrases.length)]);
    React.useEffect(()=>{
        if(props.isLastWrong && props.wrongGuess > 0)
            setEleminatingSentence(getEliminatedPhrase(heroes[props.wrongGuess - 1].name))
    }, [props.wrongGuess])




    return(
        <div className="text-white wrap-anywhere text-center " aria-live="polite" role="status">
            <h1 className="text-7xl text-center m-8 ">DOOMSDAY ?</h1>
            <p 
            className="text-center text-md">
                You have <span className="text-[#02c466] font-medium"> 8 Hereoes (including the X-Men) </span> to keep the multiverse safe from Dr. Doom otherwise 
                <br /> 
                <span className="text-xl"> Face The Consequences </span>
            </p>
            {!props.isGameOver && <section className="bg-violet-700 text-center p-7 w-auto m-10 rounded-xl shadow-xl shadow-violet-400">
                <h2 className="text-3xl">{eliminatingSentence}</h2>
            </section>}
            {props.haveWon && <section className="bg-green-700 text-center p-7 w-auto m-10 rounded-xl shadow-xl shadow-green-400">
                <h2 className="text-3xl">{winPhrases[Math.floor(Math.random() * winPhrases.length)]}</h2>
            </section>}
            {props.haveLost && <section className="bg-red-950 text-center p-7 w-auto m-10 rounded-xl shadow-xl shadow-red-500">
                <h2 className="text-3xl">{failPhrases[Math.floor(Math.random() * failPhrases.length)]}</h2>
            </section>}
            {props.isGameOver && <button onClick={() => props.startNew(setEleminatingSentence, allAlivePhrases, allAlivePhrases.length)} ref={props.ref} className="mt-16 mb-16 text-2xl p-2 shadow-lg shadow-[#0074c2] bg-[#004e83] rounded focus:bg-[#037bcb] hover:bg-[#037bcb] active:bg-[#03b9f5] active:text-black">New Game</button>}
        </div>
    )
}