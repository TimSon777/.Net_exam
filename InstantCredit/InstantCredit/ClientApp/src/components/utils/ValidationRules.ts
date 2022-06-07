export const minLengthRule = (value: number) => {
    return {
        value,
        message: `Min length - ${value}`
    };
}

export const maxLengthRule = (value: number) => {
    return {
        value,
        message: `Max length - ${value}`
    };
}

export const requiredRule = () => {
    return {
        value: true,
        message: 'Required'
    };
}

export const minRule = (value: number) => {
    return {
        value,
        message: `Min value - ${value}`
    };
}

export const maxRule = (value: number) => {
    return {
        value,
        message: `Max value - ${value}`
    };
}

export const onlyDigitsRule = (length:number) => {
    return (value: string) => {
        const regex = new RegExp(`^\\d{${length}}$`)
        if(!regex.exec(value)){
            return `You need enter only digits (0-9) with length ${length}`;
        } else {
            return true;
        }
    }
}