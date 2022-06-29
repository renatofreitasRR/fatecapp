import { TouchableOpacityProps, Dimensions  } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import Icon from '@expo/vector-icons/createIconSet';
import {
    Container,
} from './styles';


export function FloatActionButton({ ...rest }) {

    return (
        <Container {...rest}>
            <Entypo name="plus" size={30} color="white" />
        </Container>
    );
}