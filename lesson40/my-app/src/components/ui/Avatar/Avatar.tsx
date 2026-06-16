import type { FC, PropsWithChildren } from 'react';
import { Component } from 'react';
import styles from './Avatar.module.css';
import { transformFullName } from './lib/transformFullName';

// interface IAvatarPropsWithImage {
//     className?: string;
//     src: string;
//     alt: string;
// }

// interface IAvatarPropsWithoutImage extends PropsWithChildren {
//     className?: string;
//     fullName?: string;

// }

// type TAvatarProps = IAvatarPropsWithImage | IAvatarPropsWithoutImage;

type TAvatarVariant = 'circular' | 'rounded' | 'square';
type TAvatarSize = 'xs' | 's' | 'm' | 'l';

interface IAvatarProps extends PropsWithChildren {
    className?: string;
    fullName?: string;
    src?: string;
    alt?: string;
    size?: TAvatarSize
    variant?: TAvatarVariant;
}

export const Avatar: FC<IAvatarProps> = ({ className, children, fullName, variant = 'circular', size = "m" }) => {

    const avatarContent = fullName ? transformFullName(fullName) : children;

    return <div className={`${className} ${styles.avatar} ${styles[variant]} ${styles[`size_${size}`]}`}>{avatarContent}</div>
}


export class AvatarClassComponent extends Component<IAvatarProps> {

    constructor(props: IAvatarProps) {
        super(props);
    }

    componentDidMount(): void {
        console.log('avatar component mounted')
    }

    componentDidUpdate(prevProps): void {
        console.log(prevProps, this.props, 'component updated')
    }

    componentWillUnmount(): void {
        console.log('компонент готовится к удалению')
    }

    getAvatarContent() {
        if (this.props.fullName) {
            return transformFullName(this.props.fullName)
        }

        return this.props.children
    }

    render() {
        const { className, variant, size } = this.props;
        return <div className={`${className} ${styles.avatar} ${styles[variant]} ${styles[`size_${size}`]}`}>{this.getAvatarContent()}</div>
    }
}

