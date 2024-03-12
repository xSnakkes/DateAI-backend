export class ApiError extends Error {
  status: number;
  errors: string[];

  constructor(status: number, message: string, errors: string[] = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static UnauthorizedError() {
    return new ApiError(401, "User is not authorized");
  }

  static BadRequest(message: string, errors: string[] = []) {
    return new ApiError(400, message, errors);
  }

  static InternalServerError() {
    return new ApiError(500, "Internal server error");
  }
  
  static NotFound(message: string) {
    return new ApiError(404, message);
  }

  static Forbidden(message: string) {
    return new ApiError(403, message);
  }

  static Conflict(message: string) {
    return new ApiError(409, message);
  }

  static UnprocessableEntity(message: string) {
    return new ApiError(422, message);
  }

  static TooManyRequests(message: string) {
    return new ApiError(429, message);
  }

  static MethodNotAllowed(message: string) {
    return new ApiError(405, message);
  }

  static NotImplemented(message: string) {
    return new ApiError(501, message);
  }

  static BadGateway(message: string) {
    return new ApiError(502, message);
  }

  static ServiceUnavailable(message: string) {
    return new ApiError(503, message);
  }

  static GatewayTimeout(message: string) {
    return new ApiError(504, message);
  }

  static LengthRequired(message: string) {
    return new ApiError(411, message);
  }

  static PayloadTooLarge(message: string) {
    return new ApiError(413, message);
  }

  static UnsupportedMediaType(message: string) {
    return new ApiError(415, message);
  }

  static UnavailableForLegalReasons(message: string) {
    return new ApiError(451, message);
  }

  static UnrecoverableError(message: string) {
    return new ApiError(456, message);
  }
}