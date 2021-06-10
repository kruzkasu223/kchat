import styled from "styled-components";
import HeadComp from "@components/HeadComp";
import { Button } from "@material-ui/core";
import { auth, provider } from "@utils/firebase";

export default function Login() {
    const logIn = () => {
        auth.signInWithPopup(provider).catch(alert);
    };

    return (
        <Container>
            <HeadComp title="Login | " />
            <LoginContainer>
                <h1>LOGIN TO KCHAT</h1>
                <Logo src="logo.svg" />
                <Button onClick={logIn} variant="outlined">
                    Login with Google
                </Button>
            </LoginContainer>
        </Container>
    );
}

const Container = styled.div`
    display: grid;
    place-items: center;
    height: 100vh;
    background-color: whitesmoke;
`;

const LoginContainer = styled.div`
    padding: 3rem 5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: white;
    border-radius: 0.5rem;
    box-shadow: 0 0.25rem 0.75rem -0.25rem rgba(0, 0, 0, 0.7);

    h1 {
        margin: 1rem 0;
    }
`;

const Logo = styled.img`
    width: 12rem;
    height: 12rem;
    margin-bottom: 1rem;
`;
