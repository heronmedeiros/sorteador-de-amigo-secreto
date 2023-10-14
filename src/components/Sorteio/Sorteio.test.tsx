import { fireEvent, render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { useListaDeParticipantes } from "../../state/hook/useListaDeParticipantes";
import Sorteio from "./Sorteio";

import { useResultadoSorteio } from "../../state/hook/useResultadoSorteio";

jest.mock('../../state/hook/useListaDeParticipantes', () => {
  return ({
    useListaDeParticipantes: jest.fn()
  })
});

jest.mock('../../state/hook/useResultadoSorteio', () => {
  return ({
    useResultadoSorteio: jest.fn()
  })
});

describe('Na página de sorteio', ()=> {
  const participantes = [
    'Ana',
    'Catarina',
    'Jorel',
  ];

  const resultado = new Map([
    ['Ana', 'Jorel'],
    ['Catarina', 'Ana'],
    ['Jorel', 'Catarina'],
  ])

  beforeEach(()=> {
    (useListaDeParticipantes as jest.Mock).mockReturnValue(participantes);
    (useResultadoSorteio as jest.Mock).mockReturnValue(resultado);
  });

  test('todos os participantes podem exivir o seu amigo secreto', () => {
    render(
      <RecoilRoot>
        <Sorteio />
      </RecoilRoot>
    )

    const opcoes = screen.queryAllByRole('option');
    expect(opcoes).toHaveLength(3);
  });

  test('O amigo secreto é exibido quando solicitado', () => {
    render(
      <RecoilRoot>
        <Sorteio />
      </RecoilRoot>
    )

    const select = screen.getByPlaceholderText('Selecione o seu nome');

    fireEvent.change(select, {
      target: {
        value: participantes[0]
      }
    });

    const button = screen.getByRole('button');
    fireEvent.click(button);

    const amigoSecreto = screen.getByRole('alert');

    expect(amigoSecreto).toBeInTheDocument();
  });
})