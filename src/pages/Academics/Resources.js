/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import './Resources.css';
import Resourceelement from './Resourceelement';

function Resources() {
    return (
        <div className="Reshome">
            <div className="home__top">
                <div className="top__left">
                    <h1>Resources</h1>
                    <p>Nothing exits which knowledge </p>
                    <p>cannot solve!</p>
                </div>
                <div className="top__right">
                    <h2>Hóla people!</h2>
                    <b>An institute</b> is judged and governed by the resources
                    it can offer to the student community. Althrough it is
                    pretty obvious that the students are the greatest resource
                    of them all. But if great minds are provided with the best
                    tools wonders can be achieved and no limits will persist. So
                    here we welcome you to the <b>resources page</b> which
                    offers a compact view to all the resources an institute as
                    well as the student community has to offer!. Dive in and
                    enjoy the journey...
                        <p
                            style={{
                                cursor: 'pointer',
                                color: 'rgba(0,0,0)',
                                width: '10rem',
                                padding: '5px',
                                borderRadius: '10px',
                                backgroundColor: 'rgba(255,255,255,0.6)',
                                textAlign: 'center',
                            }}
                            >
                            <a style={{textDecoration:'none',color: 'rgba(0,0,0)',}} href='https://forms.gle/Lpx3RXgrUR2U2eoA7'>
                            Suggest a resource
                            </a>
                        </p>
                </div>
            </div>
            <div className="act__tabs">
                <Resourceelement
                    title="Softwares"
                    image="https://media.macphun.com/img/macphun/luminar-2018/logo_500.png"
                    link="www.google.com"
                    desc="All the productivity tools provided to you by DA-IICT for free under the license of the institute. Use them wisely!"
                />
                <Resourceelement
                    title="Useful Links"
                    image="https://freeiconshop.com/wp-content/uploads/edd/link-open-flat.png"
                    link="www.google.com"
                    desc="Links to all the resource material and course pages where all the brewing happens!"
                />
                <Resourceelement
                    title="Books"
                    image="https://i.pinimg.com/originals/2c/fc/93/2cfc93d7665f5d7728782700e50596e3.png"
                    link="www.google.com"
                    desc="Tired of finding the pdfs online. Well have a look at this vault it may reduce the apparent tediousness!"
                />
                <Resourceelement
                    title="Videos"
                    image="https://icons-for-free.com/iconfiles/png/512/videos+watch+website+youtube+icon-1320168606023940607.png"
                    link="www.google.com"
                    desc="Short videos on the most crucial topics to help you through the last minute preparations!"
                />
            </div>
            <div className="spacer"></div>
        </div>
    );
}

export default Resources;
