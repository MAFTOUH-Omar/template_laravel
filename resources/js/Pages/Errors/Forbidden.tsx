import React from 'react';

export default function Forbidden({ message } : any) {
    return (
        <div className="forbidden-page">
            <h1>403 - Forbidden</h1>
            <p>{message || "You are not authorized to access this page."}</p>
            <a href="/">Return to Home</a>
        </div>
    );
}