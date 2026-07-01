import { heroes } from "../../heroes"


export default function Heroes(props)
{

    const heroesList = heroes.map((hero) => 
                                            {                                                
                                                return(
                                                    <p 
                                                        key = {hero.id} 
                                                        className={(hero.id <= props.wrongGuess ? " text-[#ffffff66] bg-[url('kill-effect.svg')] bg-cover bg-center bg-[#5c000069] " : " bg-[#005c48] ") + " inline-block whitespace-nowrap  m-1 p-1 rounded-lg "}>
                                                            {hero.name}
                                                    </p>
                                            )})

    return(
        <div className="text-white max-w-137.5 text-center mt-20 mb-0">
            {heroesList}
        </div>
    )
}