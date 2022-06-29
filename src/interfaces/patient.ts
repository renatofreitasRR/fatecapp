
export interface UserProps {
    id: number,
    fotoLink?: string,
    cpf: string,
    dataNascimento: Date
    email: string,
    endereco: {
        bairro: string,
        cep: string,
        complemento: string,
        localidade: string,
        logradouro: string,
        numero: string,
        uf: string
    },
    nome: string,
    perfil: string,
    telefone: string
}

export interface SaveUserProps {
    id: number,
    fotoLink: string,
    cpf: string,
    dataNascimento: Date,
    email: string,
    endereco: {
        bairro: string,
        cep: string,
        complemento: string,
        localidade: string,
        logradouro: string,
        numero: string,
        uf: string
    },
    nome: string,
    perfil: string,
    telefone: string
}

export interface EditUserProps {
    id: number,
    fotoLink: string,
    cpf: string,
    dataNascimento: Date
    email: string,
    endereco: {
        bairro: string,
        cep: string,
        complemento: string,
        localidade: string,
        logradouro: string,
        numero: string,
        uf: string
    },
    nome: string,
    perfil: string,
    telefone: string
}