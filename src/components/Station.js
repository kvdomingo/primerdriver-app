import React, { Component, Suspense } from "react";
import Loading from "./shared/LoadingScreen";
import Routes from "../Routes";
import { BrowserRouter as Router } from "react-router-dom";
import { MDBContainer as Container, MDBJumbotron as Jumbotron } from "mdbreact";

const styles = {
  appContainer: {
    boxShadow: "none",
    overflow: "hidden",
  },
};

class Station extends Component {
  state = {
    res: [],
    mode: "",
  };

  responseCatcher = (res, mode) => {
    this.setState({ res, mode });
  };

  render() {
    return (
      <Container>
        <Jumbotron className="my-5 px-md-5 border border-light" style={styles.appContainer}>
          <Suspense fallback={<Loading />}>
            <Router>
              <Routes responseCatcher={this.responseCatcher} {...this.state} />
            </Router>
          </Suspense>
        </Jumbotron>
      </Container>
    );
  }
}

export default Station;
