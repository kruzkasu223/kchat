import { Avatar, Button } from "@material-ui/core";
import styled from "styled-components";
import * as EmailValidator from "email-validator";
import { auth, db } from "@utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import Chat from "@components/Chat";

export default function Sidebar() {
    const [user] = useAuthState(auth);
    const userChatRef = db
        .collection("chats")
        .where("users", "array-contains", user.email);
    const [chatsSnapshot] = useCollection(userChatRef);

    const createChat = () => {
        const input = prompt("Please Enter an Email of User to Add to Chat.");

        if (!input) return null;

        if (
            EmailValidator.validate(input) &&
            !chatAlreadyExists(input) &&
            input !== user.email
        ) {
            db.collection("chats").add({
                users: [user.email, input],
            });
        }
    };

    const chatAlreadyExists = (recipientEmail) =>
        !!chatsSnapshot?.docs.find(
            (chat) =>
                chat.data().users.find((user) => user === recipientEmail)
                    ?.length > 0
        );

    return (
        <Container>
            <Header>
                <UserDetails>
                    <UserAvatar src={user.photoURL} />
                    <UserName>{user.email.split("@")[0]}</UserName>
                </UserDetails>
                <LGButton onClick={() => auth.signOut()}>LOG OUT</LGButton>
            </Header>

            <SidebarButton onClick={createChat}>Start a New Chat</SidebarButton>

            {chatsSnapshot?.docs.map((chat) => (
                <Chat key={chat.id} id={chat.id} users={chat.data().users} />
            ))}
        </Container>
    );
}

const Container = styled.div`
    flex: 0.45;
    border-right: 1px solid whitesmoke;
    height: 100vh;
    min-width: 18rem;
    max-width: 22rem;
    overflow-y: scroll;

    ::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
`;

const Header = styled.header`
    display: flex;
    position: sticky;
    top: 0;
    background-color: white;
    z-index: 1;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    height: 5rem;
    border-bottom: 1px solid whitesmoke;
`;

const UserDetails = styled.div`
    display: flex;
    align-items: center;
`;

const UserAvatar = styled(Avatar)`
    margin-right: 0.5rem;
`;

const UserName = styled.span`
    text-transform: uppercase;
    word-break: break-word;
    padding-top: 0.25rem;
`;

const SidebarButton = styled(Button)`
    width: 100%;

    &&& {
        background-color: whitesmoke;
        border-top: 1px solid whitesmoke;
        border-bottom: 1px solid whitesmoke;

        &:hover {
            filter: brightness(95%);
        }
    }
`;

const LGButton = styled(Button)`
    &&& {
        border: 2px solid whitesmoke;
        min-width: fit-content;
        margin-left: 0.5rem;
    }
`;
