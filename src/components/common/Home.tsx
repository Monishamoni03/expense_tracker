import React from "react";
import NavBar from "./NavBar";
import "../../assets/css/Style";
import Footer from "./Footer";

const Home: React.FC = () => {
    return (
        <>
            <NavBar />
            <div className='home-container'>
                <h1 style={{ textAlign: "center" }}>Welcome</h1>
            </div>
            <Footer />
        </>
    )
}

export default Home;