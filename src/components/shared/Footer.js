import React, { useEffect, useState } from "react";
import { Image } from "cloudinary-react";
import "mdbreact";
import api from "../../utils/Endpoints";

function Footer() {
  const [programVersion, setProgramVersion] = useState("");
  const [webVersion, setWebVersion] = useState("");
  const copyYear = new Date().getFullYear();

  useEffect(() => {
    api.data
      .version()
      .then(res => {
        setProgramVersion(res.data.program_version);
        setWebVersion(res.data.web_version);
      })
      .catch(err => console.log(err.message));
  }, []);

  return (
    <footer className="page-footer font-small bg-dark">
      <div className="container text-center text-md-left pt-5 pb-4">
        <div className="row">
          <div className="col-md-6 mt-md-0 mt-3">
            <a href="/">
              <Image
                className="pb-1"
                cloudName="kdphotography-assets"
                publicId="primerdriver/PrimerDriver_logo"
                height={90}
              />
            </a>
            <p>Automated design of mutagenic PCR primers</p>
          </div>
          <div className="col-md-3 mb-md-0 mb-3" />
          <hr className="clearfix w-100 d-md-none pb-3" />
          <div className="col-md-3 mb-md-0 mb-3">
            <h5 className="text-uppercase">Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="https://github.com/kvdomingo/primerdriver/releases" target="_blank" rel="noopener noreferrer">
                  Download
                </a>
              </li>
              <li>
                <a href="https://kvdomingo.github.io/primerdriver/" target="_blank" rel="noopener noreferrer">
                  Documentation
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-copyright text-center py-3 px-3">
        PrimerDriver v{programVersion} {webVersion} &copy; {copyYear}{" "}
        <a href="mailto:kvdomingo@up.edu.ph">Kenneth Domingo</a> &amp;{" "}
        <a href="mailto:ngutierrez@evc.pshs.edu.ph">Nomer Gutierrez</a>
      </div>
    </footer>
  );
}

export default Footer;
