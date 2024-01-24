import React from "react";
import { connect } from "react-redux";
import FaultDeleteForm from "../common/FaultDeleteForm";
import { deletedFault } from "../../actions/index";
import history from "../../history/history";

class FaultDelete extends React.Component {
  state = {
    idPath: history.location.pathname.split("/")[3],
  };
  //   componentDidMount() {
  //     this.setState({ idPath: history.location.pathname.split("/")[3] });
  //   }
  onSubmitHandler = (formData) => {
    this.props.deletedFault(this.state.idPath, formData);
  };

  render() {
    // if (this.props.errors.length > 0) {
    //   return this.props.errors.map((error, i) => {
    //     <div className="aleat" key={i}>
    //       {error.msg}
    //     </div>;
    //   });
    // }
    return (
      <FaultDeleteForm
        {...this.props}
        idPath={this.state.idPath}
        onSubmitHandler={this.onSubmitHandler}
      />
    );
  }
}

const stateMapToProps = (state, ownProps) => {
  return { errors: [...state.errors] };
};

export default connect(stateMapToProps, { deletedFault })(FaultDelete);
