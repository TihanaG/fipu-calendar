import { BiSelectMultiple } from 'react-icons/bi'

const CalendarMenu = ({
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
        <div className="btn-calendar-container">
            {<button type='button' className='btn-calendar' onClick={createAllRad}>
                <BiSelectMultiple />
                Select all</button>}

            {selectMoreMode
                ? <button type='button' className='btn-calendar' onClick={() => setSelectMoreMode(false)}>Select More</button>
                : <button type='button' className='btn-calendar' onClick={selectOne}>Clear</button>
            }
            <button type='button' className='btn-calendar' onClick={clearAll}>Delete all</button>
            <button type='button' className='btn-calendar' onClick={exportEventsToExcel}>Export to Excel</button>
            {showAddButton && selectedDates && (
                <button type='button' className='btn-calendar' onClick={displayModal}>+ Add</button>
            )}
        </div>
    )
}
export default CalendarMenu