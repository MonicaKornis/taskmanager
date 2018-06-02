const ErrorHandler = WrappedComponent => {
  // debugger
  return (
    <WrappedComponent>
      {<div className="error-message">Oops! Something went wrong!</div>}
      {this.props.children}
    </WrappedComponent>
  );
};

export default ErrorHandler;
