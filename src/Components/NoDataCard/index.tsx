
import {
    Card,
    Header,
    Text,
} from './styles';

interface NoDataProps{
    text: string;
    maxWidth?: number;
}

export function NoData({ text, maxWidth = 250 }: NoDataProps) {
    return (
        <Card style={{
            maxWidth: maxWidth
        }}>
            <Header>
                <Text>{text}</Text>
            </Header>
        </Card>
    );
}