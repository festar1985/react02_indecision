console.log("The App is running");

class IndisitionApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: props.options,
    };
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.handleDeleteSingleOption = this.handleDeleteSingleOption.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
  }

  componentDidMount() {
    try {
      const jsonOptions = JSON.parse(localStorage.getItem("options"));
      if (jsonOptions) {
        this.setState(() => ({ options: jsonOptions }));
      }
    } catch (error) {}
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.options.length != this.state.options.lenght) {
      const jsonOptions = JSON.stringify(this.state.options);
      localStorage.setItem("options", jsonOptions);
      console.log("App updated");
    }
  }

  componenWillUnmount() {
    console.log("App is closing");
  }

  handleDeleteOptions() {
    this.setState(() => ({ options: [] }));
  }
  handleDeleteSingleOption(option) {
    this.setState((prevState) => ({
      options: prevState.options.filter((element) => option !== element),
    }));
  }

  handlePick() {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    alert(this.state.options[randomNum]);
    //return this.state.options[randomNum];
  }

  handleAddOption(optionElement) {
    if (!optionElement) {
      return "Please add a valid element";
    } else if (this.state.options.indexOf(optionElement) > -1) {
      return "This option is already in the list";
    } else {
      this.setState((previousState) => ({
        options: previousState.options.concat(optionElement),
      }));
    }
  }

  render() {
    const title = "Do not touch this is mine";
    const subtitle = "Put your hands in the computer choice";

    return (
      <div>
        <Header title={title} subtitle={subtitle} />
        <Action
          hasOptions={this.state.options.length > 0}
          handlerPick={this.handlePick}
        />
        <Options
          options={this.state.options}
          handleDeleteOptions={this.handleDeleteOptions}
          handleDeleteSingleOption={this.handleDeleteSingleOption}
        />
        <AddOption handleAddOption={this.handleAddOption} />
      </div>
    );
  }
}

IndisitionApp.defaultProps = {
  options: [],
};

const Header = function (props) {
  return (
    <div>
      <h1>{props.title}</h1>
      <h2>{props.subtitle}</h2>
    </div>
  );
};

const Action = (props) => {
  return (
    <div>
      <button onClick={props.handlerPick} disabled={!props.hasOptions}>
        What Should i do
      </button>
    </div>
  );
};

const Options = (props) => {
  return (
    <div>
      <button onClick={props.handleDeleteOptions}>Remove All</button>
      {props.options.length === 0 && (
        <p>There are no optins added.Please add one</p>
      )}
      {props.options.map((option) => (
        <Option
          key={option}
          optionText={option}
          handleDeleteSingleOption={props.handleDeleteSingleOption}
        />
      ))}
    </div>
  );
};

const Option = (props) => {
  return (
    <div>
      {props.optionText}
      <button
        onClick={(e) => {
          props.handleDeleteSingleOption(props.optionText);
        }}
      >
        remove
      </button>
    </div>
  );
};

class AddOption extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddOptions = this.handleAddOptions.bind(this);
    this.state = {
      error: undefined,
    };
  }
  handleAddOptions(e) {
    e.preventDefault();
    const option = e.target.elements.option.value.trim();

    const returnedError = this.props.handleAddOption(option);
    this.setState(() => ({ error: returnedError }));

    if (!error) {
      e.target.elements.option.value = "";
    }
  }
  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.handleAddOptions}>
          <input type="text" name="option" />
          <button>Add Option</button>
        </form>
      </div>
    );
  }
}

ReactDOM.render(<IndisitionApp />, document.getElementById("app"));
