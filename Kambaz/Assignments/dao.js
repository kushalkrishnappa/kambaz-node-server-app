import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export default function AssignmentsDao() {
  // Find all assignments for a specific course
  function findAssignmentsForCourse(courseId) {
    return model.find({ course: courseId });
  }

  // Create a new assignment
  async function createAssignment(assignment) {
    const newAssignment = { ...assignment, _id: uuidv4() };
    return model.create(newAssignment);
  }

  // Delete an assignment
  function deleteAssignment(assignmentId) {
    return model.deleteOne({ _id: assignmentId });
  }

  // Update an existing assignment
  function updateAssignment(assignmentId, assignmentUpdates) {
    return model.updateOne({ _id: assignmentId }, { $set: assignmentUpdates });
  }

  return {
    findAssignmentsForCourse,
    createAssignment,
    deleteAssignment,
    updateAssignment,
  };
}
