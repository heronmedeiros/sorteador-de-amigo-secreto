import { useNavigate } from "react-router-dom";
import { useListaDeParticipantes } from "../../state/hook/useListaDeParticipantes";
import { useEffect } from "react";

const Rodape = () => {

  const participantes = useListaDeParticipantes();

  const navigate = useNavigate();

  const iniciar = () => {
    navigate('/sorteio')
  }

  return (
    <footer>
      	<button
          disabled={participantes.length < 3}
          onClick={iniciar}
        >Iniciar brincadeira</button>
    </footer>
  )
}

export default Rodape;