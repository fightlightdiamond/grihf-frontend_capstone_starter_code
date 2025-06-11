import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from 'flowbite-react';
import { usePDF } from 'react-to-pdf';
import { faker } from '@faker-js/faker';
import { DoctorSpecialty } from '../../home/enum.ts';

const ViewReport: React.FC = () => {
  const { toPDF, targetRef } = usePDF({ filename: 'page.pdf' });
  const getRandomSpecialty = (): DoctorSpecialty => {
    const values = Object.values(DoctorSpecialty);
    const randomIndex = Math.floor(Math.random() * values.length);
    return values[randomIndex] as DoctorSpecialty;
  };

  return (
    <section className={'container mx-auto'}>
      <div ref={targetRef} className="overflow-x-auto">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeadCell>#</TableHeadCell>
              <TableHeadCell>Doctor Name</TableHeadCell>
              <TableHeadCell>Doctor Speciality</TableHeadCell>
              <TableHeadCell>View Report</TableHeadCell>
              <TableHeadCell>Download Report</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody className="divide-y">
            {Array.from({ length: 5 }).map((_, index) => (
              <TableRow
                key={index}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {index + 1}
                </TableCell>
                <TableCell>{faker.person.fullName()}</TableCell>
                <TableCell>{getRandomSpecialty()}</TableCell>
                <TableCell>
                  <Button type="submit">View Report</Button>
                </TableCell>
                <TableCell>
                  <Button onClick={() => toPDF()} type="submit">
                    Download Report
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export default ViewReport;
