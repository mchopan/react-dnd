import React from 'react'
import Charts from './Charts';

const Controller = () => {


    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'My First Dataset',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                backgroundColor: [
                    'rgba(75,192,192,0.4)',
                    'rgba(54,162,235,0.4)',
                    'rgba(255,206,86,0.4)',
                    'rgba(75,192,192,0.4)',
                    'rgba(153,102,255,0.4)',
                    'rgba(255,159,64,0.4)',
                    'rgba(255,99,132,0.4)',
                ],
                borderColor: [
                    'rgba(75,192,192,1)',
                    'rgba(54,162,235,1)',
                    'rgba(255,206,86,1)',
                    'rgba(75,192,192,1)',
                    'rgba(153,102,255,1)',
                    'rgba(255,159,64,1)',
                    'rgba(255,99,132,1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className='controller-container' >
            <Charts type="bar" data={data} />
            <Charts type="line" data={data} />
            <Charts type="pie" data={data} />
            <Charts type="doughnut" data={data} />
            <Charts type="polarArea" data={data} />
            <Charts type="radar" data={data} />
            <Charts type="bubble" data={{
                datasets: [
                    {
                        label: 'My First Dataset',
                        data: [
                            { x: 20, y: 30, r: 15 },
                            { x: 40, y: 10, r: 10 },
                        ],
                        backgroundColor: 'rgba(75,192,192,0.4)',
                        borderColor: 'rgba(75,192,192,1)',
                    },
                ],
            }} />
            <Charts type="scatter" data={{
                datasets: [
                    {
                        label: 'Scatter Dataset',
                        data: [
                            { x: -10, y: 0 },
                            { x: 0, y: 10 },
                            { x: 10, y: 5 },
                            { x: 0.5, y: 5.5 },
                        ],
                        backgroundColor: 'rgba(75,192,192,0.4)',
                        borderColor: 'rgba(75,192,192,1)',
                    },
                ],
            }} />
        </div>
    );
}

export default Controller