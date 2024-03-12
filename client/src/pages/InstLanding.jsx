import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom'; 

const InstLanding = () => {

    return (
        <main>
            <div className="flex-row justify-center">
                <button >Create Exam</button>
                <button >See Students</button>
                <button >Create New Questions</button>
            </div>
        </main>
    );
};

export default InstLanding;