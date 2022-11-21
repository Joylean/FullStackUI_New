import { Department } from "./department.model";
import { Dependent } from "./dependent.model";
import { Designation } from "./designation.model";
import { Project } from "./project.model";

export interface Employee {
    id: number;
    employeeName: string;
    dateofJoining: Date;
    email: string;
    primaryContactNumber: number;
    department: Department;
    project: Project;
    designation: Designation;
    dependent: Dependent;
}