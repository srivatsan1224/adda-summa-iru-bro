import { Request, Response, NextFunction } from "express";

export const validateJob = (req: Request, res: Response, next: NextFunction): void => {
  const { title, description, responsibilities, location, requiredEducation, requiredSkills, salaryRange, jobType, workSchedule, companyName, contactDetails } = req.body;

  if (!title || !description || !responsibilities || !location || !requiredEducation || !requiredSkills || !salaryRange || !jobType || !workSchedule || !companyName || !contactDetails?.email) {
    res.status(400).json({
      message: "Missing required fields. Please provide all mandatory details.",
    });
    return;
  }

  next();
};
