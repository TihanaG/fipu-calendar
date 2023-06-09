import styled from 'styled-components'
import { BsCalendarCheck, BsCalendarWeek, BsCalendarEvent, BsCalendarPlus, BsCalendarX } from 'react-icons/bs'
import { RiFileExcel2Line } from 'react-icons/ri'

const CalendarMenuContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 5px;

    .btn-calendar {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0 0.5rem;
        position: relative;
        cursor: pointer;
        color: var(--grey-500);
        background: var(--white);
        border: transparent;
        border-radius: var(--borderRadius);
        letter-spacing: var(--letterSpacing);
        padding: 0.375rem 0.75rem;
        box-shadow: var(--shadow-2);
        transition: var(--transition);
        text-transform: capitalize;
}
    .btn-calendar:hover {
        background: var(--grey-50);
        box-shadow: var(--shadow-3);
    }

    .add-btn {
        background: var(--primary-500);
        color: var(--white);
    }

    .add-btn:hover {
        background: var(--primary-700);
        box-shadow: var(--shadow-3);
    }
`

export const CalendarMenu = ({
    createAllRad,
    selectMoreMode,
    setSelectMoreMode,
    selectOne,
    clearAll,
    exportEventsToExcel,
    showAddButton,
    selectedDates,
    displayModal
}) => {
    return (
        <CalendarMenuContainer>
            {showAddButton && selectedDates && (
                <button type='button' className='btn-calendar add-btn' onClick={displayModal}>
                    <BsCalendarPlus />
                    Add
                </button>
            )}
            <button type='button' className='btn-calendar' onClick={createAllRad}>
                <BsCalendarCheck />
                Select all
            </button>
            {selectMoreMode
                ? <button type='button' className='btn-calendar' onClick={() => setSelectMoreMode(false)}>
                    <BsCalendarWeek />
                    Select More
                </button>
                : <button type='button' className='btn-calendar' onClick={selectOne}>
                    <BsCalendarEvent />
                    Select One
                </button>
            }
            <button type='button' className='btn-calendar' onClick={clearAll}>
                <BsCalendarX />
                Delete all
            </button>
            <button type='button' className='btn-calendar' onClick={exportEventsToExcel}>
                <RiFileExcel2Line />
                Export to Excel
            </button>
        </CalendarMenuContainer>
    )
}