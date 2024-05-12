import React, { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';

const TextEditor = ({ placeholder }) => {
    const editor = useRef(null);
    const [content, setContent] = useState('');

    const config = useMemo(
        () => ({
            readonly: false,
            placeholder: placeholder || 'Start typing...',
            height: 500
        }),
        [placeholder]
    );

    const handleBlur = (newContent) => {
        setContent(newContent);
    };

    const handleChange = (newContent) => {
        // Você pode adicionar lógica aqui, se necessário
    };

    return (
        <JoditEditor
            ref={editor}
            value={content}
            config={config}
            tabIndex={1}
            onBlur={handleBlur}
            onChange={handleChange}
        />
    );
};

export default TextEditor;
