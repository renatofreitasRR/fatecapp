
import { Input } from '../Input';
import { Control, Controller } from 'react-hook-form';


import {
    Container,
    Error
} from './styles';

import { MaskInputProps } from 'react-native-mask-input';

interface Props extends MaskInputProps {
    control: Control;
    name: string;
    error: string;
}

export function InputForm({ error, control, name, ...rest }: Props) {
    return (
        <Container>
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                        {...rest}
                    />
                )}
                name={name}
            />
            {error && <Error>{error}</Error>}
        </Container>
    );
}