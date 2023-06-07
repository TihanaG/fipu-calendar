import { useState } from 'react'
import moment from 'moment'
import { Calendar } from "./Calendar"
import { Modal } from './Modal'
import { NewEventForm } from './NewEventForm'
import { DatePickerCell } from './DatePickerCell'

export const DatePickerController = () => {
    const [events, setEvents] = useState([])
    const [showNewEventModal, setShowNewEventModal] = useState(false)
    const [selectedDate, setSelectedDate] = useState(null)

    const today = moment()
    const [currentMonthMoment, setCurrentMonthMoment] = useState(today)

    const incrementMonth = () => {
        setCurrentMonthMoment(moment(currentMonthMoment.add(1, 'months')))
    }

    const decrementMonth = () => {
        setCurrentMonthMoment(moment(currentMonthMoment.subtract(1, 'months')))
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
        setSelectedDate(moment(`${date}${month}${year}`, 'DDMMYYYY'))
    }

    return (
        <>
            <input
                readOnly
                value={selectedDate ? selectedDate.format('DD/MM/YYYY') : ''} />
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
                        isSelected: dayMoment.isSame(selectedDate, 'date'),
                    }
                }}
                // onCellClicked={displayModal}
                onCellClicked={onDateSelected}
                month={currentMonthMoment.format('MM')}
                year={currentMonthMoment.format('YYYY')}
                onPrev={decrementMonth}
                onNext={incrementMonth}
                cellComponent={DatePickerCell}
            />
        </>

    )
}