import styled from 'styled-components'
import { Event } from './Event';

const CellWrap = styled.div`
    background-color: ${props => props.isSelected ? 'var(--primary-500)' : 'var(--white)'};
    border-radius: ${props => props.isSelected ? '10px' : ''};
    color: ${props => props.isSelected
        ? 'var(--white)'
        : props.isToday && props.isInCurrentMonth
            ? 'var(--white)'
            : props.isInCurrentMonth
                ? 'var(--textColor)'
                : '#aaa'};
    border: 1px solid rgba(0, 0, 0, 0.1);
    position: relative;
    height: 100%;
    padding: 2px;
    cursor: pointer;
    transition: var(--transition);

    @media (hover: hover){
    :hover {
        background-color: ${props => props.isSelected ? 'var(--primary-700)' : '#eee'};
        border-radius: ${props => props.isSelected ? '10px' : ''};
        cursor: pointer;
    }}
`;

const Circle = styled.div`
    background-color: ${props => props.isToday && props.isInCurrentMonth 
        ? 'var(--primary-500)' 
        : props.isToday && !props.isInCurrentMonth
            ? 'var(--grey-100)'
            : 'transparent'};
    border-radius: 50%;
    height: 30px;
    width: 30px;
    margin-bottom: 2px;
    text-align: center;
`;

export const PillCell = ({
    isToday,
    isSelected,
    isInCurrentMonth,
    dateNumber = '',
    events = [],
}) => {
    return (
        <CellWrap
            isSelected={isSelected}
            isInCurrentMonth={isInCurrentMonth}
            isToday={isToday}
        >
            <Circle
                isToday={isToday}
                isInCurrentMonth={isInCurrentMonth}
            >
                {dateNumber}
            </Circle>
            {/* promijeniti key u id ili nesto kasnije */}
            {events.map(event => <Event key={event.name} name={event.name} />)}
        </CellWrap>
    )
}
