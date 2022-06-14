import Toast from 'react-native-toast-message';

export const showToast = (message: string, type: string, title: string) => {
    Toast.show({
        type: type,
        text1: title,
        text2: message,
    });
}
