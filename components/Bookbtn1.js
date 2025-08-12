'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SimpleHoverButton() {
  const [hovered, setHovered] = useState(false);
  const router = useRouter();

  return (
    <button
      onClick={() => router.push('/services')}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: hovered ? '#d1ccc6' : '#e0dcd6', // small hover effect
        color: 'black',
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
      Learn More
    </button>
  );
}
