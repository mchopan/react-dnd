import React, { useEffect, useState } from 'react';
import useStore from '../store/store';
import { hexToRgba, rgbaToHex } from '../utils/ColorConvertor';

const RightNav = () => {
    const [localLabels, setLocalLabels] = useState([]);
    const [localDataLabel, setLocalDataLabel] = useState('');
    const [localColors, setLocalColors] = useState([]);
    const [localData, setLocalData] = useState([]);

    const openRightNav = useStore((state) => state.openRightNav);
    const toggleRightNav = useStore((state) => state.toggleRightNav);
    const rightNavData = useStore((state) => state.rightNavData);
    const updateChart = useStore((state) => state.updateChart);
    const charts = useStore((state) => state.charts);

    useEffect(() => {
        if (rightNavData) {
            setLocalLabels(rightNavData.data.labels || []);
            setLocalDataLabel(rightNavData.data.datasets[0].label || '');
            setLocalColors(rightNavData.data.datasets[0].backgroundColor || []);
            setLocalData(rightNavData.data.datasets[0].data || []);
        }
    }, [rightNavData]);

    const updateData = (updatedData) => {
        const chartIndex = charts.findIndex(chart => chart.id === rightNavData.id);
        updateChart(chartIndex, updatedData);
    };

    const handleLabelChange = (index, newValue) => {
        const updatedLabels = [...localLabels];
        updatedLabels[index] = newValue;
        setLocalLabels(updatedLabels);

        const updatedData = {
            ...rightNavData,
            data: {
                ...rightNavData.data,
                labels: updatedLabels
            }
        };

        updateData(updatedData);
    };

    const handleDataLabelChange = (newValue) => {
        setLocalDataLabel(newValue);

        const updatedData = {
            ...rightNavData,
            data: {
                ...rightNavData.data,
                datasets: [{
                    ...rightNavData.data.datasets[0],
                    label: newValue
                }]
            }
        };

        updateData(updatedData);
    };

    const handleColorChange = (index, newValue) => {
        const updatedColors = [...localColors];
        updatedColors[index] = hexToRgba(newValue);
        setLocalColors(updatedColors);

        const updatedData = {
            ...rightNavData,
            data: {
                ...rightNavData.data,
                datasets: [{
                    ...rightNavData.data.datasets[0],
                    backgroundColor: updatedColors
                }]
            }
        };

        updateData(updatedData);
    };

    const handleDataChange = (index, newValue) => {
        const updatedDataArr = [...localData];
        updatedDataArr[index] = newValue;
        setLocalData(updatedDataArr);

        const updatedData = {
            ...rightNavData,
            data: {
                ...rightNavData.data,
                datasets: [{
                    ...rightNavData.data.datasets[0],
                    data: updatedDataArr
                }]
            }
        };

        updateData(updatedData);
    };

    return (
        <div style={{
            overflow: "auto",
            position: 'fixed',
            right: 0,
            top: 0,
            height: '100%',
            width: '300px',
            backgroundColor: '#fff',
            boxShadow: '0 0 10px rgba(0,0,0,0.1)',
            transform: openRightNav ? 'translateX(0)' : 'translateX(100%)',
            transition: 'transform 0.3s ease-in-out',
        }}>
            <div style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                margin: "5px",
            }}>
                Edit Chart
                <button onClick={toggleRightNav}>Close</button>
            </div>
            <hr />
            <div>
                <h3 style={{ textAlign: "center" }}>Label</h3>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-around",
                    margin: "5px"
                }}>
                    <p>Data Set Label: </p>
                    <input
                        onChange={(e) => handleDataLabelChange(e.target.value)}
                        value={localDataLabel}
                    />
                </div>
            </div>
            <hr />
            <div>
                <h3 style={{ textAlign: "center" }}>Labels</h3>
                {localLabels && localLabels.map((item, index) => (
                    <div key={index} style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-around",
                        margin: "5px"
                    }}>
                        <p>Label {index}:</p>
                        <input
                            onChange={(e) => handleLabelChange(index, e.target.value)}
                            value={item}
                        />
                    </div>
                ))}
            </div>
            <hr />
            <div>
                <h3 style={{ textAlign: "center" }}>Colors</h3>
                {localColors && localColors.map((color, index) => (
                    <div key={index} style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-around",
                        margin: "5px"
                    }}>
                        <p>Color {index}:</p>
                        <input
                            type="color"
                            onChange={(e) => handleColorChange(index, e.target.value)}
                            value={rgbaToHex(color)}
                        />
                    </div>
                ))}
            </div>
            <hr />
            <div>
                <h3 style={{ textAlign: "center" }}>Data</h3>
                {localData && localData.map((data, index) => (
                    <div key={index} style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-around",
                        margin: "5px"
                    }}>
                        <p>Data {index}:</p>
                        <input
                            onChange={(e) => handleDataChange(index, e.target.value)}
                            value={data}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RightNav;
