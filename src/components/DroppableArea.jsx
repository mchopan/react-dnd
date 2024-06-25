import React from 'react';
import { useDrop } from 'react-dnd';

const DroppableArea = ({ onDrop, children }) => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'CHART',
        drop: (item) => onDrop(item),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    return (
        <div
            ref={drop}
            style={{
                backgroundColor: isOver ? 'lightgreen' : 'white',
                height: '100vh',
                border: '1px solid black',
                padding: '10px',
            }}
        >
            {children}
        </div>
    );
};

export default DroppableArea;