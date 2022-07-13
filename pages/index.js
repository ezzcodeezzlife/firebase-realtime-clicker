import Head from 'next/head'
import Image from 'next/image'
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue,  child, push, update, get  } from "firebase/database";
import { useState, useEffect } from 'react';

const firebaseConfig = {
  apiKey: "AIzaSyC2dIawj4Grscq9NL4gPQFuYqikSfcFDQE",
  authDomain: "clicker-8d587.firebaseapp.com",
  projectId: "clicker-8d587",
  storageBucket: "clicker-8d587.appspot.com",
  messagingSenderId: "1050082048846",
  appId: "1:1050082048846:web:e79b9632c3891bfd543c1f",
  measurementId: "G-E80WDYP07D",
  // The value of `databaseURL` depends on the location of the database
  databaseURL: "https://clicker-8d587-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);


const db = getDatabase();
const counterRef = ref(db, 'counter/');

export default function Home() {
  const [count, setCount] = useState(1000000);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onValue(counterRef, (snapshot) => {
      const data = snapshot.val();
      setCount(data.counter);
      console.log("Data changed")
      setLoading(false);
    });
  }, []);

  const decrement = () => {
    set(counterRef, { counter: count - 1 });  
  } 
  
  if(count === 0) {
    window.location.replace('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
  }

  if(loading) {
    return <div className='h-screen w-screen select-none flex flex-col justify-center items-center  bg-slate-800 active:bg-slate-900'>
    <div className='font-bold shadow-slate-500 text-6xl text-slate-300'>loading...</div>
  </div>
  }

  return (
   
    <div onClick={()=>{ decrement() }} className='h-screen w-screen select-none flex flex-col justify-center items-center  bg-slate-800 active:bg-slate-900'>
      <div className='font-bold shadow-slate-500 text-6xl text-slate-300'>{count}</div>
      <div className='animate-ping text-slate-500'>click me</div>
      <div className='text-slate-500'>already clicked:</div>
      <div className='font-bold shadow-slate-500 text-3xl text-slate-300'>{ 1000000 - count }</div>
    </div>
  )
}
