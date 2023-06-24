import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import { paginationFields } from '../../../shared/pagination';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import {
  IAcademicSemester,
  academicSemesterFilterableFields,
} from './academicSemester.interface';
import { AcademicSemesterService } from './academicSemester.services';

const createSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body;
    const result = await AcademicSemesterService.createSemester(
      academicSemesterData
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic semester is created successfully',
      data: result,
    });

    next();
  }
);

const getAllSemesters = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const filters = pick(req.query, academicSemesterFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await AcademicSemesterService.getAllSemesters(
      filters,
      paginationOptions
    );

    sendResponse<IAcademicSemester[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester data retrived successfully',
      meta: result.meta,
      data: result.data,
    });

    next();
  }
);

export const AcademicSemesterController = { createSemester, getAllSemesters };
