'use client'
import {useRouter} from "next/navigation";
import {useEffect} from "react";
import {useAppSelector} from "@/lib/hooks";

export default function Home() {
  const isAuth = useAppSelector(state => state.userReducer.isAuth);
  const router = useRouter();

  useEffect(() => {
    if(isAuth) router.push('/profile');
    else router.push('/login');
  }, []);

  return null
}
