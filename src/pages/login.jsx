import styled from "styled-components";
import HeadComp from "@components/HeadComp";
import { Button } from "@material-ui/core";

export default function Login() {
    return (
        <Container>
            <HeadComp title="Login | " />
            <h1>Login</h1>
            <LoginContainer>
                <Logo src="logo.svg" />
                <Button variant="outlined">Login with Google</Button>
            </LoginContainer>
        </Container>
    );
}

const Container = styled.div`
    display: grid;
    place-items: center;
    height: 100vh;
`;

const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const Logo = styled.img`
    width: 12rem;
    height: 12rem;
    margin-bottom: 3rem;
`;
