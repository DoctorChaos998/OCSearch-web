'use client'
import Router from "@/components/Router/Router";
import {useAppSelector} from "@/store/hooks";
import {RouteNames} from "@/entites/routes/routes";

export default function Home() {
  const {isAuth} = useAppSelector(state => state.userReducer)
  return (
      <>
        {isAuth?
            <Router toUrl={RouteNames.PROFILE}></Router>
            :
            <Router toUrl={RouteNames.LOGIN}></Router>
        }
      </>
  )
}

