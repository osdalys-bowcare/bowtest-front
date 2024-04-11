"use client";

import {useEffect, useState} from "react";

export default function Dashboard() {
    const [message, setMessage] = useState('');
    const [auth, setAuth] = useState(false);

    useEffect(() => {
        (
            async () => {
                try {
                    const response = await fetch('http://localhost:8000/api/auth/get-user', {
                        method: 'GET',
                        headers: {
                          Accept: 'application/json',
                          'Content-Type': 'application/json',
                          Authorization: 'Bearer' + sessionStorage.getItem('token')
                        },
                    });

                    const content = await response.json();

                    setAuth(true);
                    console.log(`Hi ${content.name}`)
                } catch (e) {
                    console.log('You are not logged in');
                    setAuth(false);
                }
            }
        )();
    });

}