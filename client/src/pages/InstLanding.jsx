import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom'; 

const InstLanding = () => {

    return (
        <main>
            <div className="flex-row justify-center">
                <button onClick={handleCreateExam}>Create Exam</button>
                <button onClick={handleViewStudents}>See Students</button>
                <button onClick={handleCreateQuestion}>Create New Questions</button>
            </div>
        </main>
    );
};

export default InstLanding;