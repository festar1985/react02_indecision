console.log("The App is running");

const app = {
  title: "Indecision App",
  subject: "Put your life in hands of a computer",
  options: [],
};

const onSubmit = (e) => {
  e.preventDefault();
  const option = e.target.elements.option.value;

  if (option) {
    app.options.push(option);
    e.target.elements.option.value = "";
  }

  renderApp();
};

const makeDecision = () => {
  const randomNum = Math.floor(Math.random() * app.options.length);
  const option = app.options[randomNum];

  alert(option);
};

const removeAll = () => {
  app.options = [];
  renderApp();
};

const appRoot = document.getElementById("app");

const renderApp = () => {
  const template = (
    <div>
      <h1>{app.title}</h1>
      <p>{app.subject}</p>
      <p>
        {app.options.length > 0
          ? "Here are your options:"
          : "There are no options"}
      </p>
      <button disabled={app.options.length === 0} onClick={makeDecision}>
        What should i do
      </button>
      <button onClick={removeAll}>Remove All</button>
      <ol>
        {app.options.map((element) => (
          <li key={element}>Options:{element}</li>
        ))}
      </ol>
      <form onSubmit={onSubmit}>
        <input type="text" name="option" />
        <button>Add Option</button>
      </form>
    </div>
  );

  ReactDOM.render(template, appRoot);
};

renderApp();
