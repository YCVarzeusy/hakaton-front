"use client"

import { SignInInterface } from "@/interface/auth";

export const signInWidthEmailAndPassword = async (data:SignInInterface) => {
    const {email, password} = data;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL_BACK_END}/user/signin`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({email, password})
      });
      const result = await res.json();
      const cs = res.headers.get('set-cookie');
      return { result, cookie: cs};
    } catch (err) {
        throw err
    }
  };

  
export const readUserSession = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL_BACK_END}/user/getsession`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      
    });
    const result = await res.json();
    return result;
  } catch (err) {
      throw err
  }
};

export const logOut = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL_BACK_END}/user/logout`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    const result = await res.json();
    return result;
  } catch (err) {
      throw err
  }
};