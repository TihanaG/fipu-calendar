import { useEffect, useState } from 'react'
import moment from 'moment'
// import { saveAs } from 'file-saver'
import { Calendar } from "./Calendar"
import { Modal } from './Modal'
import { NewEventForm } from './NewEventForm'
import { EventCell } from './EventCell';
import * as XLSX from 'xlsx'
import { useAppContext } from '../../context/appContext'
import { CalendarMenu } from './CalendarMenu'

export const EventTrackerController = () => {
    const [events, setEvents] = useState([])
    const [showNewEventModal, setShowNewEventModal] = useState(false)
    const [selectedDate, setSelectedDate] = useState(null)
    const [selectedDates, setSelectedDates] = useState([])
    const [selectMoreMode, setSelectMoreMode] = useState(true) // 'selectMore' or 'selectOne'
    const [showAddButton, setShowAddButton] = useState(false)

    const { user } = useAppContext()

    const options = [
        { label: "Rad", value: "rad", color: "#2158C2" },
        { label: "Rad od kuće", value: "radOdKuce", color: "#7721C2" },
        { label: "Bolovanje", value: "bolovanje", color: "#C22121" },
        { label: "Službeni put", value: "sluzbeniPut", color: "#219BC2" },
        { label: "Godišnji", value: "godisnji", color: "#C29521" },
    ]

    const today = moment()
    const [currentMonthMoment, setCurrentMonthMoment] = useState(today)

    const incrementMonth = () => {
        setCurrentMonthMoment(moment(currentMonthMoment.add(1, 'months')))
    }

    const decrementMonth = () => {
        setCurrentMonthMoment(moment(currentMonthMoment.subtract(1, 'months')))
    }

    const setToday = () => {
        setCurrentMonthMoment(today)
    }

    const createNewEvent = (eventName, eventColor) => {
        if (!selectMoreMode) {
            const newEvents = selectedDates.map(date => ({
                name: eventName,
                date: date,
                color: eventColor,
            }));
            setEvents([...events, ...newEvents]);
        } else {
            const newEvent = {
                name: eventName,
                date: selectedDate,
                color: eventColor,
            };
            setEvents([...events, newEvent]);
        }
        setShowNewEventModal(false);
        setSelectedDates([]);
    };



    const createAllRad = () => {
        const daysInMonth = currentMonthMoment.daysInMonth();
        const startOfMonth = moment(currentMonthMoment).startOf('month');

        const newEvents = [];

        for (let i = 0; i < daysInMonth; i++) {
            const date = moment(startOfMonth).add(i, 'days');
            const dayOfWeek = date.day();

            // Skip Saturdays (6) and Sundays (0)
            if (dayOfWeek !== 6 && dayOfWeek !== 0) {
                const isEventExists = events.some((event) => event.date.isSame(date, 'day'));
                if (!isEventExists) {
                    const newEvent = {
                        name: options[0].label,
                        date: date,
                        color: options[0].color,
                    };
                    newEvents.push(newEvent);
                }
            }
        }

        setEvents([...events, ...newEvents]);
        // setSelectedDate(null);
    };

    const clearAll = () => {
        const filteredEvents = events.filter(event => !event.date.isSame(currentMonthMoment, 'month'));
        setEvents(filteredEvents);
    }


    const displayModal = (date, month, year) => {
        // console.log({ date, month, year })
        selectMoreMode && setSelectedDate(moment(`${date}${month}${year}`, 'DDMMYYYY'))

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

    const selectOne = () => {
        setSelectMoreMode(true)
        setSelectedDates([])
    }

    const exportEventsToExcel = () => {
        const selectedMonth = currentMonthMoment.format('MM');
        const selectedYear = currentMonthMoment.format('YYYY');
        const daysInMonth = currentMonthMoment.daysInMonth();
        const startOfMonth = moment(currentMonthMoment).startOf('month');

        const data = [];

        for (let i = 0; i < daysInMonth; i++) {
            const date = moment(startOfMonth).add(i, 'days');
            const event = events.find((event) => event.date.isSame(date, 'day'));

            const eventData = {
                Date: date.format('DD'),
                Event: event ? event.name : '',
                // Color: event && event.color ? event.color : '#eee',
            };

            data.push(eventData);
        }

        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(data);

        XLSX.utils.book_append_sheet(workbook, worksheet, 'Events');

        const fileName = `${selectedMonth}-${selectedYear}-${user?.name}.xlsx`;
        XLSX.writeFile(workbook, fileName);
    };

    useEffect(() => {
        setShowAddButton(selectedDates.length > 0);
    }, [selectedDates]);

    return (
        <>
            <Modal
                shouldShow={showNewEventModal}
                onRequestClose={() => setShowNewEventModal(false)}
            >
                {/*<h3>{selectedDate && selectedDate.format('DD. MMM YYYY')}</h3>*/}
                <NewEventForm
                    createNewEvent={createNewEvent}
                    options={options}
                />
            </Modal>


            {/* events={events} in calendar is removed
            getCellProps instead */}
            <Calendar
                getCellProps={(dayMoment) => {
                    const eventsForDay = events.filter((event) => {
                        return event.date.isSame(dayMoment, 'day');
                    });
                    return {
                        isSelected: selectedDates.some((selectedDate) =>
                            selectedDate.isSame(dayMoment, 'date')
                        ),
                        isToday: dayMoment.isSame(today, 'day'),
                        events: eventsForDay,
                    };
                }}
                onCellClicked={selectMoreMode ? displayModal : onDateSelected}
                month={currentMonthMoment.format('MM')}
                year={currentMonthMoment.format('YYYY')}
                onPrev={decrementMonth}
                onNext={incrementMonth}
                setToday={setToday}
                cellComponent={EventCell}
                showAddButton={showAddButton}
            >
                {(getCellProps) => (
                    <CalendarMenu
                        createAllRad={createAllRad}
                        selectMoreMode={selectMoreMode}
                        setSelectMoreMode={setSelectMoreMode}
                        selectOne={selectOne}
                        clearAll={clearAll}
                        exportEventsToExcel={exportEventsToExcel}
                        showAddButton={showAddButton}
                        selectedDates={selectedDates}
                        displayModal={displayModal}
                        getCellProps={getCellProps}
                    />
                )}
            </Calendar>

            <p>{selectedDates.map(date => date.format('DD/MM/YYYY')).join(', ')}</p>
        </>

    )
}