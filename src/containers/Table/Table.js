import React, {useEffect, useState} from 'react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import {Button} from 'semantic-ui-react';
import {addZero} from "../../helper";
import './Table.css';

export const Table = props => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [errorDifferenceNumbers, setErrorDifferenceNumbers] = useState('');
    const [errorEndDate, setErrorEndDate] = useState('');

    const handleSubmit = async () => {
        props.history.push(`/result?s=${startDate}&e=${endDate}`);
    };

    useEffect(() => {
        let error;
        if (!startDate || !endDate) {
            error = '';
        } else {
            error = Date.parse(startDate) > Date.parse(endDate) ? 'Start date must be less than end date' : '';
        }
        setErrorDifferenceNumbers(error);
    }, [startDate, endDate]);

    useEffect(() => {
        const nowDate = Date.now();
        const error = nowDate < Date.parse(endDate) ? 'End date must be less than current date' : '';
        setErrorEndDate(error);
    }, [endDate]);

    const setDate = date => {
        const year = date.getFullYear();
        const month = addZero(date.getMonth() + 1);
        const day = addZero(date.getDate());
        return `${year}-${month}-${day}`;
    };

    return (
        <div>
            <div className='dates-form'>
                <div className='table-header'>Bitcoin cources:</div>
                <div>
                    <div className='dates-inputs'>
                        <div className='table-field'>
                            <div className='label'>Start date:</div>
                            <SemanticDatepicker
                                format={'DD-MM-YYYY'}
                                onChange={(event, date) => setStartDate(date.value ? setDate(date.value) : '')}

                                datePickerOnly={true}/>
                        </div>
                        <div className='table-field'>
                            <div className='label'>End date:</div>
                            <SemanticDatepicker
                                format={'DD-MM-YYYY'}
                                onChange={(event, date) => setEndDate(date.value ? setDate(date.value) : '')}
                                datePickerOnly={true}/>
                        </div>
                    </div>
                </div>
                <Button
                    className='submit-button'
                    onClick={handleSubmit}
                    inverted color='olive'
                    disabled={!startDate || !endDate || !!errorEndDate || !!errorDifferenceNumbers}
                >Send</Button>
                {errorDifferenceNumbers ? <div className='error-validation'>{errorDifferenceNumbers}</div> : null}
                {errorEndDate ? <div className='error-validation'>{errorEndDate}</div> : null}
            </div>
        </div>
    )
};