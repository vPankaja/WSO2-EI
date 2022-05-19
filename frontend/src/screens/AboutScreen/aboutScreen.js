import React, { useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import AboutCarousel from '../../components/AboutCarousel/aboutCarousel'
import max2 from '../AboutScreen/max.jpg'
import max3 from '../AboutScreen/x2.jpg'
import max4 from '../AboutScreen/max4.jpg'
import max8 from '../AboutScreen/max8.jpg'
import max10 from '../AboutScreen/max10.jpg'
import max11 from '../AboutScreen/max11.jpg'
import '../AboutScreen/about.css'
import SilderCarousel from '../../components/SliderCarousel/sliderCarousel'
import { Loader } from '@googlemaps/js-api-loader';
import './map.css'

const loader = new Loader({
      apiKey: "AIzaSyDzGEUBQ-GAZAhGthGgyonKfzkhNwMOv1U",
      version: "weekly",
      libraries: ["places"]
    })
    
    const mapOptions = {
      center: {
        lat: 6.924053,
        lng: 79.845522
      },
      zoom: 14
    }
    


// const loader = new Loader({
//       apiKey: "AIzaSyA8df8uUeEggMCLWg0eAl1EzlElMsz4Dg4",
//       version: "weekly",
//       libraries: ["places"]
//     });
    
//     const mapOptions = {
//       center: {
//         lat: 0,
//         lng: 0
//       },
//       zoom: 4
//     };

   
const AboutScreen = () => {

      useEffect(() => {

            loader
              .load()
              .then((google) => {
                var map = new google.maps.Map(document.getElementById("map"), mapOptions)
        
                var marker = new google.maps.Marker({
                  position: {
                    lat: 6.924053,
                    lng: 79.845522
                  },
                  title: "Carlton Hotel"
                });
        
                // To add the marker to the map, call setMap();
                marker.setMap(map);
              })
              .catch(e => {
                console.log(e.message)
              })
          }, []);
          
      return (
            <>
                  <div id='map'/>
                  <Container >
                        <Row>
                              <Col md={6} style={{ marginLeft: '50px' }}>
                                    <h1>ABOUT </h1>
                                    <h6>A personal tropical sanctuary that is perfect for escaping the city, Carlton Hotel overlooks the Indian Ocean in the heart of the business district. The hotel offers the finest accommodation in Colombo, an exciting new dining and social scene and the largest and extensive hotel conference and event facilities.</h6>
                                    <ul>
                                          <br></br>
                                          <li><h6>400 Rooms and Suites including Presidential suite</h6></li>
                                          <br></br>
                                          <li><h6>Carlton Cares: Our commitment to your well-being in our care</h6></li>
                                    </ul>
                                    <br></br>
                                    <button className='btn btn-outline-warning'>Learn More</button>

                              </Col>

                              <Col md={5}>
                                    <img src={max2} style={{ width: "75%", height: "100%", marginLeft: '150px' }} />
                              </Col>
                        </Row>

                        <hr></hr>
                        <Row>
                              <center><h1>Recommended room types</h1>
                                    <p>Offering striking views of the Indian Ocean, Beira Lake and the city beyond, our 500 guest rooms and suites, and 41 serviced apartments are tastefully furnished to complement the urban-oceanside location and are among the largest in Colombo.</p>
                              </center>
                              <SilderCarousel />

                        </Row>
                        <hr></hr>

                        <Row>
                              <center>
                                    <h1 align-items='center'>Discover Your Carlton Hotel Experiences​</h1>
                                    <p>Plan an ideal staycation complete with complimentary, breakfast, spa or dining credits or even all-day access to Adventure Zone for the kids. We have everyone in the family's well-being in mind.​</p>
                              </center>

                              <Col>

                                    <img src={max3} style={{ width: "100%", height: "100%" }} />
                              </Col>
                              <Col className='ml' md={6}>
                                    <h1>Savour Carlton</h1>
                                    <p>Recreate special Carlton dining experiences from the comfort of your About. Enjoy our collection of signature dishes delivered straight to your doorstep.</p>
                                    <br></br>
                                    <button className='btn btn-outline-warning'>Learn More</button>
                              </Col>
                        </Row>
                        <hr></hr>
                        <Row >

                              <Col className='ml' md={6}>
                                    <h1>Savour Carlton</h1>
                                    <p>Recreate special Carlton dining experiences from the comfort of your About. Enjoy our collection of signature dishes delivered straight to your doorstep.</p>
                                    <br></br>
                                    <button className='btn btn-outline-warning'>Learn More</button>

                              </Col>
                              <Col >
                                    <img src={max4} style={{ width: "100%", height: "94%" }} />
                              </Col>
                        </Row>
                        <br></br>
                        <hr></hr>
                        
                  </Container>

            </>

      )
}

export default AboutScreen
