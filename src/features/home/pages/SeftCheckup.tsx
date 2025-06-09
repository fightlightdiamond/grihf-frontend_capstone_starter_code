import React, {useEffect, useState} from "react";
import {useTypedSelector} from "../../../app/stores";
import {useAppDispatch} from "../../../common/hooks";
import {Button, Card} from "flowbite-react";
import {selectAuth} from "../../auth/store/authSlice";
import {fetchBestServices} from "../store/bestServicesAPI";
import {selectBestServices, selectError, selectStatus} from "../store/bestServicesSlice";

const BestServices: React.FC = () => {
    const status = useTypedSelector(selectStatus);
    const error = useTypedSelector(selectError);
    const bestServices = useTypedSelector(selectBestServices);

    const authState = useTypedSelector(selectAuth);
    const dispatch = useAppDispatch()

    useEffect(() => {
        // Mở một cửa sổ mới (ví dụ: trang nhận dữ liệu)
        window.postMessage({ key: 123}, '*')

        if(authState) dispatch(fetchBestServices(authState.id))
    }, [authState, dispatch]);

    return <section className={'container mx-auto flex flex-col justify-center items-center gap-10'}>
        <div className={'py-10 flex flex-col justify-center items-center gap-5'}>
            <h1 className={'text-3xl font-bold leading-10'}>Best services</h1>
            <p>Prevention is better than cure</p>
        </div>

        <div className={'grid grid-cols-4 gap-4'}>
            {
                bestServices.map(_ => {
                    return <Card key={_.id}
                        className="max-w-sm"
                        imgAlt="Meaningful alt text for an image that is not purely decorative"
                        imgSrc={_.image}
                    >
                        <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white text-center">
                            {_.title}
                        </h5>
                    </Card>
                })
            }
        </div>
    </section>
}

export default BestServices