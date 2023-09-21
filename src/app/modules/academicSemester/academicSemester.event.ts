import { RedisClient } from '../../../shared/redis';
import { EVENT_ACADEMIC_SEMESTER_CREATED } from './academicSemester.constants';
import { IAcademicSemesterCreatedEvent } from './academicSemester.interface';
import { AcademicSemesterService } from './academicSemester.services';

const initAcademicSemesterEvents = () => {
  RedisClient.subscribe(EVENT_ACADEMIC_SEMESTER_CREATED, async (e: string) => {
    const data: IAcademicSemesterCreatedEvent = JSON.parse(e);
    console.log(data);
    await AcademicSemesterService.createSemesterFromEvent(data);
  });
};

export default initAcademicSemesterEvents;
