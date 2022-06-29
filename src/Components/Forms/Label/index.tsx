import { TextProps } from 'react-native';


import {
    Label,
    Required
} from './styles';

interface InputLabelProps {
    isRequired?: boolean;
    text: string;
}


export function InputLabel({ isRequired, text }: InputLabelProps) {
    return (
        <Label>
            {text}{isRequired && <Required>*</Required>}
        </Label>
    );
}