import Card from "../components/Card"
import Form from "../components/Form"
import ListaParticipantes from "../components/ListaParticipantes"
import Rodape from "../components/Rodape"


const Configuracao = () => {
    return (
      <Card>
        <section>
          <h2>Vamos começar!</h2>
          <Form />
            <ListaParticipantes />
            <Rodape />
        </section>
      </Card>
    )
}

export default Configuracao