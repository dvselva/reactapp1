import React, { useState, useEffect } from 'react';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row'
// import Col from 'react-bootstrap/Col'
// import Image from 'react-bootstrap/Image'
// import Carousel from 'react-bootstrap/Carousel'

import * as contentful from 'contentful';
// import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
// import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
// import { BLOCKS, INLINES } from "@contentful/rich-text-types";

function HomeComponent() {

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    fetchProducts();
  }, []);


  const splitItems = () => {
    var perChunk = Math.floor(items.length / 3)
    var result = items.reduce((resultArray, item, index) => {
      const chunkIndex = Math.floor(index / perChunk)

      if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = [] // start a new chunk
      }

      resultArray[chunkIndex].push(item)

      return resultArray
    }, [])

    console.log(result); // result: [['a','b'], ['c','d'], ['e']]
    return result;
  }
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
        setLoading(false);

      })
  }

  const getContents = () => {
    // const contentsArray = []


    // console.log(splitItems(items));
    const resultsArray = splitItems(items);

    const columns1Array =[];
    const columns2Array =[];
    const columns3Array =[];

    resultsArray.forEach((entries, outerindex) => {

      let columnsArray = [];
      entries.forEach((entry, index) => {

        let imageUrl = "https://placeholder.pics/svg/300";

        try {
        if (entry.fields.image && entry.fields.image.length > 0) {
          imageUrl = entry.fields.image[0].fields.file.url;
        }
      }
      catch {
          console.log("error");
      }
      columnsArray.push(<div className="row mt-3">
       <div className="col-md-12" >
          <div className="card" >
            <img src={imageUrl} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{entry.fields.name}</h5>
            </div>
          </div>
        </div>
        </div>
      )
      })

      if (outerindex ===0 ){
        columns1Array.push(columnsArray);
      }
      else if (outerindex ===1) {
        columns2Array.push (columnsArray);
        }
      else {
        columns3Array.push(columnsArray)
      }

    })


    // items.forEach((item, index) => {
    //   console.log(item.fields.name);
    //   let rawRichTextField = item.fields.description;
    //   console.log(documentToHtmlString(rawRichTextField));
    //   let imageUrl = "https://placeholder.pics/svg/300";
    //   if (item.fields.image && item.fields.image.length > 0) {
    //     imageUrl = item.fields.image[0].fields.file.url;
    //   }

      // contentsArray.push(
      //   <div className="col-sm-6 col-lg-4" >
      //     <div class="card" >
      //       <img src={imageUrl} className="card-img-top" alt="..." />
      //       <div className="card-body">
      //         <h5 className="card-title">{item.fields.name}</h5>
             
      //       </div>
      //     </div>

      //   </div>
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



    //   )
    // });


    return <div className="row"> 
    <div className="col-md-4">
    {columns3Array}
    </div>
    <div className="col-md-4">
    {columns2Array}
    </div>
    <div className="col-md-4">
    {columns1Array}
    </div>

    </div>;
  }

  // const renderOptions = {
  //   renderNode: {
  //     [INLINES.EMBEDDED_ENTRY]: (node, children) => {
  //       // target the contentType of the EMBEDDED_ENTRY to display as you need
  //       if (node.data.target.sys.contentType.sys.id === "codeBlock") {
  //         return (
  //           <pre>
  //             <code>{node.data.target.fields.code}</code>
  //           </pre>
  //         );
  //       }

  //       if (node.data.target.sys.contentType.sys.id === "videoEmbed") {
  //         return (
  //           <iframe
  //             src={node.data.target.fields.embedUrl}
  //             height="100%"
  //             width="100%"
  //             frameBorder="0"
  //             scrolling="no"
  //             title={node.data.target.fields.title}
  //             allowFullScreen={true}
  //           />
  //         );
  //       }
  //     },

  //     [BLOCKS.EMBEDDED_ASSET]: (node, children) => {
  //       // render the EMBEDDED_ASSET as you need

  //       return (
  //         <div className="image-wrapper float-start pe-4 ">
  //           <img className="img-fluid rounded"
  //             src={`https://${node.data.target.fields.file.url}`}
  //             height={node.data.target.fields.file.details.image.height}
  //             width={node.data.target.fields.file.details.image.width}
  //             alt={node.data.target.fields.description} />
  //         </div>

  //       );
  //     }
  //   }
  // }

  return (
    <div className="container">

      {!loading ?getContents():<div>Loadning </div>}
      
      {/* </Container> */}
    </div >
  );
}

export default HomeComponent;
