
import { useEffect, type FC, type PropsWithChildren } from 'react'
import styled from 'styled-components';

interface IButtonProps extends PropsWithChildren {
    type?: 'primary' | 'secondary' | 'tertiary';
    outlined?: boolean;
    onClick: () => void;
}

const ButtonWrapper = styled.button<IButtonProps>`
    padding: 20px;
    border: 1px solid red;

    &:hover {
        background-color: black;
        color: white;
    }

    background-color: ${({ type }) => {
        return type === 'primary' ? 'rgb(238, 223, 16)' : type === 'secondary' ? 'rgb(238, 157, 6)' : 'rgb(238, 6, 6)'
    }}
    
    ${({ outlined }) => outlined && 'background: transparent; border: 2px solid currentColor; '}
    `

export const Button: FC<IButtonProps> = ({ children, type, onClick, ...props }) => {
    // let content = children;

    // if (!children) {
    //     content = 'базовая кнопка'
    // }

    useEffect(() => {
        console.log('ON CLICK IS CHANGED')
    }, [onClick])

    useEffect(() => {
        console.log('TYPE IS CHANGED')
    }, [type])

    return (
        <ButtonWrapper onClick={onClick} type={type} {...props}>
            {children}
        </ ButtonWrapper>
    )
}


// const [firstName, lastName, ...info] = ['Vitalij', 'Trunts', 29, 'Minsk', 'Yandex']
// console.log(info) // 29, 'Minsk', 'Yandex'


// function sum(a, b, ...numbers) {
//     return a + b + numbers.reduce()
// }

// const isPrimary = ({ type }) => {
//     if (type == 'primary') {
//         return 'back'
//     }

//     return ''
// }