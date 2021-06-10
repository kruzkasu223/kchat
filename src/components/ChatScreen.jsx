import { Avatar, IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import { auth, db } from "@utils/firebase";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { useCollection } from "react-firebase-hooks/firestore";
import Message from "@components/Message";
import { useEffect, useRef, useState } from "react";
import SendIcon from "@material-ui/icons/Send";
import firebase from "firebase";
import getRecipientEmail from "@utils/getRecipientEmail";
import TimeAgo from "timeago-react";

export default function ChatScreen({ chat, messages }) {
    const [user] = useAuthState(auth);
    const router = useRouter();
    const [input, setInput] = useState("");
    const enterToClick = useRef(null);
    const endOfMsgsRef = useRef(null);
    const recipientEmail = getRecipientEmail(chat.users, user);
    const [recipientSnapshot] = useCollection(
        db.collection("users").where("email", "==", recipientEmail)
    );
    const recipient = recipientSnapshot?.docs?.[0]?.data();

    const [messagesSnapshot] = useCollection(
        db
            .collection("chats")
            .doc(router.query.id)
            .collection("messages")
            .orderBy("timestamp", "asc")
    );

    const scrollToBottom = () => {
        endOfMsgsRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    useEffect(() => scrollToBottom(), [showMessages]);

    const showMessages = () => {
        if (messagesSnapshot) {
            return messagesSnapshot.docs.map((message) => (
                <Message
                    key={message.id}
                    user={message.data().user}
                    message={{
                        ...message.data(),
                        timestamp: message.data().timestamp?.toDate().getTime(),
                    }}
                />
            ));
        } else {
            return JSON.parse(messages).map((message) => (
                <Message
                    key={message.id}
                    user={message.user}
                    message={message}
                />
            ));
        }
    };

    const sendMessage = (e) => {
        e.preventDefault();

        db.collection("users").doc(user.uid).set(
            {
                lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
            },
            { merge: true }
        );

        db.collection("chats").doc(router.query.id).collection("messages").add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            user: user.email,
            photoURL: user.photoURL,
        });

        setInput("");
        scrollToBottom();
    };

    document.onkeydown = (e) => {
        if (input) {
            if (e.code == "Enter") {
                enterToClick.current.click();
            }
        }
    };

    return (
        <Container>
            <Header>
                {recipient ? (
                    <Avatar src={recipient.photoURL} />
                ) : (
                    <Avatar>{recipientEmail[0].toUpperCase()}</Avatar>
                )}

                <HeaderInfo>
                    <h4>{recipientEmail}</h4>
                    {recipientSnapshot ? (
                        <p>
                            Last Seen:{" "}
                            {recipient?.lastSeen?.toDate() ? (
                                <TimeAgo
                                    datetime={recipient?.lastSeen?.toDate()}
                                />
                            ) : (
                                "Unavailable"
                            )}
                        </p>
                    ) : (
                        <p>Last Seen: Loading...</p>
                    )}
                </HeaderInfo>
                <HeaderIcons>
                    <IconButton>
                        <AttachFileIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </HeaderIcons>
            </Header>

            <MessageContainer>
                {showMessages()}
                <EndOfMessages ref={endOfMsgsRef} />
            </MessageContainer>

            <InputContainer>
                <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Write a Message"
                />
                <IconButton
                    disabled={!input}
                    type="submit"
                    onClick={sendMessage}
                    ref={enterToClick}
                >
                    <SendIcon />
                </IconButton>
            </InputContainer>
        </Container>
    );
}

const Container = styled.div``;

const Header = styled.header`
    position: sticky;
    background-color: white;
    z-index: 100;
    top: 0;
    display: flex;
    padding: 0.75rem;
    height: 5rem;
    align-items: center;
    border-bottom: 1px solid whitesmoke;
`;

const HeaderInfo = styled.div`
    margin-left: 1rem;
    flex: 1;

    h4 {
        margin-bottom: 0.125rem;
    }

    p {
        font-size: 0.75rem;
        color: gray;
    }
`;

const HeaderIcons = styled.div``;

const EndOfMessages = styled.div`
    margin-bottom: 3rem;
`;

const MessageContainer = styled.div`
    padding: 2rem;
    background-color: #eee;
    min-height: 90vh;
    overflow-y: scroll;
`;

const InputContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 0.5rem;
    position: sticky;
    bottom: 0;
    background-color: white;
    z-index: 100;
`;

const Input = styled.input`
    flex: 1;
    outline: none;
    border: none;
    border-radius: 0.5rem;
    background-color: whitesmoke;
    padding: 1.25rem;
    margin: 0 1rem;
    font-size: 1rem;
`;
