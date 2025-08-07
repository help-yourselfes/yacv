import { useSearchParams } from "react-router-dom";

function ErrorPage() {
    const [params] = useSearchParams();
    const msg = params.get("msg");

    return (
        <div>

            <h1>
                Ошибка: {msg || "Неизвестная"}
            </h1>
            <a href="/">На главную</a>
        </div>
    );
}

export default ErrorPage