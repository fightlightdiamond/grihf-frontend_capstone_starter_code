import React, {Dispatch, SetStateAction} from "react";
import {
    Button,
    Card,
    Datepicker,
    Label,
    Modal,
    ModalBody,
    ModalHeader,
    Rating,
    RatingStar,
    Select,
    TextInput
} from "flowbite-react";
import * as yup from "yup"
import {IBookDoctor, TDoctor} from "../types";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

const schema = yup
    .object({
        name: yup.string().required().max(50),
        phone: yup.string().required().max(15),
        date: yup.string().required(),
        slot: yup.string().required(),
        // userId: yup.number().required(),
        // doctorId: yup.number().required(),
    })
    .required()

const CancelDoctorModal = ({selectedDoctor, openModal, setOpenModal, onSubmit} : {
    selectedDoctor: TDoctor | undefined, openModal:boolean,
    setOpenModal: Dispatch<SetStateAction<boolean>>,
    onSubmit: SubmitHandler<IBookDoctor>
}) => {
    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IBookDoctor>({
        resolver: yupResolver(schema),
    })

    return <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <ModalHeader>Booking: {selectedDoctor?.userId}</ModalHeader>
        <ModalBody>
            <div className="space-b-2">
                <div className={'flex justify-center'}>
                    {selectedDoctor ?
                        <Card key={selectedDoctor?.id}
                              horizontal={true}
                              className="max-w-sm"
                              imgAlt="Meaningful alt text for an image that is not purely decorative"
                              imgSrc={selectedDoctor?.profile?.avatar}
                        >

                            <div className={'flex flex-col justify-center gap-2 text-center'}>
                                <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    {selectedDoctor?.profile?.name}
                                </h5>
                                <p className={'text-md'}>{selectedDoctor?.specialty}</p>
                                <p className={'text-md'}>{selectedDoctor?.experienceYear} Years experience</p>
                                <div className={'flex gap-1 text-md justify-center'}>
                                    Ratings:
                                    <Rating>
                                        {
                                            Array.from({length: 5})
                                                .map((_value, ratingIndex) =>
                                                    <RatingStar key={ratingIndex}
                                                                filled={ratingIndex < selectedDoctor?.rating}/>)
                                        }
                                    </Rating>
                                </div>
                            </div>
                        </Card>
                        : ''
                    }
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <div className="block">
                            <Label htmlFor={'name'}>Name:</Label>
                        </div>
                        <TextInput
                            {...register("name", {required: true, maxLength: 20})}
                            id="name" type="text" sizing="md"/>
                        <p>{errors.name?.message}</p>
                    </div>
                    <div>
                        <div className="block">
                            <Label htmlFor={'phone'}>Phone:</Label>
                        </div>
                        <TextInput
                            {...register("phone", {required: true, maxLength: 20})}
                            id="phone" type="text" sizing="md"/>
                        <p>{errors.phone?.message}</p>
                    </div>
                    <div>
                        <div className="block">
                            <Label htmlFor={'date'}>Date of Appointment:</Label>
                        </div>
                        <Controller
                            rules={{
                                required: true,
                            }}
                            control={control}
                            name='date'
                            render={({field}) => (
                                <Datepicker
                                    id={'date'}
                                    showClearButton={true}
                                    onChange={(date) => field.onChange(date)}
                                />
                            )}
                        /><p>{errors.date?.message}</p>
                    </div>
                    <div>
                        <div className="block">
                            <Label htmlFor={'slot'}>Book Time Slot:</Label>
                        </div>
                        <Select
                            id={'slot'}
                            {...register("slot")}
                            required aria-placeholder={'Search doctors by specialty'}>
                            <option value="">Select a time slot</option>
                            {
                                Array.from({
                                    length: 8
                                }).map((_, time) => <option key={time+9}>{time+9}</option>)
                            }
                        </Select>

                        <p>{errors.slot?.message}</p>
                    </div>

                    <Button className={'w-full mt-4'} type="submit">Book now</Button>
                </form>
            </div>
        </ModalBody>
    </Modal>
}

export default CancelDoctorModal