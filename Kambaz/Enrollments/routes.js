import EnrollmentsDao from "./dao.js";

export default function EnrollmentsRoutes(app) {
  const dao = EnrollmentsDao();

  // Enroll a user in a course
  const enrollUserInCourse = async (req, res) => {
    const { userId, courseId } = req.params;
    const enrollment = await dao.enrollUserInCourse(userId, courseId);
    res.json(enrollment);
  };

  // Unenroll a user from a course
  const unenrollUserFromCourse = async (req, res) => {
    const { enrollmentId } = req.params;
    await dao.unenrollUserFromCourse(enrollmentId);
    res.sendStatus(200);
  };

  // Find enrollments for a user
  const findEnrollmentsForUser = async (req, res) => {
    const { userId } = req.params;
    const enrollments = await dao.findEnrollmentsForUser(userId);
    res.json(enrollments);
  };

  // Route mappings
  app.post(
    "/api/enrollments/users/:userId/courses/:courseId",
    enrollUserInCourse
  );
  app.get("/api/enrollments/users/:userId", findEnrollmentsForUser);
  app.delete("/api/enrollments/:enrollmentId", unenrollUserFromCourse);
}
