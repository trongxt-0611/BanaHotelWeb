import React, {useState}  from "react";
import "./HotelDetail.scss"
import Logo from "../../assets/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faChevronRight,faChevronLeft} from "@fortawesome/free-solid-svg-icons"


class Header extends React.Component{
    render(){
        let idI = 0
        const nextImg = ( ) =>{
            // document.getElementById(index).style
            if ( idI <= 2 ){
                idI = idI + 1
                if ( idI > 2 ){
                    idI = 0
                    document.getElementById('0').src = arrI[idI]
                }else{
                    document.getElementById('0').src = arrI[idI]
                }
            }
        }
        const prevImg = ( index ) =>{
            // document.getElementById(index).style
            if ( idI >= 0 ){
                idI = idI - 1
                if ( idI < 0 ){
                    idI = 2
                    document.getElementById('0').src = arrI[idI]
                }else{
                    document.getElementById('0').src = arrI[idI]
                }
            }
        }
        const arrI = []
        arrI.push(this.props.hotel.imageHotel)
        return(
            <div>
                
                <div className="logo">
                    <img src={Logo} alt="logo" />
                    <p>Ba Na Hill Hotel Web</p>
                </div>
                <div className="hotel">
                    <div className="detail">
                        <p id="p1">{this.props.hotel.address}</p> <br></br>
                        <p id="p2">{this.props.hotel.nameCategory}</p>  <br></br>
                        <p id="p3">{this.props.hotel.phoneHotel}</p> <br></br>
                    </div>
                    <div className="avtHotel">
                        <img src={arrI[0]} alt="Anh dai dien hotel" class="img-feature" id="0"/>
                        
                        <div>
                        {
                            this.props.listImage.map(
                                (image,index) => (
                                    <div style={{display: "none"}}>
                                         {arrI.push(image.image)}
                                         {/* <img src={image.image} id={index} key={index} alt="Anh dai dien hotel" class="img-feature" style={{display: "none"}}/>, */}
                                    </div>
                                )
                            )
                        }
                        </div>
                        <div 
                            class=" control prev"
                            onClick={()=> prevImg()}    
                        >
                            <FontAwesomeIcon className="" icon={faChevronLeft} />
                            {/* <i class='bx bx-chevron-left'></i> */}
                            
                        </div>
                        <div class="control next"
                            onClick={()=> nextImg()}
                        >
                            <FontAwesomeIcon className="" icon={faChevronRight} />
                        </div>
                        
                    </div>
                    
                </div>
                {/* <div>
                {
                    this.props.listImage.map(
                        (image,index) => (
                            <img src={this.props.hotel.imageHotel} id={index} key={index} alt="Anh dai dien hotel" class="img-feature" />
                        )
                    )
                }
                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
                    <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
                    </svg>
                </button>
                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
                    <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
                    </svg>
                </button>
                </div> */}
                {/* <div className="nameHotel">
                    <h2>{this.props.hotel.nameHotel}</h2>
                    {this.props.displayStar(this.props.star)}
                    <p>{this.props.hotel.description}</p>
                </div> */}
            </div>
        )
    }
}
export default Header;