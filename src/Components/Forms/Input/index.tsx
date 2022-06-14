import { MaskInputProps } from 'react-native-mask-input';


import {
    Container,
} from './styles';


export function Input({ ...rest }: MaskInputProps) {
    return (
        <Container {...rest} />
    );
}