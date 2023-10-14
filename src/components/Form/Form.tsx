import { useRef, useState } from "react";
import { useAdicionarParticipante } from "../../state/hook/useAdicionarParticipante";
import { useMensagemDeErro } from "../../state/hook/useMensagemDeErro";

const Form = () => {
  const [nome, setNome] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);
  const adicionarNaLista = useAdicionarParticipante();

  const mensagemDeErro = useMensagemDeErro();

  const adicionarPartipante = (evento : React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    adicionarNaLista(nome);
    setNome('');
    inputRef.current?.focus();
  }

  return (
    <form onSubmit={adicionarPartipante}>
      <input
        type="text"
        placeholder="Insira os nomes dos participantes"
        value={nome}
        onChange={evento => setNome(evento.target.value)}
        ref={inputRef}
      />
      <button disabled={!nome}>Adicionar</button>
      { mensagemDeErro && <p role="alert">{mensagemDeErro}</p> }
    </form>
  )
}

export default Form;