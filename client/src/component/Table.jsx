import React from 'react';

const Table = ({ props, handleDelete }) => {
    if (!props || props.length === 0) {
        return <div>No data available</div>;
    }

    // Get the keys from the first object in the array to create table headers
    const headers = Object.keys(props[0]);

    // Function to check if a string is a URL
    const isValidUrl = (string) => {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    };

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                    <tr>
                        <th>#</th>
                        {headers.map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {props.map((item, rowIndex) => (
                        <tr key={rowIndex}>
                            <th>{rowIndex + 1}</th>
                            {headers.map((header, cellIndex) => {
                                const cellValue = item[header];
                                if (typeof cellValue === 'object' && cellValue !== null) {
                                    return (
                                        <td key={cellIndex}>
                                            {JSON.stringify(cellValue)}
                                        </td>
                                    );
                                }
                                return (
                                    <td key={cellIndex}>
                                        {isValidUrl(cellValue) ? (
                                            <a href={cellValue} target="_blank" rel="noopener noreferrer">
                                                {cellValue}
                                            </a>
                                        ) : (
                                            cellValue
                                        )}
                                    </td>
                                );
                            })}
                            <td>
                                <button onClick={() => handleDelete(item.id)}>X</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Table;
