
interface Props {
    msg: string;
}

export const ErrorBox: React.FC<Props> = ({msg}) =>{
    return (
        <div>
            <img />
            {msg}
        </div>
    )
}