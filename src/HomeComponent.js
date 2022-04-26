import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Carousel from 'react-bootstrap/Carousel'

import * as contentful from 'contentful';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";

function HomeComponent() {

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
      let imageUrl = "https://placeholder.pics/svg/300";
      if (item.fields.image && item.fields.image.length > 0) {
        imageUrl = item.fields.image[0].fields.file.url;
      }

      // contentsArray.push(<Row style={{ marginTop: "20px", marginBottom: "20px" }}>
        contentsArray.push(
          <Col md={4} className="mt-3">
            <div class="card" style={{width: "18re"}}>
            <Image src={imageUrl} class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">{item.fields.name}</h5>
              {/* <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a> */}
            </div>
          </div>

        </Col>
      //  <Col md={8}>
      //     <div class="col-md-12">
      //       <h3>{item.fields.name}</h3>
      //     </div>
      //     <div className="col-md-12">
      //       <div>
      //         {documentToReactComponents(item.fields.description, renderOptions)}
      //       </div>
      //     </div>
      //   </Col>
   


    )
  });
  

    return <Row>{contentsArray}</Row>;
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
      <Container  >

        <Row className="mt-5">
          <Col>
            <Carousel>
              <Carousel.Item interval={1000}>
                <img
                  className="d-block w-100"
                  src="https://source.unsplash.com/random/780x400?sky" fluid rounded
                  alt="First slide"


                />
                <Carousel.Caption>
                  <h3>First slide label</h3>
                  <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item interval={500}>
                <img
                  className="d-block w-100"
                  src="https://source.unsplash.com/random/780x400?falls" fluid rounded
                  alt="Second slide"
                />
                <Carousel.Caption>
                  <h3>Second slide label</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://source.unsplash.com/random/780x400?water" fluid rounded
                  alt="Third slide"
                />
                <Carousel.Caption>
                  <h3>Third slide label</h3>
                  <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </Col>
        </Row>

        {getContents()}
      </Container>
    </div >
  );
}

export default HomeComponent;
