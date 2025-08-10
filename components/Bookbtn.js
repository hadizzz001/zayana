'use client';

import { useState } from 'react';

export default function SimpleHoverButton( ) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: hovered ? '#CBAB58' : 'black',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        padding: '1em 2em',
        fontWeight: '600',
        fontSize: '1rem',
        borderRadius: '9999px',
        userSelect: 'none',
        transition: 'background-color 0.3s ease',
        marginTop: '5em',
        marginBottom: '5em',
      }}
    >
      Book a Consultation 
    </button>
  );
}
