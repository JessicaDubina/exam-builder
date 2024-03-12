import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom'; 
import Navbar from '../components/Navbar'

const InstLanding = () => {

    return (
        <main>
            <Navbar />
            <div className="flex-row justify-center">
            </div>
        </main>
    );
};

export default InstLanding;