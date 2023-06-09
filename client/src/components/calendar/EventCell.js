import styled from 'styled-components'
import { Event } from './Event';

const CellWrap = styled.div`
    // background-color: var(--white); // for all cells
    // background-color: ${props => props.isSelected ? 'var(--primary-500)' : 'var(--white)'};
    // background-color: ${props => (props.isSunday || props.isSaturday) ? 'none;' : 'var(--white);'};
    // border-radius: ${props => props.isSelected ? '10px' : ''};
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

    :hover {
        background-color: ${props => props.isSelected ? 'var(--primary-700)' : 'var(--grey-50)'};
        border-radius: ${props => props.isSelected ? '10px' : ''};
        cursor: pointer;
    }
`;

const Circle = styled.div`
    background-color: ${props => props.isToday && props.isInCurrentMonth && props.isSelected
        ? 'var(--primary-400)'
        : !props.isToday && props.isInCurrentMonth && props.isSelected
            ? 'var(--primary-400)'
            : props.isToday && props.isInCurrentMonth && !props.isSelected
                ? 'var(--primary-500)'
                : props.isToday && !props.isInCurrentMonth
                    ? 'var(--grey-100)'
                    : 'transparent'};
    color: ${props => props.isToday && props.isInCurrentMonth
        ? 'var(--white)'
        : props.isInCurrentMonth
            ? 'var(--textColor)'
            : '#aaa'};
    border-radius: 50%;
    height: 30px;
    width: 30px;
    text-align: center;
    margin-bottom: 2px;
`;

export const EventCell = ({
    isToday,
    isSunday,
    isSelected,
    isInCurrentMonth,
    dateNumber = '',
    events = [],
}) => {
    return (
        <CellWrap
            isSunday={isSunday}
            // isSelected={isSelected}
            isInCurrentMonth={isInCurrentMonth}
        >
            <Circle
                isToday={isToday}
                isInCurrentMonth={isInCurrentMonth}
                isSelected={isSelected}
            >
                {dateNumber}
            </Circle>
            {/* promijeniti key u id ili nesto kasnije */}
            {events.map(event => (
                <Event
                    key={event.name}
                    name={event.name}
                    selectedColor={event.color}
                />
            ))}
        </CellWrap>
    )
}
