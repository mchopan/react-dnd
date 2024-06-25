import React, { useEffect, useState } from 'react';
import { Bar, Bubble, Doughnut, Line, Pie, PolarArea, Radar, Scatter } from 'react-chartjs-2';
import useStore from '../store/store';
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import DroppableArea from './DroppableArea';

const Editor = () => {
    const setOpenRightNav = useStore((state) => state.setOpenRightNav);
    const setRightNavData = useStore((state) => state.setRightNavData);
    const charts = useStore((state) => state.charts);
    const addChart = useStore((state) => state.addChart);
    const updateChart = useStore((state) => state.updateChart);
    const removeChart = useStore((state) => state.removeChart);
    const preview = useStore((state) => state.preview);
    const togglePreview = useStore((state) => state.togglePreview);

    const [selectedChartIndex, setSelectedChartIndex] = useState(null);

    useEffect(() => {
        const storedCharts = localStorage.getItem('chartsData');
        if (storedCharts) {
            try {
                const parsedCharts = JSON.parse(storedCharts);
                if (Array.isArray(parsedCharts)) {
                    useStore.setState({ charts: parsedCharts });
                } else {
                    console.error("Stored charts data is not an array:", parsedCharts);
                }
            } catch (error) {
                console.error("Error parsing charts data from localStorage:", error);
            }
        } else {
            console.log("No charts data found in localStorage.");
        }
    }, []);

    const handleDrop = (item) => {
        const newChart = {
            ...item,
            x: 0,
            y: 0,
            w: 4,
            h: 4,
            i: `${new Date().getTime()}`
        };
        addChart(newChart);
    };

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

    const handleChartClick = (index) => {
        setRightNavData(charts[index]);
        setOpenRightNav(true);
        setSelectedChartIndex(index);
    };

    const handleRemove = (index) => {
        removeChart(index);
        setSelectedChartIndex(null);
    };

    const updateChartState = (index, newProperties) => {
        const updatedChart = { ...charts[index], ...newProperties };
        updateChart(index, updatedChart);
    };

    const handlePreview = () => {
        togglePreview();
    };

    const layout = charts.map((chart, index) => ({
        i: chart.i,
        x: chart.x || 0,
        y: chart.y || 0,
        w: chart.w || 4,
        h: chart.h || 4,
    }));

    const onLayoutChange = (newLayout) => {
        newLayout.forEach((item) => {
            const index = charts.findIndex((chart) => chart.i === item.i);
            if (index !== -1) {
                updateChartState(index, {
                    x: item.x,
                    y: item.y,
                    w: item.w,
                    h: item.h,
                });
            }
        });
    };

    const shuffleCharts = () => {
        const shuffledCharts = [...charts].sort(() => Math.random() - 0.5);
        const newLayout = shuffledCharts.map((chart, index) => ({
            ...chart,
            x: (index % 3) * 4,
            y: Math.floor(index / 3) * 4,
        }));
        newLayout.forEach((chart, index) => updateChartState(index, chart));
    };

    return (
        <div className='editor-container'>
            <button onClick={handlePreview}>{preview ? "Edit Mode" : "Preview Mode"}</button>
            <button onClick={shuffleCharts}>Shuffle Charts</button>
            <div style={{ margin: '10px' }}>
                <DroppableArea onDrop={handleDrop}>
                    <GridLayout
                        className="layout"
                        layout={layout}
                        cols={12}
                        rowHeight={30}
                        width={1200}
                        onLayoutChange={onLayoutChange}
                        isDraggable
                        isResizable
                        droppingItem={true}
                        compactType="horizontal"
                        preventCollision={true}
                    >
                        {charts.map((chart, index) => {
                            const ChartComponent = chartMap[chart.type];
                            if (!ChartComponent) {
                                console.error("Invalid chart type:", chart.type);
                                return null;
                            }

                            return (
                                <div key={chart.i} data-grid={layout[index]}>
                                    <div
                                        style={{ width: '100%', height: '100%', position: 'relative' }}
                                        onClick={() => handleChartClick(index)}
                                        className="chart-container"
                                    >
                                        <ChartComponent data={chart.data} id={index} />
                                        {selectedChartIndex === index && !preview && (
                                            <div style={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                display: "flex",
                                                flexDirection: "row",
                                                gap: "10px",
                                                backgroundColor: "rgba(255,255,255,0.8)",
                                                padding: "5px",
                                            }}>
                                                <button onClick={(e) => { e.stopPropagation(); handleChartClick(index); }}>Edit</button>
                                                <button onClick={(e) => { e.stopPropagation(); handleRemove(index); }}>Remove</button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </GridLayout>
                </DroppableArea>
            </div>
        </div>
    );
};

export default Editor;
