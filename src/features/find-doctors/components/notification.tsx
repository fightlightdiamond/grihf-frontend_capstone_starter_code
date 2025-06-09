import {Toast, ToastToggle} from "flowbite-react";
import React, {Dispatch, SetStateAction} from "react";
import {IBookDoctor, TDoctor} from "../types";

const BookNotification = ({hiddenBook, setHiddenBook, selectedDoctor, bookDoctorSelector} : {
    hiddenBook: boolean, setHiddenBook: Dispatch<SetStateAction<any>>,
    selectedDoctor: TDoctor | undefined, bookDoctorSelector: IBookDoctor | null
}) => {
    return <>
        {
            hiddenBook ? '' : <Toast
                hidden={hiddenBook}
                className={'fixed bottom-2 right-2 border-2 border-green-400 re'}>
                <div className={'relative w-full'}>
                    <ToastToggle
                        onDismiss={() => setHiddenBook(true)}
                        className={'absolute top-0 right-0'}/>
                    <div className={'flex flex-col gap-1'}>
                        <div className="leading-10 text-xl font-normal">Appointment Details</div>
                        <p className={'text-sm'}><span>Doctor:</span> {selectedDoctor?.profile?.name}</p>
                        <p className={'text-sm'}><span>Speciality:</span> {selectedDoctor?.specialty}</p>
                        <p className={'text-sm'}><span>Name:</span> {bookDoctorSelector?.name}</p>
                        <p className={'text-sm'}><span>Phone Number:</span> {bookDoctorSelector?.phone}</p>
                        <p className={'text-sm'}><span>Date of Appointment:</span> {bookDoctorSelector?.date}</p>
                        <p className={'text-sm'}><span>Time slot:</span> {bookDoctorSelector?.slot}</p>
                    </div>
                </div>
            </Toast>
        }
    </>
}

export default BookNotification;