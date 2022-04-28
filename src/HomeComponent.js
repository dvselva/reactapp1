import React from 'react';
// import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
// import Image from 'react-bootstrap/Image'
// import Carousel from 'react-bootstrap/Carousel'

// import * as contentful from 'contentful';
import AboutComponent from './AboutComponent';
import ServicesComponent from './ServicesComponent';
import AllProductsComponent from './AllProductsComponent';
// import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
// import { documentToReactComponents } from "@contentful/rich-text-react-renderer";


function HomeComponent() {

  // const [items, setItems] = useState([]);
  // const [loading, setLoading] = useState(true);



  // useEffect(() => {
  //   fetchProducts();
  // }, []);


  // const splitItems = () => {
  //   var perChunk = Math.ceil(items.length / 3)
  //   var result = items.reduce((resultArray, item, index) => {
  //     const chunkIndex = Math.floor(index / perChunk)

  //     if (!resultArray[chunkIndex]) {
  //       resultArray[chunkIndex] = [] // start a new chunk
  //     }

  //     resultArray[chunkIndex].push(item)

  //     return resultArray
  //   }, [])

  //   console.log(result); // result: [['a','b'], ['c','d'], ['e']]
  //   return result;
  // }
  // const fetchProducts = async () => {

  //   let contentfulClient = contentful.createClient({
  //     accessToken: '6o_DMSyLI7OSMmd434UXyAb2ILGS2R9F7c5h_lmsYWI',
  //     space: '9gf6mhyw2bkx'
  //   });
  //   let PLAYER_CONTENT_TYPE_ID = 'yesgeProducts';

  //   contentfulClient.getEntries({
  //     content_type: PLAYER_CONTENT_TYPE_ID
  //   })
  //     .then(function (entries) {
  //       setItems(entries.items);
  //       setLoading(false);

  //     })
  // }

  // const getContents = () => {
  //   const resultsArray = splitItems(items);

  //   const columns1Array =[];
  //   const columns2Array =[];
  //   const columns3Array =[];

  //   resultsArray.forEach((entries, outerindex) => {

  //     let columnsArray = [];
  //     entries.forEach((entry, index) => {

  //       let imageUrl = "https://placeholder.pics/svg/300";

  //       try {
  //       if (entry.fields.image && entry.fields.image.length > 0) {
  //         imageUrl = entry.fields.image[0].fields.file.url;
  //       }
  //     }
  //     catch {
  //         console.log("error");
  //     }
  //     columnsArray.push(<div className="row mt-3">
  //       <a href={imageUrl}>
  //      <div className="col-md-12" >
  //         <div className="card" >
  //           <img src={imageUrl} className="card-img-top" alt="..." />
  //           <div className="card-body">
  //             <h5 className="card-title" style={{textDecoration:"none",textUnderline:"none"}}>{entry.fields.name}</h5>
  //           </div>
  //         </div>
  //       </div>
  //       </a>
  //       </div>
  //     )
  //     })

  //     if (outerindex ===0 ){
  //       columns1Array.push(columnsArray);
  //     }
  //     else if (outerindex ===1) {
  //       columns2Array.push (columnsArray);
  //       }
  //     else {
  //       columns3Array.push(columnsArray)
  //     }

  //   })



  //   return <div className="row"> 
  //   <div className="col-md-4">
  //   {columns1Array}
  //   </div>
  //   <div className="col-md-4">
  //   {columns2Array}
  //   </div>
  //   <div className="col-md-4">
  //   {columns3Array}
  //   </div>

  //   </div>;
  // }



  return (
    <div className="container">

      {/* {!loading ? */}
      <Row className="mt-4">
        <Col md={8}>
          <Row>
            <Col md={12}>
            <AboutComponent/>
            </Col>
          </Row>
          <Row>
            <Col>
             <ServicesComponent/>
            </Col>
          </Row>
        </Col>
        <Col md={4}>
           <AllProductsComponent mode="top" title="Latest work"/>
        </Col>
      </Row>
      
      {/* :<div>Loadning </div>} */}
      
      {/* </Container> */}
    </div >
  );
}

export default HomeComponent;
