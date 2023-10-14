import { render } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import App from "./App";

// const mockNavegacao = jest.fn();

// jest.mock('react-router-dom', () => {
//     return {
//         useNavigate: () => mockNavegacao
//     }
// });

describe('A pagina de configuração', () => {
  test('Deve ser renderizada corretamente', () => {
    const { container } = render(
      <RecoilRoot>
        <App />
      </RecoilRoot>
    )

    expect(container).toMatchSnapshot();
  });
});