import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function NoAuth({ children }) {
    const [loading, setLoading] = useState(true);

    const router = useRouter();

    useEffect(() => {
        function checkAuth() {
            const token = localStorage.getItem("token");
            if (token) {
                router.replace("/products");
            } else {
                setLoading(false);
            }
        }

        checkAuth();
    }, []);

    return (
        <>
            {loading && (
                <p>Loading...</p>
            )}
            {!loading && (
                children
            )}
        </>
    );
}