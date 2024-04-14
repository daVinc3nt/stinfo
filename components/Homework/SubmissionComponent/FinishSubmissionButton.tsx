import React, { useState, useRef } from 'react';
import axios from 'axios';

const SubmitButton = (props: { file: File , uploadFile: (file: File) => void}) => {

    // This function is called when the button is clicked, the onClick event then triggers the hidden input element
    const handleClick = () => {
        const getFileInputElement = document.getElementById('selected_file');
        getFileInputElement.click();

        // console.log('file changed');
    };

    return (
        <div className="py-3">
             {/* the input element actually upload the file, but hidden from the UI, the button will 
             trigger the onChange event */}
            <input type='file' id="selected_file" className=' hidden' onChange={(event) => {
                if (event.target.files && event.target.files.length > 0) {
                    props.uploadFile(event.target.files[0]);
                }
            }}>
            </input>
            <button
                className="bg-blue-500 text-center block py-3 px-4 text-white border rounded-md hover:bg-blue-800" 
                onClick={handleClick}
            >
                Thêm bài nộp
            </button>
        </div>
    );
};

export default SubmitButton;