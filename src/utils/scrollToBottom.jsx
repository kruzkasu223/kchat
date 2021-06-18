const scrollToBottom = (Ref) => {
    Ref.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
    });
};

export default scrollToBottom;
