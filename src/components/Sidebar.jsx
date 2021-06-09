import { Avatar, Button, IconButton } from "@material-ui/core";
import styled from "styled-components";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import * as EmailValidator from "email-validator";

export default function Sidebar() {
    const createChat = () => {
        const input = prompt("Please Enter an Email of User to Add to Chat.");

        if (!input) return null;

        if (EmailValidator.validate(input)) {
        }
    };

    return (
        <Container>
            <Header>
                <UserAvatar />
                <IconsContainer>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </IconsContainer>
            </Header>

            <Search>
                <SearchIcon />
                <SearchInput placeholder="Search in Chats" />
            </Search>

            <SidebarButton onClick={createChat}>Start a New Chat</SidebarButton>

            <h1>Sidebar</h1>
        </Container>
    );
}

const Container = styled.div``;

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

const UserAvatar = styled(Avatar)`
    cursor: pointer;

    &:hover {
        opacity: 0.8;
    }
`;

const IconsContainer = styled.div``;

const Search = styled.div`
    display: flex;
    align-items: center;
    padding: 1.25rem;
    border-radius: 0.125rem;
`;

const SearchInput = styled.input`
    outline-width: 0;
    flex: 1;
    border: none;
`;

const SidebarButton = styled(Button)`
    width: 100%;

    &&& {
        border-top: 1px solid whitesmoke;
        border-bottom: 1px solid whitesmoke;
    }
`;
