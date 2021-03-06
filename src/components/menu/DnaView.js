import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import LoadingScreen from "../shared/LoadingScreen";
import { Form, DnaSequenceInput, MutationType, MutationSelector, AdvancedSettings } from "../form";
import api from "../../utils/Endpoints";

class DnaView extends Component {
  state = {
    cursorPosition: 1,
    sequenceLength: 0,
    isValid: false,
    loading: false,
    mode: "DNA",
    sequence: "",
    mutation_type: "",
    target: "",
    position: 0,
    replacement: "",
    Tm_range_min: 75,
    Tm_range_max: 85,
    gc_range_min: 40,
    gc_range_max: 60,
    length_min: 25,
    length_max: 45,
    flank5_range_min: 11,
    flank5_range_max: 21,
    flank3_range_min: 11,
    flank3_range_max: 21,
    forward_overlap5: 9,
    forward_overlap3: 9,
    terminate_gc: true,
    center_mutation: true,
    primer_mode: "complementary",
    expression_system: "Homo sapiens",
  };

  formDefaults = { ...this.state };

  handleChange = e => {
    let { name, value } = e.target;
    if (name === "sequence" || name === "target" || name === "replacement") {
      let sequence = value.toUpperCase().split("");
      let filteredSequence = [];
      sequence.forEach(char => {
        if (["A", "G", "T", "C"].includes(char)) filteredSequence.push(char);
      });
      if (e.target.name === "sequence") {
        this.setState({
          sequence: filteredSequence.join(""),
          cursorPosition: e.target.selectionStart + 1,
          sequenceLength: value.length,
        });
      } else {
        this.setState({ [name]: filteredSequence.join("") });
      }
    } else {
      if (name === "mutation_type") {
        this.setState({
          target: "",
          replacement: "",
        });
      }
      this.setState({ [name]: value });
    }
  };

  handleChangeInt = e => {
    let { name, value } = e.target;
    this.setState({ [name]: parseInt(value) });
  };

  handleChangeFloat = e => {
    let { name, value } = e.target;

    if (name === "Tm_range_min" && value >= this.state.Tm_range_max) return;
    if (name === "Tm_range_max" && value <= this.state.Tm_range_min) return;
    if (name === "gc_range_min" && value >= this.state.gc_range_max) return;
    if (name === "gc_range_max" && value <= this.state.gc_range_min) return;

    this.setState({ [name]: parseFloat(value) });
  };

  handleChangeChecked = e => {
    let { name, checked } = e.target;
    this.setState({ [name]: checked });
  };

  handleReset = () => {
    this.setState({ ...this.formDefaults });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ loading: true });
    let data;
    let formData = new FormData();
    Object.keys(this.formData).map(key => formData.append(key, this.formData[key]));
    formData.append("settings", JSON.stringify(this.formSettings));
    api.data
      .primerDriver(formData)
      .then(res => {
        data = res.data;
      })
      .catch(err => {
        console.log(err.message);
        data = "Request failed. Please try again later.";
      })
      .finally(() => {
        this.props.responseCatcher(data, this.state.mode);
        this.props.history.push("/results");
      });
  };

  validateForm = () => {
    let validSequence = this.state.sequenceLength > 0;
    let validMutation = this.state.mutation_type !== "";
    let validMutationCode =
      this.state.mutation_type === "sub"
        ? this.state.target.length > 0 && this.state.replacement.length > 0
        : this.state.target.length > 0 || this.state.replacement.length > 0;
    validSequence && validMutation && validMutationCode
      ? this.setState({ isValid: true })
      : this.setState({ isValid: false });
    let formData = ["mode", "sequence", "target", "position", "replacement", "mutation_type"];
    this.formData = {};
    formData.map(item => (this.formData[item] = this.state[item]));
    let advSettings = [
      "Tm_range_min",
      "Tm_range_max",
      "gc_range_min",
      "gc_range_max",
      "length_min",
      "length_max",
      "flank5_range_min",
      "flank5_range_max",
      "flank3_range_min",
      "flank3_range_max",
      "forward_overlap5",
      "forward_overlap3",
      "terminate_gc",
      "center_mutation",
      "primer_mode",
      "expression_system",
    ];
    this.formSettings = {};
    advSettings.map(item => (this.formSettings[item] = this.state[item]));
  };

  render() {
    if (this.state.loading) return <LoadingScreen />;
    else
      return (
        <Form
          title="DNA-based Primer Design"
          handleValidate={this.validateForm}
          handleSubmit={this.handleSubmit}
          handleReset={this.handleReset}
          {...this.state}
        >
          <DnaSequenceInput handleChange={this.handleChange} {...this.state} />
          <MutationType handleChange={this.handleChange} {...this.state} />
          <MutationSelector handleChange={this.handleChange} {...this.state} />
          <AdvancedSettings
            handleChange={this.handleChange}
            handleChangeInt={this.handleChangeInt}
            handleChangeFloat={this.handleChangeFloat}
            handleChangeChecked={this.handleChangeChecked}
            {...this.state}
          />
        </Form>
      );
  }
}

export default withRouter(DnaView);
