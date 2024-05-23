"use client"

import { SignInInterface } from "@/interface/auth";
import { techiniqueInterface } from "@/interface/technique";

const moduleUrl = "fighter"

export const listFighters = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL_BACK_END}/${moduleUrl}/`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const result = await res.json();
      return result;
    } catch (err) {
        console.log(err);
        throw err
    }
  };


  export const listTechnique = async () => {
    try {
        console.log( `${process.env.NEXT_PUBLIC_URL_BACK_END}/${moduleUrl}/technique` );
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL_BACK_END}/${moduleUrl}/technique`
        ,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const result = await res.json();
      return result;
    } catch (err) {
        console.log(err);
        throw err
    }
  };


  export const listLevelByIdFighter = async (id:number) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL_BACK_END}/${moduleUrl}/level/${id}`
        ,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const result = await res.json();
      return result;
    } catch (err) {
        console.log(err);
        throw err
    }
  };


  export const insertLevelToFighter = async (id:string, data:any) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL_BACK_END}/${moduleUrl}/newlevel/${id}`
        ,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data)
      });
      const result = await res.json();
      const cs = res.headers.get('set-cookie');
      return { result, cookie: cs};
    } catch (err) {
        console.log(err);
        throw err
    }
  };

  
  
  export const updateLevelToFighter = async (idLevel:string, data:any) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL_BACK_END}/${moduleUrl}/level/${idLevel}`
        ,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data)
      });
      const result = await res.json();
      const cs = res.headers.get('set-cookie');
      return { result, cookie: cs};
    } catch (err) {
        console.log(err);
        throw err
    }
  };

  