import { Circle } from "better-react-spinkit";
import styled from "styled-components";

export default function Loading() {
    return (
        <center
            style={{ display: "grid", placeItems: "center", height: "100vh" }}
        >
            <div>
                <img
                    src="logo.svg"
                    alt="Logo"
                    style={{ marginBottom: "1rem", height: "6rem" }}
                />
                <Circle color="#555" size={"3.75rem"} />
            </div>
        </center>
    );
}
