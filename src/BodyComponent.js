import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'

import * as contentful from 'contentful';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";

function BodyComponent() {

  const [items, setItems] = useState([]);



  useEffect(() => {
    fetchProducts();
  }, []);


  const fetchProducts = async () => {

    let contentfulClient = contentful.createClient({
      accessToken: '6o_DMSyLI7OSMmd434UXyAb2ILGS2R9F7c5h_lmsYWI',
      space: '9gf6mhyw2bkx'
    });
    let PLAYER_CONTENT_TYPE_ID = 'yesgeProducts';

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
      let rawRichTextField = item.fields.description;
      console.log(documentToHtmlString(rawRichTextField));
      let imageUrl="https://placeholder.pics/svg/300";
      if (item.fields.image && item.fields.image.length >0)
      {
          imageUrl = item.fields.image[0].fields.file.url;
      }

      contentsArray.push(<Row style={{ marginTop: "20px", marginBottom: "20px" }}>
        {/* <Col md={4} >
              <Image src="https://source.unsplash.com/500x200/?cars" fluid />
            </Col> */}
        <Col md={12}>
          <div className="image-wrapper float-start pe-4 ">
            <Image src={imageUrl} fluid />
          </div>

          <div >
            <div class="col-md-12">
              <h3>{item.fields.name}</h3>
            </div>
            <div className="col-md-12">
              {/* <div dangerouslySetInnerHTML={{ __html: documentToHtmlString(rawRichTextField) }}> */}
              <div>
              {documentToReactComponents(item.fields.description, renderOptions)}
              {/* {documentToReactComponents(item.fields.description, renderOptions)} */}
              </div>
            </div>
          </div>
        </Col>
      </Row>)


    })

    return contentsArray;
  }

  const renderOptions = {
    renderNode: {
      [INLINES.EMBEDDED_ENTRY]: (node, children) => {
      },

      [BLOCKS.EMBEDDED_ASSET]: (node, children) => {
        // render the EMBEDDED_ASSET as you need
        return (
          <img
            src={`https://${node.data.target.fields.file.url}`}
            height={node.data.target.fields.file.details.image.height}
            width={node.data.target.fields.file.details.image.width}
            alt={node.data.target.fields.description}
          />
        );
      }
    }
  }

  return (
    <div>
      <Container >
        {getContents()}
        {/* {this.fetchPlayers()} */}
        {/* <Row style={{ marginTop: "20px", marginBottom: "20px" }}>
            <Col md={4} >
              <Image src="https://source.unsplash.com/500x200/?cars" fluid />
            </Col>
            <Col md={8}>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. </p>
            </Col>
          </Row>
          <Row style={{ marginTop: "20px", marginBottom: "20px" }}>

            <Col md={8}>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. </p>
            </Col>
            <Col md={4} >
              <Image src="https://source.unsplash.com/500x200/?dogs" fluid />
            </Col>
          </Row>

          <Row style={{ marginTop: "20px", marginBottom: "20px" }}>
            <Col md={4} >
              <Image src="https://source.unsplash.com/500x200/?ship" fluid />
            </Col>
            <Col md={8}>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. </p>
            </Col>
          </Row>

          <Row style={{ marginTop: "20px", marginBottom: "20px" }}>
            <Col md={8}>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. </p>
            </Col>
            <Col md={4} >
              <Image src="https://source.unsplash.com/500x200/?plane" fluid />
            </Col>
          </Row> */}
      </Container>
    </div >
  );
}

export default BodyComponent;
