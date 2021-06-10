import { Avatar } from "@material-ui/core";
import { auth, db } from "@utils/firebase";
import getRecipientEmail from "@utils/getRecipientEmail";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import styled from "styled-components";

export default function Chat({ id, users }) {
    const [user] = useAuthState(auth);
    const recipientEmail = getRecipientEmail(users, user);
    const [recipientSnapshot] = useCollection(
        db.collection("users").where("email", "==", recipientEmail)
    );
    const recipient = recipientSnapshot?.docs?.[0]?.data();

    return (
        <Container>
            {recipient ? (
                <UserAvatar src={recipient?.photoURL} />
            ) : (
                <UserAvatar>{recipientEmail[0].toUpperCase()}</UserAvatar>
            )}
            <p>{recipientEmail}</p>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 1rem;
    word-break: break-word;

    :hover,
    :focus {
        background-color: #eee;
    }
`;

const UserAvatar = styled(Avatar)`
    margin: 0.25rem;
    margin-right: 1rem;
`;
