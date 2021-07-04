import React from "react";

export default class AddOption extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddOptions = this.handleAddOptions.bind(this);
    this.state = {
      result: undefined,
    };
  }
  handleAddOptions(e) {
    e.preventDefault();
    const option = e.target.elements.option.value.trim();

    const result = this.props.handleAddOption(option);
    this.setState(() => ({ result: result }));

    if (!result) {
      e.target.elements.option.value = "";
    }
  }
  render() {
    return (
      <div>
        {this.state.result && (
          <p className="add-option-error">{this.state.result}</p>
        )}
        <form className="add-option" onSubmit={this.handleAddOptions}>
          <input className="add-option__input" type="text" name="option" />
          <button className="small-button">Add Option</button>
        </form>
      </div>
    );
  }
}
