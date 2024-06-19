import {CSSProperties, FC, ReactNode} from "react"
import {theme} from "antd"

export const ErrorText: FC<{children: ReactNode; style?: CSSProperties}> = ({children, style}) => {
    const {colorErrorText} = theme.useToken().token

    return <div style={{color: colorErrorText, ...style}}>{children}</div>
}
