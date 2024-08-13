import React, { useEffect, useState } from 'react';
import { getusercourse } from "@/services/Api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Enrollment = () => {
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const response = await getusercourse();
        setEnrollments(response.data);
      } catch (error) {
        console.error('Error fetching enrollments:', error);
      }
    };

    fetchEnrollments();
  }, []);

  return (
    <div className='ml-64 mt-16 p-4'>
      <Card className='shadow-sm shadow-primary'>
        <CardHeader className='w-full flex flex-row justify-between items-center p-3'>
          <CardTitle className='text-lg'>Enrollments</CardTitle>
        </CardHeader>
        <CardContent className='p-10'>
          <div className='overflow-x-auto'>
            <Table className="min-w-[100px] text-base">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px] p-3">Course Name</TableHead>
                  <TableHead className="w-[200px] p-3">Student Name</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {enrollments.map((enrollment, index) => (
                  <TableRow key={index}>
                    <TableCell className="p-3">{enrollment.title}</TableCell>
                    <TableCell className="p-3">{enrollment.name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Enrollment;
