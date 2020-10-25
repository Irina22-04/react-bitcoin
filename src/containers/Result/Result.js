import React, {useCallback, useEffect, useState} from 'react';
import {getBitcoins} from "../../api";
import {Loader} from 'semantic-ui-react';
import {VictoryAxis, VictoryChart, VictoryLine, VictoryScatter} from 'victory';
import './Result.css';

export const Result = (props) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    const getData = useCallback(async () => {
        if (!startDate || !endDate) return;
        try {
            const result = await getBitcoins(startDate, endDate);
            setResult(Object.entries(result.bpi).map(item => {
                return {
                    x: item[0],
                    y: item[1],
                }
            }));
        } catch (e) {
            setError('Error! Try again');
        } finally {
            setLoading(false);
        }
    }, [startDate, endDate]);

    useEffect(() => {
        const search = new URLSearchParams(props.location.search);
        setStartDate(search.get('s'));
        setEndDate(search.get('e'));
    }, [props.location.search]);

    useEffect(() => {
        getData();
    }, [getData]);

    if (loading) {
        return (
            <div className='loader-wrapper'>
                <Loader active inline/>
            </div>
        );
    }

    if (error) {
        return <div className='error'>{error}</div>
    }

    return (
        <div className='result-page-wrapper'>
            <div className='page-header'>Bitcoin cources:</div>
            <div className='result-wrapper'>
                <div className='table-wrapper'>
                    <div className='result-table'>
                        <div className='result-header table-row'>
                            <div className='result-date result-ceil'>Date:</div>
                            <div className='result-value result-ceil'>Value:</div>
                        </div>
                        {result.map((item => (
                                <div key={item.x} className='table-row'>
                                    <div className='result-date result-ceil'>{item.x}</div>
                                    <div className='result-value result-ceil'>{item.y}</div>
                                </div>
                            )
                        ))}
                    </div>
                </div>
                <div className={'chart-container'}>
                    <VictoryChart

                    >
                        <VictoryLine
                            data={result}
                            style={{data: {stroke: "#c43a31"}}}
                        />
                        <VictoryScatter data={result}
                                        size={2}
                                        style={{data: {fill: "#c43a31"}}}
                        />
                        <VictoryAxis dependentAxis
                                     style={{tickLabels: {fontSize: 10, fontFamily: 'Palatino Linotype'}}}
                        />
                        <VictoryAxis
                            style={{tickLabels: {angle: 45, fontSize: 10, fontFamily: 'Palatino Linotype'}}}
                        />
                    </VictoryChart>
                </div>
            </div>
        </div>);
};