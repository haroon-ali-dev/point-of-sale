import { AppContext } from "@/pages/_app";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function AuthOnly({ children }) {
    const [loading, setLoading] = useState(true);
    const { token } = useContext(AppContext);

    const router = useRouter();

    useEffect(() => {
        function checkAuth() {
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