import React from 'react';
import './Clubs.css';
import ClubItem from './ClubItem';

function Clubs() {
    return (
        <div className="clubs">
            <div className="head">
                <img
                    src="https://cdn.dribbble.com/users/1237300/screenshots/6478927/__-1_1_____.gif"
                    alt=""
                />
                <h1>DA-IICT</h1>
                <h1 id="newh">Clubs</h1>
                <p id="descp">
                    Students take and learn the best available from the
                    community itself making the campus a vibrant place to
                    nurture and grow into. These little clubs make the college
                    an organism as with its own city to breed into!
                </p>
            </div>
            <div className="clubwin">
                <ClubItem
                    className="item"
                    title="Music Club"
                    img="https://www.lovethispic.com/uploaded_images/332802-Playing-The-Guitar-In-The-Dark.jpg"
                    descp="The one where the aesthetics of life meets the vocabulary of music!"
                />
                <ClubItem
                    className="item"
                    title="Radio Club"
                    img="https://www.businessinsider.in/thumb/msid-75063195,width-1200,height-900/radio-box.jpg"
                    descp="For all the RJs on the campus to make the daily life more interesting!"
                />
                <ClubItem
                    className="item"
                    title="Programming Club"
                    img="https://specials-images.forbesimg.com/imageserve/5f302109ffad89f9130e07db/960x0.jpg?cropX1=0&cropX2=4800&cropY1=243&cropY2=2943"
                    descp="Since we cannot forget the gems as they make this place what it is."
                />
                <ClubItem
                    className="item"
                    title="Microsoft Club"
                    img="https://pbs.twimg.com/profile_images/1268200269277351936/a2naHzbe_400x400.png"
                    descp="A club where you get the insight to a corporate structure and a redefined world."
                />
                <ClubItem
                    className="item"
                    title="Developer Student Club"
                    img="https://www.appfutura.com/uploads/blog/2017/11/a679f645775b7603810c3415cc0e88511511950836.jpg"
                    descp="Are you a hardcore developer interested in the behind the scenes. Well this is the place for you!"
                />
                <ClubItem
                    className="item"
                    title="Cultural Club"
                    img="https://cdn3.onlinemswprograms.com/content/c44e7d88c53a4af287b05cf97ddf9710/5296_MSW-Minisite_Cultural-Sensitivity-Hero.jpg"
                    descp="We cannot forget what college is actually for. Get in touch with yourself here!"
                />
                <ClubItem
                    className="item"
                    title="Cubing Club"
                    img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXUS1LwhAQFOmO502Yun-b4SNNxNFFUWb4_Q&usqp=CAU"
                    descp="Want to meet a bunch of geeks. Well here is a club for you!"
                />
                <ClubItem
                    className="item"
                    title="Press Club"
                    img="https://www.creativelive.com/blog/wp-content/uploads/2018/08/webimage-BF11CAB5-8391-473E-B901DFE294B54B64-620x414.jpg"
                    descp="Passive but active!"
                />
                <ClubItem
                    className="item"
                    title="Dance Club"
                    img="https://images.unsplash.com/photo-1518834107812-67b0b7c58434?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"
                    descp="If you really want to just dance your troubles away then well..."
                />
                <ClubItem
                    className="item"
                    title="Business Club"
                    img="https://analyticsinsight.b-cdn.net/wp-content/uploads/2020/01/Picture1-1.jpg"
                    descp="Wanna wake up the gujju in you!?"
                />
                <ClubItem
                    className="item"
                    title="Chess Club"
                    img="https://sites.google.com/site/iiscchess/_/rsrc/1494396442724/config/customLogo.gif?revision=7"
                    descp="A game of ethics and a game of patience!"
                />
                <ClubItem
                    className="item"
                    title="Film Club"
                    img="https://thewell.unc.edu/files/2020/04/film1.jpg"
                    descp="Tired of 24 hour coding session. Whats a great cup of coffee with a movie!"
                />
                <ClubItem
                    className="item"
                    title="Photography Club"
                    img="https://cdn.mos.cms.futurecdn.net/gvQ9NhQP8wbbM32jXy4V3j.jpg"
                    descp="Provided that you are gifted....this is the place for you"
                />
                <ClubItem
                    className="item"
                    title="Sports Committee"
                    img="https://mongooseagency.com/files/3415/9620/1413/Return_of_Sports.jpg"
                    descp="Well if you are ever in need of some gear call them"
                />
                {/* <ClubItem className='item' title='CM Committee' img = 'https://b.zmtcdn.com/data/pictures/3/18687043/7109136bd2f97ba49ca261707a6425c9.jpg' descp = 'Food not tasty enough or more importantly healthy enough!?'/> */}
                <ClubItem
                    className="item"
                    title="HM Committee"
                    img="https://upload.wikimedia.org/wikipedia/commons/e/e8/Hostel_Dormitory.jpg"
                    descp="Someone needs to manage the queries and concerns about our not so shitty hostels"
                />
            </div>
        </div>
    );
}

export default Clubs;
