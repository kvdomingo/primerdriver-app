import React from "react";
import { Image } from "cloudinary-react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { MDBRow as Row, MDBCol as Col, MDBCard as Card, MDBCardBody as CardBody } from "mdbreact";

const menu_data = [
  {
    key: 0,
    name: "Characterization",
    publicId: "primerdriver/characterize",
    href: "/characterize",
    color: "danger",
  },
  {
    key: 1,
    name: "DNA-based",
    publicId: "primerdriver/dna",
    href: "/dna",
    color: "primary",
  },
  {
    key: 2,
    name: "Protein-based",
    publicId: "primerdriver/protein.png",
    href: "/protein",
    color: "success",
  },
];

function Menu() {
  return (
    <Row className="row-cols-1 row-cols-md-3">
      {menu_data.map((item, i) => (
        <Col key={i}>
          <Card className="mb-4">
            <div className="view overlay">
              <Image
                className="img-fluid"
                cloudName="kdphotography-assets"
                publicId={item.publicId}
                dpr="auto"
                responsive
                responsiveUseBreakpoints
                secure
                width="auto"
                crop="scale"
              />
              <Link to={item.href}>
                <div className="mask rgba-black-slight" />
              </Link>
            </div>
            <CardBody className="text-center">
              <Link id={item.href.slice(1)} to={item.href} className={`btn btn-${item.color} btn-md`}>
                {item.name}
              </Link>
            </CardBody>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

Menu.propTypes = {
  stations: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      publicId: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
    }),
  ),
};

export default Menu;
