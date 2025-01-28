export const getErrorMessage = (error: any) => {
  if (error?.message && typeof error.message === "string") {
    return error.message;
  }
  return null;
};
