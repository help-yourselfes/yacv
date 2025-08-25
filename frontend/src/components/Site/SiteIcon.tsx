interface props {
    pictureUrl: string
}

export const SiteIcon: React.FC<props> = ({ pictureUrl }) => {
    return (
        <img src={`/images/sites/${pictureUrl}`} />
    )
}