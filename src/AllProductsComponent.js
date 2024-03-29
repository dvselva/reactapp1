import React, { useState, useEffect } from 'react';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row'
// import Col from 'react-bootstrap/Col'
// import Image from 'react-bootstrap/Image'
// import Carousel from 'react-bootstrap/Carousel'
import LayoutComponent from  './layout/LayoutComponent';

// import * as contentful from 'contentful';
import Spinner from 'react-bootstrap/Spinner';
// import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
// import { documentToReactComponents } from "@contentful/rich-text-react-renderer";


function AllProductsComponent(props) {

  const [items, setItems] = useState([]);
  const [newitems, setnewItems] = useState([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    fetchProducts();
    fetchNewProducts();
  }, []);


  const splitItems = () => {
    var perChunk = Math.ceil(items.length / 3)
    var result = items.reduce((resultArray, item, index) => {
      const chunkIndex = Math.floor(index / perChunk)

      if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = [] 
      }

      resultArray[chunkIndex].push(item)

      return resultArray
    }, [])

    console.log(result); 
    return result;
  }



async function fetchProducts() {
  try {
    let response = await fetch('https://dvselva-api.azurewebsites.net/api/products-get');
    let data = await response.json();
    setItems(data);
    setLoading(false);

  } catch(err) {
    // catches errors both in fetch and response.json
    alert(err);
  }
}


async function fetchNewProducts() {
  try {
    let response = await fetch(process.env.REACT_APP_URL+ '/api/products-new-get');
    let data = await response.json();
    setnewItems(data);
    setLoading(false);
  } catch(err) {
    // catches errors both in fetch and response.json
    alert(err);
  }
}

  // const fetchProducts = async () => {
  //   let contentfulClient = contentful.createClient({
  //     accessToken:  process.env.REACT_APP_CDKEY,
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


  // const fetchNewProducts = async () => {

  //   let contentfulClient = contentful.createClient({
  //     accessToken: '6o_DMSyLI7OSMmd434UXyAb2ILGS2R9F7c5h_lmsYWI',
  //     space: '9gf6mhyw2bkx'
  //   });
  //   let PLAYER_CONTENT_TYPE_ID = 'yesgeProducts';
  
  //   contentfulClient.getEntries({
  //     content_type: PLAYER_CONTENT_TYPE_ID,
  //     'metadata.tags.sys.id[in]': 'new,latest'
  //   })
  //     .then(function (entries) {
  //       setnewItems(entries.items);
  //       setLoading(false);

  //     })
  // }


  const getContents = () => {
   
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
        <a href={imageUrl}>
       <div className="col-md-12" >
          <div className="card" >
            <img src={imageUrl} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title" style={{textDecoration:"none",textUnderline:"none"}}>{entry.fields.name}</h5>
            </div>
          </div>
        </div>
        </a>
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

    return <div><div className="header-style">{props.title}</div> <div className="row"> 
        <div className="col-md-4">
    {columns1Array}
    </div>
    <div className="col-md-4">
    {columns2Array}
    </div>
    <div className="col-md-4">
    {columns3Array}
    </div>
    </div>
    </div>;
  }

  const getTopContents = () => {
      const contentsArray=[];
     newitems.forEach((item, index) => {

      console.log(item.fields.name);
      // let rawRichTextField = item.fields.description;
      // console.log(documentToHtmlString(rawRichTextField));
      let imageUrl = "https://placeholder.pics/svg/300";
      try {
        if (item.fields.image && item.fields.image.length > 0) {
          imageUrl = item.fields.image[0].fields.file.url;
        }
      }
      catch {
          console.log("error");
      }

     contentsArray.push(
      <a href={imageUrl}>
        <div className="col-md-12 mt-3" >
          <div class="card" >
            <img src={imageUrl} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{item.fields.name}</h5>
             
            </div>
          </div>
        </div>
        </a>
      )
      
    });

    return <div> <div className="header-style">{props.title}</div>{contentsArray}</div>;
  
  }
  return (
    // <div className="container" style={{backgroundColor:"white",marginTop:"20px",borderRadius:"10px",paddingBottom:"20px"}}>
      <LayoutComponent>
      {!loading && props.mode==='all' ? getContents(): !loading && props.mode==='top' ? getTopContents():<div>
      <Spinner animation="border" role="status" variant="danger">
  <span className="visually-hidden">Loading...</span>
</Spinner>

      </div> }
      </LayoutComponent>
    // </div >
  );
}

export default AllProductsComponent;
