import model from "./model.js";

export async function findCoursesForUser(userId) {
  const enrollments = await model.find({ user: userId }).populate("course");
  return enrollments.map((enrollment) => enrollment.course);
}

export default function EnrollmentsDao() {
  // Enroll a user in a course (handles duplicate enrollment gracefully)
  async function enrollUserInCourse(userId, courseId) {
    const enrollmentId = `${userId}-${courseId}`;

    // Check if enrollment already exists
    const existingEnrollment = await model.findById(enrollmentId);
    if (existingEnrollment) {
      return existingEnrollment;
    }

    // Create new enrollment if it doesn't exist
    return model.create({
      user: userId,
      course: courseId,
      _id: enrollmentId,
    });
  }

  // Unenroll a user from a course
  function unenrollUserFromCourse(user, course) {
    return model.deleteOne({ user, course });
  }

  // Unenroll all users from a course
  function unenrollAllUsersFromCourse(courseId) {
    return model.deleteMany({ course: courseId });
  }

  // Find courses for a user
  async function findCoursesForUser(userId) {
    const enrollments = await model.find({ user: userId }).populate("course");
    return enrollments.map((enrollment) => enrollment.course);
  }

  // Find users for a course
  async function findUsersForCourse(courseId) {
    const enrollments = await model.find({ course: courseId }).populate("user");
    return enrollments.map((enrollment) => enrollment.user);
  }

  // Find enrollments for a user (returns enrollment objects, not courses)
  async function findEnrollmentsForUser(userId) {
    return model.find({ user: userId });
  }

  return {
    findCoursesForUser,
    findUsersForCourse,
    findEnrollmentsForUser,
    enrollUserInCourse,
    unenrollUserFromCourse,
    unenrollAllUsersFromCourse,
  };
}
