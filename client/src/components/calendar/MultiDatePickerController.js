import { useState } from 'react'
import moment from 'moment'
import { Calendar } from "./Calendar"
import { Modal } from './Modal'
import { NewEventForm } from './NewEventForm'
import { PillCell } from './PillCell'

export const MultiDatePickerController = () => {
    const [events, setEvents] = useState([])
    const [showNewEventModal, setShowNewEventModal] = useState(false)
    // za Modal selectedDate
    const [selectedDate, setSelectedDate] = useState(null)
    const [selectedDates, setSelectedDates] = useState([])
    const [selectMoreMode, setselectMoreMode] = useState(true) // 'selectMore' or 'selectOne'

    const today = moment()
    const [currentMonthMoment, setCurrentMonthMoment] = useState(today)

    // za testiranje datuma iz prethodnog mjeseca
    // const danas = moment([2023, 2, 28])

    const [showAddButton,] = useState(true);

    const incrementMonth = () => {
        setCurrentMonthMoment(moment(currentMonthMoment.add(1, 'months')))
    }

    const decrementMonth = () => {
        setCurrentMonthMoment(moment(currentMonthMoment.subtract(1, 'months')))
    }

    const setToday = () => {
        setCurrentMonthMoment(today)
    }

    const createNewEvent = name => {
        setEvents(events.concat({ name, date: selectedDate }))
        setShowNewEventModal(false)
        setSelectedDate(null)
    }

    const displayModal = (date, month, year) => {
        // console.log({ date, month, year })
        setSelectedDate(moment(`${date}${month}${year}`, 'DDMMYYYY'))
        setShowNewEventModal(true)
    }

    const onDateSelected = (date, month, year) => {
        const clickedMoment = moment(`${date}${month}${year}`, 'DDMMYYYY')

        const isSelected = selectedDates.some(date => date.isSame(clickedMoment, 'date'))

        if (isSelected) {
            setSelectedDates(selectedDates.filter(date => !date.isSame(clickedMoment, 'date')))
        } else {
            setSelectedDates(selectedDates.concat(clickedMoment))
        }
    }

    return (
        <>
            <div>
                {selectMoreMode
                    ? <button onClick={() => setselectMoreMode(false)}>Select More</button>
                    : <button onClick={() => setselectMoreMode(true)}>Select One</button>
                }
            </div>
            <Modal
                shouldShow={showNewEventModal}
                onRequestClose={() => setShowNewEventModal(false)}
            >
                <h3>New event for {selectedDate && selectedDate.format('DD/MM/YYYY')}</h3>
                <NewEventForm onSubmit={createNewEvent} />
            </Modal>
            {/* events={events} in calendar is removed
            getCellProps instead */}
            <Calendar
                getCellProps={(dayMoment) => {
                    return {
                        // isSelected: dayMoment.isSame(selectedDate, 'date'),
                        isSelected: selectedDates.some(selectedDate => selectedDate.isSame(dayMoment, 'date')),
                        isToday: dayMoment.isSame(today, 'day')

                    }
                }}
                onCellClicked={selectMoreMode ? displayModal : onDateSelected}
                month={currentMonthMoment.format('MM')}
                year={currentMonthMoment.format('YYYY')}
                onPrev={decrementMonth}
                onNext={incrementMonth}
                setToday={setToday}
                cellComponent={PillCell}
                showAddButton={showAddButton}
            />
            <p>{selectedDates.map(date => date.format('DD/MM/YYYY')).join(', ')}</p>
        </>

    )
}