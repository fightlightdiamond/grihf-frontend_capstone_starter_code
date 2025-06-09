import React, {useEffect, useState} from "react";
import {useTypedSelector} from "../../../app/stores";
import {useAppDispatch} from "../../../common/hooks";
import {
    Button,
    Card,
    Modal,
    ModalBody,
    ModalHeader,
    Rating,
    RatingStar,
    Select,
} from "flowbite-react";
import {selectAuth} from "../../auth/store/authSlice";

import {selectError, selectFindDoctors, selectStatus} from "../store/findDoctorsSlice";
import {DoctorSpecialty} from "../enum";
import {findDoctorsAPI} from "../store/findDoctorsAPI";
import {IBookDoctor, TDoctor} from "../types";
import FindDoctorModal from "../components/findDoctorModal";
import {bookDoctorAPI, cancelBookDoctor, getBookDoctorsAPI} from "../store/bookDoctorsAPI";
import {selectBookDoctor, selectBookDoctors} from "../store/bookDoctorsSlice";
import {SubmitHandler} from "react-hook-form";
import BookNotification from "../components/notification";

const FindDoctor: React.FC = () => {
    // const { register, handleSubmit } = useForm<IBookDoctor>()
    // const onSubmit: SubmitHandler<IBookDoctor> = (data) => console.log(data)
    //
    // const status = useTypedSelector(selectStatus);
    // const error = useTypedSelector(selectError);
    const findDoctorsSelector = useTypedSelector(selectFindDoctors);
    const bookDoctorSelector = useTypedSelector(selectBookDoctor);
    const bookDoctorSelectors = useTypedSelector(selectBookDoctors);

    const authState = useTypedSelector(selectAuth);
    const dispatch = useAppDispatch();
    const [selectedDoctor, setSelectedDoctor] = useState<TDoctor>();
    const [openModal, setOpenModal] = useState(false);
    const [bookedModal, setBookedModal] = useState(false);
    const [cancelModal, setCancelModal] = useState(false);
    const [hadSearch, setHadSearch] = useState(false);
    const [hiddenBook, setHiddenBook] = useState(true);
    const [specialty, setSpecialty] = useState<DoctorSpecialty>();

    useEffect(() => {

    }, [authState, dispatch]);

    function onFindDoctor() {
        if (specialty) {
            setHadSearch(true);
            dispatch(findDoctorsAPI(specialty)).unwrap()
            dispatch(getBookDoctorsAPI(authState?.id as number)).unwrap()
        }
    }

    function onBooking(doctor: TDoctor) {
        setSelectedDoctor(prevState => doctor)
        setOpenModal(true);
    }

    const onSubmit: SubmitHandler<IBookDoctor> = (data) => {
        const req = {
            ...data,
            doctorId: selectedDoctor?.userId as number,
            userId: authState?.id as number,
        };

        dispatch(bookDoctorAPI(req)).unwrap();
        setOpenModal(false);
        setHiddenBook(false);
    }

    function onCancel(doctorId: number) {
        dispatch(cancelBookDoctor({userId: authState?.id as number, doctorId})).unwrap()
    }

    return <section className={'container mx-auto flex flex-col gap-6 relative'}>
        {
            hadSearch ?
                <div className={'flex gap-4 justify-center'}>
                    <Select onChange={(e) => {
                        setSpecialty(e.target.value as DoctorSpecialty)
                    }} id="specialty" required aria-placeholder={'Search doctors by specialty'}>
                        <option value="">Search doctors by specialty</option>
                        {Object.values(DoctorSpecialty).map((doctor) => <option key={doctor}>{doctor}</option>)}
                    </Select>
                    <Button onClick={onFindDoctor} type="submit">Find</Button>
                </div>
                :
                <div className={'flex justify-center items-center'}>
                    <Card
                        className="max-w-md"
                        imgAlt="Meaningful alt text for an image that is not purely decorative"
                        imgSrc="./book/b1.png"
                    >
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Find a doctor at your own ease
                        </h5>

                        <Select onChange={(e) => {
                            setSpecialty(e.target.value as DoctorSpecialty)
                        }} id="specialty" required aria-placeholder={'Search doctors by specialty'}>
                            <option value="">Search doctors by specialty</option>
                            {Object.values(DoctorSpecialty).map((doctor) => <option key={doctor}>{doctor}</option>)}
                        </Select>
                        <Button onClick={onFindDoctor} type="submit">Find</Button>
                    </Card>
                </div>
        }

        <div className={'text-center'}>
            <h2 className={'text-2xl font-bold'}>{findDoctorsSelector.length} doctors available in</h2>
            <h3 className={'text-lg font-bold'}>Book appointment with minimum wait-time & verified doctor details</h3>
        </div>

        <div className={'grid grid-cols-4 gap-4'}>
            {
                findDoctorsSelector.map((doctor, doctorIndex) => {
                    return <Card key={doctor.id}
                                 className="max-w-sm"
                                 imgAlt={doctor?.profile?.avatar}
                                 imgSrc={doctor?.profile?.avatar}
                    >

                        <div className={'flex flex-col justify-center gap-2 text-center'}>
                            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                {doctor.profile?.name}
                            </h5>
                            <p>{doctor.specialty}</p>
                            <p>{doctor.experienceYear} Years experience</p>
                            <div className={'flex gap-1'}>
                                Ratings:
                                <Rating>
                                    {
                                        Array.from({length: 5})
                                            .map((_, ratingIndex) =>
                                                <RatingStar key={ratingIndex}
                                              filled={ratingIndex < doctor.rating}/>)
                                    }
                                </Rating>
                            </div>
                            {
                                !bookDoctorSelectors.find(bookDoctor => bookDoctor.doctorId === doctor.userId) ?
                                    <Button onClick={() => onBooking(doctor)} type="submit">Book Appointment No
                                        Booking
                                        Fee</Button>
                                    : <Button color={'red'}
                                              onClick={() => onCancel(doctor.id)} type="submit">
                                        Cancel Appointment No Booking Fee
                                    </Button>
                            }

                        </div>
                    </Card>
                })
            }
        </div>

        <FindDoctorModal
            openModal={openModal}
            setOpenModal={setOpenModal}
            selectedDoctor={selectedDoctor}
            onSubmit={onSubmit}/>

        <Modal show={bookedModal} onClose={() => setBookedModal(false)}>
            <ModalHeader>Booking</ModalHeader>
            <ModalBody>
                <div className="space-y-6">
                    information doctor
                    <Button className={'w-full'} type="submit">Cancel Appointment</Button>
                </div>
            </ModalBody>
        </Modal>
        <BookNotification
            hiddenBook={hiddenBook}
                setHiddenBook={setHiddenBook}
            selectedDoctor={selectedDoctor}
            bookDoctorSelector={bookDoctorSelector}
        />
    </section>
}

export default FindDoctor