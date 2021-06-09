import "@styles/globals.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@utils/firebase";
import Login from "@pages/login";

function MyApp({ Component, pageProps }) {
    const [user] = useAuthState(auth);

    if (!user) return <Login />;

    return <Component {...pageProps} />;
}

export default MyApp;
