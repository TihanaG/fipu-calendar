import styled from 'styled-components'
import { Event } from './Event';

const Cell = styled.div`
    background-color: ${props => props.isSelected ? 'black' : 'var(--white)'};
    color: ${props => props.isSelected ? 'var(--white)' : 'black'};
    border: 1px solid rgba(0, 0, 0, 0.1);
    position: relative;
    height: 100%;
    padding-left: 5px;
    cursor: pointer;
    transition: var(--transition);

    :hover {
        background-color: ${props => props.isSelected ? 'black' : '#eee'};
        cursor: pointer;
    }
`;

export const DatePickerCell = ({ isSelected, dateNumber = '', events = [] }) => {
    return (
        <Cell isSelected={isSelected}>
            {dateNumber}
            {/* promijeniti key u id ili nesto kasnije */}
            {events.map(event => <Event key={event.name} name={event.name} />)}
        </Cell>
    )
}
