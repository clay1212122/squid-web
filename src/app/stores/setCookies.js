'use server'
 
import { cookies } from 'next/headers'
 
export default async function setCookies() {
    console.log('cd');
    cookies().set('logged', true);
}