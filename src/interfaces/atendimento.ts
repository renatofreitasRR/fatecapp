import { DrugsProps } from "./drugs";

export interface AtendimentoProps{
    condicoesSocioeconomicas: string;
    dataAtendimento: Date;
    empregado: boolean;
    estadoAtualPaciente: string;
    id: number;
    idMedico: number;
    idPaciente: number;
}

export interface SaveAtendimentoProps{
    condicoesSocioeconomicas: string;
    dataAtendimento: Date;
    empregado: boolean;
    estadoAtualPaciente: string;
    id: number;
    idMedico: number;
    idPaciente: number;
    idsMedicamentosAdministrados: number[];
}

export interface ViewAtentimentoProps{
    condicoesSocioeconomicas: string;
    dataAtendimento: Date;
    empregado: boolean;
    estadoAtualPaciente: string;
    id: number;
    idMedico: number;
    idPaciente: number;
    nomePaciente: string,
    nomeMedico: string
    medicamentos: DrugsProps[];
}
