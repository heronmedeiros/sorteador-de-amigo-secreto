import { atom } from "recoil";

export const listaParticipantesState = atom<string[]>({
  key: 'listaParticipanteState',
  default: []
})

export const erroState = atom<string>({
  key: 'erroState',
  default: ''
})

export const resultadoAmigoSecreto = atom<Map<string, string>>({
  key: 'resultadoAmigoSecreto',
  default: new Map(),
})