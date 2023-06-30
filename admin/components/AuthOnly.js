import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function AuthOnly({ children }) {
    const [loading, setLoading] = useState(true);

    const router = useRouter();

    useEffect(() => {
        function checkAuth() {
            const token = localStorage.getItem("token");
            if (token) {
                setLoading(false);
            } else {
                router.replace("/login");
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