import React, {useEffect, useState} from "react";
import {useTypedSelector} from "../../../app/stores";
import {useAppDispatch} from "../../../common/hooks";
import {Button, Card} from "flowbite-react";
import {selectAuth} from "../../auth/store/authSlice";
import {fetchBestServices} from "../store/bestServicesAPI";
import {selectBestServices, selectError, selectStatus} from "../store/bestServicesSlice";

const HealthTipsAndGuidance: React.FC = () => {
    const status = useTypedSelector(selectStatus);
    const error = useTypedSelector(selectError);
    const bestServices = useTypedSelector(selectBestServices);

    const authState = useTypedSelector(selectAuth);
    const dispatch = useAppDispatch()

    useEffect(() => {
        if(authState) dispatch(fetchBestServices(authState.id))
    }, [authState, dispatch]);

    return <section className={'container mx-auto flex flex-col justify-center items-center gap-10'}>
        <div className={'pt-10 pb-5 flex flex-col justify-center items-center gap-5'}>
            <h1 className={'text-3xl font-bold leading-10'}>Health tips and guidance</h1>
        </div>

        <div className={'flex flex-col gap-4 w-full'}>
            {
                bestServices.map(_ => {
                    return <Card className={'w-full bg-gray-200'} key={_.id}>
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Noteworthy technology acquisitions 2021
                        </h5>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                            Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
                        </p>
                    </Card>
                })
            }
        </div>
    </section>
}

export default HealthTipsAndGuidance