const ErrorMessage = ({ error }: { error: string }) => {
  return <div className="text-red-500 font-semibold">{error}</div>;
};

export default ErrorMessage;
