let counter = 0;

const plusOne = () => {
  counter++;
  renderApp();
};
const minusOne = () => {
  counter--;
  renderApp();
};
const reset = () => {
  counter = 0;
  renderApp();
};

const appRoot = document.getElementById("app");

const renderApp = () => {
  const counterTemplate = (
    <div>
      <h1>counter : {counter}</h1>
      <button onClick={plusOne}>Add 1</button>
      <button onClick={minusOne}>Remove 1</button>
      <button onClick={reset}>Reset</button>
    </div>
  );

  ReactDOM.render(counterTemplate, appRoot);
};

renderApp();
