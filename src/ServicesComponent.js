import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import * as contentful from 'contentful';
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";


function ServicesComponent() {

  const [items, setItems] = useState([]);



  useEffect(() => {
    fetchServices();
  }, []);


  const fetchServices = async () => {

    let contentfulClient = contentful.createClient({
      accessToken: '6o_DMSyLI7OSMmd434UXyAb2ILGS2R9F7c5h_lmsYWI',
      space: '9gf6mhyw2bkx'
    });
    let PLAYER_CONTENT_TYPE_ID = 'yesgeServices';

    contentfulClient.getEntries({
      content_type: PLAYER_CONTENT_TYPE_ID
    })
      .then(function (entries) {
        setItems(entries.items);
      })
  }

  const getContents = () => {
    const contentsArray = []
    items.forEach((item, index) => {
      console.log(item.fields.name);
        contentsArray.push(<Row style={{ marginTop: "20px", marginBottom: "20px" }}>
          <Col md={12}>
                {documentToReactComponents(item.fields.description, renderOptions)}
        </Col>
      </Row>)

    })

    return <div><div className="header-style">Services</div>{contentsArray}</div>;
  }
  const renderOptions = {
    renderNode: {
      [INLINES.EMBEDDED_ENTRY]: (node, children) => {
          // target the contentType of the EMBEDDED_ENTRY to display as you need
      if (node.data.target.sys.contentType.sys.id === "codeBlock") {
        return (
          <pre>
            <code>{node.data.target.fields.code}</code>
          </pre>
        );
      }

      if (node.data.target.sys.contentType.sys.id === "videoEmbed") {
        return (
          <iframe
            src={node.data.target.fields.embedUrl}
            height="100%"
            width="100%"
            frameBorder="0"
            scrolling="no"
            title={node.data.target.fields.title}
            allowFullScreen={true}
          />
        );
      }
      },

      [BLOCKS.EMBEDDED_ASSET]: (node, children) => {
        // render the EMBEDDED_ASSET as you need

        return (
          <div className="image-wrapper float-start pe-4 ">
         <Image fluid rounded
            src={`https://${node.data.target.fields.file.url}`}
            height={node.data.target.fields.file.details.image.height}
            width={node.data.target.fields.file.details.image.width}
            alt={node.data.target.fields.description} />
        </div>
      
        );
      }
    }
  }
  return (
    <div>
      <Container  style={{backgroundColor:"white",marginTop:"20px",borderRadius:"10px"}}>
      {getContents()}
    </Container>
    </div>
  );
}

export default ServicesComponent;
