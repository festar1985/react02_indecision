import React from "react";
import Action from "./Action";
import AddOption from "./AddOption";
import Options from "./Options";
import Header from "./Header";
import OptionModal from "./OptionModal";

class IndisitionApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: props.options,
      selectedOption: undefined,
    };
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.handleDeleteSingleOption = this.handleDeleteSingleOption.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.handleModalOK = this.handleModalOK.bind(this);
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
    if (prevState.options.length !== this.state.options.lenght) {
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

  handleModalOK() {
    this.setState(() => ({ selectedOption: undefined }));
  }

  handleDeleteSingleOption(option) {
    this.setState((prevState) => ({
      options: prevState.options.filter((element) => option !== element),
    }));
  }

  handlePick() {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNum];
    this.setState(() => ({
      selectedOption: option,
    }));
  }

  handleAddOption(optionElement) {
    if (!optionElement) {
      return "Please add a valid option element";
    } else if (this.state.options.indexOf(optionElement) > -1) {
      return "This option is already in the list";
    } else {
      this.setState((previousState) => ({
        options: previousState.options.concat(optionElement),
      }));
    }
  }

  render() {
    const title = "You can not make a choice?";
    const subtitle = "Put your destiny in the AI hands";

    return (
      <div>
        <Header title={title} subtitle={subtitle} />
        <div className="container">
          <Action
            hasOptions={this.state.options.length > 0}
            handlerPick={this.handlePick}
          />
          <div className="widget">
            <Options
              options={this.state.options}
              handleDeleteOptions={this.handleDeleteOptions}
              handleDeleteSingleOption={this.handleDeleteSingleOption}
            />
            <AddOption handleAddOption={this.handleAddOption} />
          </div>
        </div>
        <OptionModal
          selectedOption={this.state.selectedOption}
          handleModalOK={this.handleModalOK}
        />
      </div>
    );
  }
}

IndisitionApp.defaultProps = {
  options: [],
};

export default IndisitionApp;
