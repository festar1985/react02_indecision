"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

console.log("The App is running");

var IndisitionApp = function (_React$Component) {
  _inherits(IndisitionApp, _React$Component);

  function IndisitionApp(props) {
    _classCallCheck(this, IndisitionApp);

    var _this = _possibleConstructorReturn(this, (IndisitionApp.__proto__ || Object.getPrototypeOf(IndisitionApp)).call(this, props));

    _this.state = {
      options: props.options
    };
    _this.handleDeleteOptions = _this.handleDeleteOptions.bind(_this);
    _this.handleDeleteSingleOption = _this.handleDeleteSingleOption.bind(_this);
    _this.handlePick = _this.handlePick.bind(_this);
    _this.handleAddOption = _this.handleAddOption.bind(_this);
    return _this;
  }

  _createClass(IndisitionApp, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      try {
        var jsonOptions = JSON.parse(localStorage.getItem("options"));
        if (jsonOptions) {
          this.setState(function () {
            return { options: jsonOptions };
          });
        }
      } catch (error) {}
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevState.options.length != this.state.options.lenght) {
        var jsonOptions = JSON.stringify(this.state.options);
        localStorage.setItem("options", jsonOptions);
        console.log("App updated");
      }
    }
  }, {
    key: "componenWillUnmount",
    value: function componenWillUnmount() {
      console.log("App is closing");
    }
  }, {
    key: "handleDeleteOptions",
    value: function handleDeleteOptions() {
      this.setState(function () {
        return { options: [] };
      });
    }
  }, {
    key: "handleDeleteSingleOption",
    value: function handleDeleteSingleOption(option) {
      this.setState(function (prevState) {
        return {
          options: prevState.options.filter(function (element) {
            return option !== element;
          })
        };
      });
    }
  }, {
    key: "handlePick",
    value: function handlePick() {
      var randomNum = Math.floor(Math.random() * this.state.options.length);
      alert(this.state.options[randomNum]);
      //return this.state.options[randomNum];
    }
  }, {
    key: "handleAddOption",
    value: function handleAddOption(optionElement) {
      if (!optionElement) {
        return "Please add a valid element";
      } else if (this.state.options.indexOf(optionElement) > -1) {
        return "This option is already in the list";
      } else {
        this.setState(function (previousState) {
          return {
            options: previousState.options.concat(optionElement)
          };
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var title = "Do not touch this is mine";
      var subtitle = "Put your hands in the computer choice";

      return React.createElement(
        "div",
        null,
        React.createElement(Header, { title: title, subtitle: subtitle }),
        React.createElement(Action, {
          hasOptions: this.state.options.length > 0,
          handlerPick: this.handlePick
        }),
        React.createElement(Options, {
          options: this.state.options,
          handleDeleteOptions: this.handleDeleteOptions,
          handleDeleteSingleOption: this.handleDeleteSingleOption
        }),
        React.createElement(AddOption, { handleAddOption: this.handleAddOption })
      );
    }
  }]);

  return IndisitionApp;
}(React.Component);

IndisitionApp.defaultProps = {
  options: []
};

var Header = function Header(props) {
  return React.createElement(
    "div",
    null,
    React.createElement(
      "h1",
      null,
      props.title
    ),
    React.createElement(
      "h2",
      null,
      props.subtitle
    )
  );
};

var Action = function Action(props) {
  return React.createElement(
    "div",
    null,
    React.createElement(
      "button",
      { onClick: props.handlerPick, disabled: !props.hasOptions },
      "What Should i do"
    )
  );
};

var Options = function Options(props) {
  return React.createElement(
    "div",
    null,
    React.createElement(
      "button",
      { onClick: props.handleDeleteOptions },
      "Remove All"
    ),
    props.options.length === 0 && React.createElement(
      "p",
      null,
      "There are no optins added.Please add one"
    ),
    props.options.map(function (option) {
      return React.createElement(Option, {
        key: option,
        optionText: option,
        handleDeleteSingleOption: props.handleDeleteSingleOption
      });
    })
  );
};

var Option = function Option(props) {
  return React.createElement(
    "div",
    null,
    props.optionText,
    React.createElement(
      "button",
      {
        onClick: function onClick(e) {
          props.handleDeleteSingleOption(props.optionText);
        }
      },
      "remove"
    )
  );
};

var AddOption = function (_React$Component2) {
  _inherits(AddOption, _React$Component2);

  function AddOption(props) {
    _classCallCheck(this, AddOption);

    var _this2 = _possibleConstructorReturn(this, (AddOption.__proto__ || Object.getPrototypeOf(AddOption)).call(this, props));

    _this2.handleAddOptions = _this2.handleAddOptions.bind(_this2);
    _this2.state = {
      error: undefined
    };
    return _this2;
  }

  _createClass(AddOption, [{
    key: "handleAddOptions",
    value: function handleAddOptions(e) {
      e.preventDefault();
      var option = e.target.elements.option.value.trim();

      var returnedError = this.props.handleAddOption(option);
      this.setState(function () {
        return { error: returnedError };
      });

      if (!error) {
        e.target.elements.option.value = "";
      }
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        this.state.error && React.createElement(
          "p",
          null,
          this.state.error
        ),
        React.createElement(
          "form",
          { onSubmit: this.handleAddOptions },
          React.createElement("input", { type: "text", name: "option" }),
          React.createElement(
            "button",
            null,
            "Add Option"
          )
        )
      );
    }
  }]);

  return AddOption;
}(React.Component);

ReactDOM.render(React.createElement(IndisitionApp, null), document.getElementById("app"));
