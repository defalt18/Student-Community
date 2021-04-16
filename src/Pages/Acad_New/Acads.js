import { Button } from '@material-ui/core'
import Globe from 'react-globe.gl';
import React from 'react'
import './Acad.css'
import Books from './Books.png'
import Links from './Links.png'
import Videos from './Videos.png'
import Softwares from './Softwares.png'
import Rexit from './RexItem'

function Acad() {
    return (
        <div style={{ color: 'white', overflow:"hidden",paddingTop: '0px', paddingLeft: '0px', background: '#151516', minHeight: '100vh' }}>
            <div className='rec__head'>
                <div className="left__rec">
                    <h1 style={{fontSize:'60px', lineHeight:1}}>All the tools right on your screen</h1>
                    <p style={{fontSize:'20px'}}> So here we welcome you to the <b>Academics Page</b> which
                    offers a compact view to all the resources an institute as
                    well as the student community has to offer!. Dive in and
                    enjoy the journey...
                    <p><a href="#rest_rec"style={{ color: 'rgba(0,155,250)', margin: '10px 0', textDecoration: 'none' }}>Check out resources &#8689;</a></p>
                    </p>
                    <Button variant="filled" style={{ background: 'white' , padding:"10px 30px", fontSize:'15px', borderRadius:'15px'}}>
                        <a href="https://forms.gle/Lpx3RXgrUR2U2eoA7" style={{ textDecoration: 'none', color: 'black' }}>Suggest a resource</a>
                    </Button>
                </div>
                <div className="right__rec">
                    <Globe animateIn globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg" showAtmosphere={false}
                    width={700} showGraticules height={700} backgroundColor="black"
                    arcDashLength={() => Math.random()}
                    arcDashGap={() => Math.random()}
                    arcDashAnimateTime={() => Math.random() * 4000 + 500}
                    />
                </div>
            </div>
            <p style={{paddingLeft:"100px", margin:0,fontSize:"35px", fontWeight:"bold",background:"black"}}>Available Resources</p>
            <div id="rest_rec">
                <Rexit name="Books" text="Tired of finding the pdfs online. Well have a look at this vault it may reduce the apparent tediousness!" image={Books}/>
                <Rexit name="Useful Links" text="Links to all the resource material and course pages where all the brewing happens!. Make sure you don't wander off!" image={Links}/>
                <Rexit name="Softwares" text="All the productivity tools provided to you by DA-IICT for free under the license of the institute. Use them wisely!" image={Softwares}/>
                <Rexit name="Videos" text="Short videos on the most crucial topics to help you through the last minute preparations!. Report if a link is broken" image={Videos}/>
                {/* <div className="rec_element_new" style={{background:'#800000'}}>
                    <div className='ele_left'>
                        <h1>Books</h1>
                        <h4>Tired of finding the pdfs online. Well have a look at this vault it may reduce the apparent tediousness!</h4>
                        <a style={{ color: 'rgba(0,155,250)', margin: '10px 0', textDecoration: 'none' }}>Go to resource &#8689;</a>
                    </div>
                    <div className="ele_right">
                        <img src="https://i.pinimg.com/originals/2c/fc/93/2cfc93d7665f5d7728782700e50596e3.png" />
                    </div>
                </div>
                <div className="rec_element_new" style={{background:'linear-gradient(45deg,blue,purple)'}}>
                    <div className="ele_right">
                        <img src="https://freeiconshop.com/wp-content/uploads/edd/link-open-flat.png" />
                    </div>
                    <div className='ele_left'>
                        <h1>Usefull Links</h1>
                        <h4>Links to all the resource material and course pages where all the brewing happens!</h4>
                        <a style={{ color: 'rgba(0,155,250)', margin: '10px 0', textDecoration: 'none' }}>Go to resource &#8689;</a>
                    </div>
                </div>
                <div className="rec_element_new" style={{background:'linear-gradient(135deg,black,#111,rgba(44,96,75),maroon)'}} >
                    <div className='ele_left'>
                        <h1>Softwares</h1>
                        <h4>All the productivity tools provided to you by DA-IICT for free under the license of the institute. Use them wisely!</h4>
                        <a style={{ color: 'rgba(0,155,250)', margin: '10px 0', textDecoration: 'none' }}>Go to resource &#8689;</a>
                    </div>
                    <div className="ele_right">
                        <img src="https://media.macphun.com/img/macphun/luminar-2018/logo_500.png" />
                    </div>
                </div>
                <div className="rec_element_new" style={{background:'linear-gradient(45deg,purple,red)'}}>
                    <div className="ele_right">
                        <img src="https://icons-for-free.com/iconfiles/png/512/videos+watch+website+youtube+icon-1320168606023940607.png" />
                    </div>
                    <div className='ele_left'>
                        <h1>Videos</h1>
                        <h4>Short videos on the most crucial topics to help you through the last minute preparations!</h4>
                        <a style={{ color: 'rgba(0,155,250)', margin: '10px 0', textDecoration: 'none' }}>Go to resource &#8689;</a>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default Acad
