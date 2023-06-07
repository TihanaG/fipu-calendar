import styled from "styled-components";

const EventBox = styled.div`
    // background-color: #2158C2;
    background-color: ${props => props.selectedColor || "#2158C2"};
    border-radius: 4px;
    color: #fff;
    padding: 0 8px;
    margin-bottom: 2px;
`;

export const Event = ({ name, selectedColor }) => {
    return (
        <EventBox selectedColor={selectedColor}>{name}</EventBox>
    )
}
