import React, {useRef, useState} from "react";
import {useTypedSelector} from "../../../app/stores";
import {useAppDispatch} from "../../../common/hooks";
import {
    Button,
    Datepicker,
    Label,
    Modal,
    ModalBody,
    ModalHeader,
    Rating,
    RatingStar,
    Select, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Textarea,
    TextInput
} from "flowbite-react";
import { usePDF } from 'react-to-pdf';

const ViewReport: React.FC = () => {
    const { toPDF, targetRef } = usePDF({filename: 'page.pdf'});

    return <section className={'container mx-auto'}>
        <div ref={targetRef} className="overflow-x-auto">
            <Table>
                <TableHead>
                    <TableRow>
                        <TableHeadCell>#</TableHeadCell>
                        <TableHeadCell>Doctor Name</TableHeadCell>
                        <TableHeadCell>Doctor Speciality</TableHeadCell>
                        <TableHeadCell>View Report</TableHeadCell>
                        <TableHeadCell>
                            Download Report
                        </TableHeadCell>
                    </TableRow>
                </TableHead>
                <TableBody className="divide-y">
                    <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            Apple MacBook Pro 17"
                        </TableCell>
                        <TableCell>Sliver</TableCell>
                        <TableCell>Laptop</TableCell>
                        <TableCell>
                            <Button type="submit">View Report</Button>
                        </TableCell>
                        <TableCell>
                            <Button type="submit">Download Report</Button>
                        </TableCell>
                    </TableRow>

                </TableBody>
            </Table>
        </div>

        <button onClick={() => toPDF()}>Download PDF</button>
    </section>;
}

export default ViewReport