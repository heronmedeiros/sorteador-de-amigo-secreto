import { act, fireEvent, render, screen } from "@testing-library/react";
import Form from "./Form";
import { RecoilRoot } from "recoil";

//Jest
describe('O comportamento do formulário', () => {
  test('Quando o input esta vazio, novos participantes não podem ser adicionados', () => {
    render(
      <RecoilRoot>
        <Form />
      </RecoilRoot>
    );
    //encontrar no DOM o input
    const input = screen.getByPlaceholderText('Insira os nomes dos participantes');
    //encontrar o botão
    const button = screen.getByRole('button');
    //garantir que o input esteja no documento
    expect(input).toBeInTheDocument();
    //garantir que o botão esteja desabilitado
    expect(button).toBeDisabled();
  });

  test('adicionar um participante caso exista um nome preenchido', () => {
    render(
      <RecoilRoot>
        <Form />
      </RecoilRoot>
    );
     //encontrar no DOM o input
     const input = screen.getByPlaceholderText('Insira os nomes dos participantes');
     //encontrar o botão
     const button = screen.getByRole('button');

    // inserir um valor no input
    fireEvent.change(input, {
      target: {
        value: 'Ana Catarina'
      }
    })
    //clicar no botão de submeter
    fireEvent.click(button);
    //garantir que o input esteja com o foco ativo
    expect(input).toHaveFocus();
    //garantir que o input não tenha um valor
    expect(input).toHaveValue("");
  })


  test('Nomes duplicados não podem ser adicionados na lista', () => {
    render(
      <RecoilRoot>
        <Form />
      </RecoilRoot>
    );
     //encontrar no DOM o input
     const input = screen.getByPlaceholderText('Insira os nomes dos participantes');
     //encontrar o botão
     const button = screen.getByRole('button');

    // inserir um valor no input
    fireEvent.change(input, {
      target: {
        value: 'Ana Catarina'
      }
    })

    //clicar no botão de submeter
    fireEvent.click(button);

      // inserir um valor no input
      fireEvent.change(input, {
        target: {
          value: 'Ana Catarina'
        }
      })

      //clicar no botão de submeter
      fireEvent.click(button);

    const mensagemDeErro = screen.getByRole('alert');

    expect(mensagemDeErro.textContent).toBe('Nomes duplicados não são permitidos');
  });

  test('a mensagem de erro deve sumir após os timers', () => {
    jest.useFakeTimers()
    render(
      <RecoilRoot>
        <Form />
      </RecoilRoot>
    );
     //encontrar no DOM o input
     const input = screen.getByPlaceholderText('Insira os nomes dos participantes');
     //encontrar o botão
     const button = screen.getByRole('button');

    // inserir um valor no input
    fireEvent.change(input, {
      target: {
        value: 'Ana Catarina'
      }
    })

    //clicar no botão de submeter
    fireEvent.click(button);

    // inserir um valor no input
    fireEvent.change(input, {
      target: {
        value: 'Ana Catarina'
      }
    })

    //clicar no botão de submeter
    fireEvent.click(button);

    let mensagemDeErro = screen.getByRole('alert');

    expect(mensagemDeErro).toBeInTheDocument();
    // espera N segundos'
    act(() => {
      jest.runAllTimers();
    });

    mensagemDeErro = screen.queryByRole('alert');
    expect(mensagemDeErro).toBeNull();
  });
})