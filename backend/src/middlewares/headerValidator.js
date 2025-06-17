export const validateHeaders = (req, res, next) => {
  const errors = [];
  const { headers } = req;

  if (!headers["x-request-id"]) errors.push("Missing X-Request-ID");
  if (!headers["x-api-version"]) errors.push("Missing X-API-Version");
  if (!headers["x-client-version"]) errors.push("Missing X-Client-Version");

  if (headers["x-request-id"] && headers["x-request-id"].length < 3) {
    errors.push("X-Request-ID must be at least 3 characters");
  }

  const supportedVersions = ["1.2.3", "2.0.0"];
  if (
    headers["x-api-version"] &&
    !supportedVersions.includes(headers["x-api-version"])
  ) {
    errors.push(
      `Unsupported API version. Use: ${supportedVersions.join(", ")}`
    );
  }

  const versionPattern = ["2.14.0", "2.15.0"];
  if (
    headers["x-client-version"] &&
    !versionPattern.includes(headers["x-client-version"])
  ) {
    errors.push(`Invalid X-Client-Version. Use: ${versionPattern.join(", ")}`);
  }

  if (errors.length > 0) {
    return res.status(400).json({
      status: false,
      code: 400,
      message: "Header validation failed",
      errors,
      docs: "https://api.yoursite.com/headers",
    });
  }

  next();
};
