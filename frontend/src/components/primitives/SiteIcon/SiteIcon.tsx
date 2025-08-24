interface props {
    name: string
}

export const SiteIcon: React.FC<props> = ({ name }) => {
    return (
        <img src={`/images/sites/${name}`} />
    )
}