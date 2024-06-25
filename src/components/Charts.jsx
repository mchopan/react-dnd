import React from 'react';
import { Bar, Line, Pie, Doughnut, PolarArea, Radar, Bubble, Scatter } from 'react-chartjs-2';
import { useDrag } from 'react-dnd';

const Charts = ({ type, data }) => {

    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'CHART',
        item: { type, data },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    const chartMap = {
        bar: Bar,
        line: Line,
        pie: Pie,
        doughnut: Doughnut,
        polarArea: PolarArea,
        radar: Radar,
        bubble: Bubble,
        scatter: Scatter,
    };

    const ChartComponent = chartMap[type];

    return (
        <div
            ref={drag}
            style={{
                opacity: isDragging ? 0.5 : 1,
                border: '1px solid black',
                borderRadius: "5px",
                cursor: 'grab',
                marginBottom: '10px',
            }}
        >
            <ChartComponent data={data} />
            <p>{type.toUpperCase()}</p>
        </div>
    );
};

export default Charts;
