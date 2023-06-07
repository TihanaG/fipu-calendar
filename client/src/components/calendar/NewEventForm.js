import { useState } from 'react';
import Wrapper from '../../assets/wrappers/NewEventForm';
import { RadioButton } from "./RadioButton";



// Ako nema dodaj, ako ima edit

export const NewEventForm = ({ createNewEvent, options }) => {
    const [newEventName, setNewEventName] = useState(options[0].value);

    /*const handleOption = (e) => {
        setNewEventName(e.target.value)
    }*/

    const handleOptionChange = (value) => {
        setNewEventName(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newEventName) return;
        const selectedOption = options.find((option) => option.value === newEventName)
        const selectedLabel = selectedOption ? selectedOption.label : newEventName
        createNewEvent(selectedLabel, selectedOption.color);
        setNewEventName("");
    };

    return (
        <Wrapper>
            <form onSubmit={handleSubmit}>
                <h4>Select Event</h4>
                <div className="form-control">
                    <div className="form-check">
                        {options.map((option) => {
                            return (
                                <label key={option.value} htmlFor={option.value} onClick={() => handleOptionChange(option.value)}>
                                    <RadioButton
                                        value={option.value}
                                        checked={newEventName === option.value}
                                        color={option.color}
                                        className="form-check-input"
                                        onChange={handleOptionChange}
                                    />
                                    {option.label}
                                </label>
                            )
                        })}
                    </div>
                    <button type="submit" className="btn">
                        Save
                    </button>
                </div>
            </form>

        </Wrapper>
    )
}