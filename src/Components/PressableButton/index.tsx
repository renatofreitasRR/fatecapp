import {
    ButtonContainer,
    ButtonText
} from './styles';

interface PressableButtonProps {
    onPress: any;
    title: string;
}

const PressableButton = ({ onPress, title } : PressableButtonProps) => (
    <ButtonContainer onPress={onPress} >
        <ButtonText>{title}</ButtonText>
    </ButtonContainer>
);

export default PressableButton;