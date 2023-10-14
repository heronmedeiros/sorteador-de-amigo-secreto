import { fireEvent, render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import Rodape from "./Rodape";
import { useListaDeParticipantes } from "../../state/hook/useListaDeParticipantes";

jest.mock('../../state/hook/useListaDeParticipantes', () => {
  return ({
    useListaDeParticipantes: jest.fn()
  })
});

const mockNavegacao = jest.fn();
const mockSorteio = jest.fn();

jest.mock('react-router-dom', () => {
    return {
        useNavigate: () => mockNavegacao
    }
});

jest.mock('../../state/hook/useSorteador', () => {
    return {
        useSorteador: () => mockSorteio
    }
})


describe('quando não existem participantes suficientes', () => {
  beforeEach(()=> {
    (useListaDeParticipantes as jest.Mock).mockReturnValue([]);
  })

  test('a brincadeira não pode ser iniciada', () => {
    render(
      <RecoilRoot>
        <Rodape />
      </RecoilRoot>
    );

    const button = screen.getByRole('button');

    expect(button).toBeDisabled();
  })
});

describe('quando existem participantes suficientes', () => {
  beforeEach(()=> {
    (useListaDeParticipantes as jest.Mock).mockReturnValue(['Ana', 'katarina', 'josefina']);
  });

  test('a brincadeira não pode ser iniciada', () => {
    render(
      <RecoilRoot>
        <Rodape />
      </RecoilRoot>
    );

    const button = screen.getByRole('button');

    expect(button).not.toBeDisabled();
  });

  test('a brincadeira foi iniciada', () => {
    render(
      <RecoilRoot>
        <Rodape />
      </RecoilRoot>
    );

    const button = screen.getByRole('button');

    fireEvent.click(button);

    expect(mockNavegacao).toHaveBeenCalledTimes(1);
    expect(mockSorteio).toHaveBeenCalledTimes(1);
    expect(mockNavegacao).toHaveBeenCalledWith('/sorteio');
  })
});