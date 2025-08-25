import { Link, useSearchParams } from "react-router-dom";

function ErrorPage() {
    const [params] = useSearchParams();
    const msg = params.get("msg");

    return (
        <div>

            <h1>
                Error: {msg || "Unknown"}
            </h1>
            <Link to="/">Back to main page</Link>
        </div>
    );
}

export default ErrorPage