import { useEffect, useState } from 'react'
import './home.css'
import api from '../../services/api'
import { Link } from 'react-router-dom'

export default function Home() {
    const [filmes, setFilmes] = useState([]) //logica, começa com uma array vazia, qndo fizer a requisição na api. ele joga na state filmes.

    useEffect(() => {
        //useEfect avisa, qndo abrir o site executa essa função

        async function loadFilmes() {
            //dentro da função fazemos uma chamada
            const response = await api.get('r-api/?api=filmes') //criar a variavel response, o await pede para esperar a requisição vinda da internet.
            //sujeitoprogramador.com + r-api/?api=filmes o metodo get faz essa concatenação.
            //console.log(response.data); variavel.data traz direto os 7 arrays.
            setFilmes(response.data)
        }

        loadFilmes() //chamando a função dentro do useEffect
    }, [])

    //acessando a variavel do filmes, para percorrer toda a lista e montar na interFace
    return (
        <div className="container">
            <div className="lista-filmes">
                {filmes.map((filme) => {
                    return (
                        <article key={filme.id}>
                            <strong> {filme.nome} </strong>
                            <img src={filme.foto} alt={filme.nome} />
                            <Link to={`/filme/${filme.id}`}>Acessar</Link>
                        </article>
                    )
                })}
            </div>
        </div>
    )
}
